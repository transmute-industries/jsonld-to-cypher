/* eslint-disable max-len */
const jsonld = require('jsonld');
const _ = require('lodash');
const tripleRegex =
  /^(?<subject>(<([^<>]+)>|^_:c14n\d+)) (?<predicate>(<([^<>]+)>)) (?<object>(.+))/;

const getLabelFromIri = (iri) => {
  return _.startCase(iri.split('/').pop().split('#').pop());
};

const isDidUrl = (iri) => {
  return (
    iri.startsWith('did:') &&
    (iri.includes('#') || iri.includes('/') || iri.includes('?'))
  );
};

const isDid = (iri) => {
  return iri.startsWith('did:') && !isDidUrl(iri);
};

const isUrn = (iri) => {
  return iri.startsWith('urn:');
};

const isUrl = (iri) => {
  return iri.startsWith('http');
};

const isBlankNode = (iri) => {
  return iri.includes('_:c14n');
};

const isIri = (iri) => {
  return isDid(iri) || isDidUrl(iri) || isUrl(iri) || isUrn(iri);
};

const getNodeLabel = (node) => {
  if (isBlankNode(node.id)) {
    return 'Blank Node';
  }
  if (isDid(node.id)) {
    return 'DID';
  }
  if (isDidUrl(node.id)) {
    return 'DID URL';
  }
  if (isUrn(node.id)) {
    return 'URN';
  }
  if (isUrl(node.id)) {
    return 'URL';
  }
  return 'Resource';
};

const setNodeLabelFromEdges = (graph) => {
  // add a label to RDF types for easier querying
  // we could add more specific types here...
  // but that is a mistake.
  // That kind of thing belongs at a different layer
  // like after importing data...
  const knownLabels = [
    'Type',
    'Issuer',
    'Holder',
    'Credential Subject',
    'Verifiable Credential',
    'Verifiable Presentation',
  ];
  graph.links.forEach((link) => {
    if (knownLabels.includes(link.label)) {
      if (!graph.nodes[link.target].labels.includes(link.label)) {
        graph.nodes[link.target].labels.push(link.label);
      }
    }
  });
};
const removeEscapedQuotes = (str) => {
  if (str.startsWith('"') && str.endsWith('"')) {
    return str.substring(1, str.length - 1);
  }
  return str;
};
const getObjectValue = (str) => {
  const [primitive] = str.split('^^');
  if (str.includes('http://www.w3.org/2001/XMLSchema#integer')) {
    return parseInt(removeEscapedQuotes(primitive));
  }
  if (str.includes('http://www.w3.org/2001/XMLSchema#double')) {
    return parseFloat(removeEscapedQuotes(primitive));
  }
  if (str.includes('http://www.w3.org/2001/XMLSchema#boolean')) {
    return removeEscapedQuotes(primitive) === 'true';
  }
  if (str.includes('http://www.w3.org/2001/XMLSchema#dateTime')) {
    return removeEscapedQuotes(primitive);
  }
  return `${str.replace(/'/g, '\\\'')}`;
};

const isRdfNode = (str) => {
  return str.startsWith('<') && str.endsWith('>');
};

const parseNQuad = (nquad) => {
  const removeAngleBrackets = (str) => {
    if (isRdfNode(str)) {
      return str.substring(1, str.length - 1);
    }
    return str;
  };
  const match = nquad.match(tripleRegex);
  let {subject, predicate, object} = match.groups;
  let objectGraph = object;
  let objectType = '';
  let objectValue = '';
  if (object.includes('_:c14n')) {
    objectGraph = `_:c14n${object.split('_:c14n')[1]}`;
    objectType = object.split(objectGraph)[0].trim();
    if (objectType.includes('^^')) {
      objectValue = getObjectValue(objectType) || '';
      objectType = objectType.split('^^')[1].trim();
    } else {
      objectValue = getObjectValue(objectType) || '';
      objectType = '';
    }
  }
  if (object.includes('^^')) {
    objectValue = getObjectValue(object) || '';
    objectType = object.split('^^')[1].trim();
    objectGraph = subject;
  }
  subject = removeAngleBrackets(subject).trim();
  predicate = removeAngleBrackets(predicate).trim();
  objectGraph = removeAngleBrackets(objectGraph).trim();
  objectType = removeAngleBrackets(objectType).trim();
  objectValue = removeEscapedQuotes(removeAngleBrackets(objectValue).trim());
  if (objectType === '') {
    objectType = undefined;
  }
  if (objectValue === '') {
    objectValue = undefined;
  }
  return JSON.parse(
      JSON.stringify({
        subject: subject,
        predicate: predicate,
        object: objectGraph,
        objectType: objectType,
        objectValue: objectValue,
      }),
  );
};

const getNQuads = async (doc, documentLoader) => {
  const canonized = await jsonld.canonize(doc, {
    algorithm: 'URDNA2015',
    format: 'application/n-quads',
    documentLoader,
    safe: false, // lossy behavior but doesn't fail
  });
  return canonized
      .split('\n')
      .filter((r) => r !== '')
      .map((r) => {
        return r.substring(0, r.length - 2);
      });
};

const addGraphNode = ({graph, id}) => {
  graph.nodes[id] = {
    ...(graph.nodes[id] || {id: id, labels: []}),
  };
};

const addGraphNodeProperty = (graph, id, key, value) => {
  graph.nodes[id] = {
    ...graph.nodes[id],
    [key]: value,
  };
};

const addGraphEdge = ({graph, source, target, label, definition}) => {
  graph.links.push(
      JSON.parse(
          JSON.stringify({
            source,
            label,
            definition,
            target,
          }),
      ),
  );
};

const updateObjectType = ({
  graph,
  subject,
  predicate,
  object,
  objectType,
  objectValue,
}) => {
  if (isIri(objectType)) {
    addGraphNode({graph, id: objectType});
    addGraphEdge({
      graph,
      label: getLabelFromIri(objectType),
      source: object,
      definition: predicate,
      target: objectType,
    });
  }
};

const updateObjectValue = ({
  graph,
  subject,
  predicate,
  object,
  objectType,
  objectValue,
}) => {
  addGraphNodeProperty(graph, object, predicate, objectValue);
  if (isIri(objectValue)) {
    addGraphNode({graph, id: objectValue});
    if (predicate === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') {
      addGraphEdge({
        graph,
        label: getLabelFromIri(objectValue),
        source: subject,
        definition: objectValue,
        target: object,
      });
      addGraphEdge({
        graph,
        label: getLabelFromIri(predicate),
        source: subject,
        definition: predicate,
        target: objectValue,
      });
    } else {
      addGraphEdge({
        graph,
        label: getLabelFromIri(predicate),
        source: object,
        definition: predicate,
        target: objectValue,
      });
    }
  }
  // console.log('🔥', {subject, predicate, object, objectType, objectValue});
};

const updateGraph = (graph, nquad) => {
  const statement = parseNQuad(nquad);
  // console.log(statement);
  const {subject, predicate, object, objectType, objectValue} = statement;
  addGraphNode({graph, id: subject});
  // uncomment to add predicates as nodes
  // addGraphNode({graph, id: predicate});
  addGraphNode({graph, id: object});
  if (!objectType && !objectValue) {
    addGraphEdge({
      graph,
      label: getLabelFromIri(predicate),
      source: subject,
      definition: predicate,
      target: object,
    });
  }
  if (objectType) {
    updateObjectType({
      graph,
      subject,
      predicate,
      object,
      objectType,
      objectValue,
    });
  }
  if (objectValue) {
    updateObjectValue({
      graph,
      subject,
      predicate,
      object,
      objectType,
      objectValue,
    });
  }
};

const removeEmptyBlankNodes = (graph) => {
  const blankNodes = graph.nodes
      .filter((n) => n.id.includes('_:c14n') && Object.keys(n).length === 2)
      .map((n) => n.id);
  blankNodes.forEach((id) => {
    const edges = graph.links.find((e) => {
      return e.source === id || e.target === id;
    });
    // remove blank nodes with no edges
    if (edges === undefined) {
      graph.nodes = graph.nodes.filter((n) => {
        return n.id !== id;
      });
    }
  });
};

const requireAbsoluteNodes = (graph) => {
  graph.nodes = graph.nodes.map((n) => {
    if (n.id.includes('_:c14n')) {
      n.id = graph.id + ':' + n.id;
    }
    return n;
  });
  graph.links = graph.links.map((e) => {
    if (e.source.includes('_:c14n')) {
      e.source = graph.id + ':' + e.source;
    }
    if (e.target.includes('_:c14n')) {
      e.target = graph.id + ':' + e.target;
    }
    return e;
  });
};

const graph = async (doc, {documentLoader, id}) => {
  const nodes = {};
  const links = [];
  const graph = {id, nodes, links};
  const nquads = await getNQuads(doc, documentLoader);
  nquads.forEach((nquad) => {
    updateGraph(graph, nquad);
  });
  // console.log(nquads);
  setNodeLabelFromEdges(graph);
  graph.nodes = Object.values(graph.nodes);
  graph.nodes = graph.nodes.map((n) => {
    const defaultLabel = getNodeLabel(n);
    const finalLabels =
      n.labels.length >= 1 && defaultLabel === 'Blank Node' ?
        n.labels :
        [defaultLabel, ...n.labels];

    return {...n, labels: finalLabels};
  });
  removeEmptyBlankNodes(graph);
  requireAbsoluteNodes(graph);
  return graph;
};

module.exports = graph;
