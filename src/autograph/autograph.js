/* eslint-disable max-len */
const jsonld = require('jsonld');
const _ = require('lodash');

const autograph = async (doc, {documentLoader, id}) => {
  const nodes = {[id]: {id}};
  const links = [];
  const graph = {id, nodes, links};
  if (doc.id === undefined) {
    doc.id = id;
  } else {
    links.push({
      definition: 'https://wikipedia.org/wiki/Named_graph',
      source: id,
      label: 'Named Graph',
      target: doc.id,
    });
  }
  const canonized = await jsonld.canonize(doc, {
    algorithm: 'URDNA2015',
    format: 'application/n-quads',
    documentLoader,
    safe: false, // lossy behavior but doesn't fail
  });
  const rows = canonized
      .split('\n')
      .filter((r) => r !== '')
      .map((r) => {
        return r.substring(0, r.length - 2);
      });

  const isBlankNode = (iri) => {
    return iri.includes('_:c14n');
  };

  const tripleRegex =
    /^(?<subject>(<([^<>]+)>|^_:c14n\d+)) (?<predicate>(<([^<>]+)>)) (?<object>(.+))/;
  const isRdfNode = (str) => {
    return str.startsWith('<') && str.endsWith('>');
  };

  const removeAngleBrackets = (str) => {
    if (isRdfNode(str)) {
      return str.substring(1, str.length - 1);
    }
    return str;
  };

  const rowToIntermediateObject = (id, row) => {
    const match = row.match(tripleRegex);
    let {subject, predicate, object} = match.groups;
    if (object.includes('_:c14n')) {
      const objectParts = object.split('_:c14n');
      const objectValue = objectParts[0].trim();
      object = objectValue;
      if (object === '') {
        object = '_:c14n' + objectParts[1];
      }
    }
    if (isBlankNode(subject)) {
      subject = `<${id}:${subject}>`;
    }
    if (isBlankNode(object)) {
      object = `<${id}:${object}>`;
    }
    return {subject, predicate, object};
  };

  const addSubjectToGraph = ({subject, graph}) => {
    subject = removeAngleBrackets(subject);
    graph.nodes[subject] = {
      ...(graph.nodes[subject] || {id: subject}),
    };
  };

  const removeEscapedQuotes = (str) => {
    if (str.startsWith('"') && str.endsWith('"')) {
      return str.substring(1, str.length - 1);
    }
    return str;
  };

  const getPrimitiveTypeFromObject = (str) => {
    const [primitive] = str.split('^^');
    try {
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
    } catch (e) {
      return `${str.replace(/'/g, '\\\'')}`;
    }
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

  const getLabelFromIri = (iri) => {
    return _.startCase(iri.split('/').pop().split('#').pop());
  };

  const getNodeLabel = (node) => {
    if (node.label) {
      return node.label;
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
    graph.links.forEach((link) => {
      if (link.label === 'Type') {
        graph.nodes[link.target].label = 'Type';
      }
    });
  };

  const addObjectToGraph = ({object, graph}) => {
    object = removeAngleBrackets(object);
    graph.nodes[object] = {
      ...(graph.nodes[object] || {id: object}),
    };
  };

  const addObjectAsPropertiesOfSubject = ({
    subject,
    predicate,
    object,
    graph,
  }) => {
    subject = removeAngleBrackets(subject);
    graph.nodes[subject] = {
      ...graph.nodes[subject],
      [removeAngleBrackets(predicate)]: getPrimitiveTypeFromObject(
          removeEscapedQuotes(object),
      ),
    };
  };

  const maybeAddPredicateAsLink = ({subject, predicate, graph}) => {
    const subjectIri = removeAngleBrackets(subject);
    if (isBlankNode(subjectIri)) {
      const predicateIri = removeAngleBrackets(predicate);
      graph.links.push({
        definition: predicateIri,
        source: subjectIri.split(':_:')[0],
        label: getLabelFromIri(predicateIri),
        target: subjectIri,
      });
    }
  };
  for (const row of rows) {
    const {subject, predicate, object} = rowToIntermediateObject(
        graph.id,
        row,
    );
    addSubjectToGraph({subject, graph});
    if (isRdfNode(object)) {
      addObjectToGraph({object, graph});
      const predicateIri = removeAngleBrackets(predicate);
      graph.links.push({
        definition: predicateIri,
        source: removeAngleBrackets(subject),
        label: getLabelFromIri(predicateIri),
        target: removeAngleBrackets(object),
      });
    } else {
      addObjectAsPropertiesOfSubject({subject, predicate, object, graph});
      maybeAddPredicateAsLink({subject, predicate, graph});
    }
  }

  setNodeLabelFromEdges(graph);
  graph.nodes = Object.values(graph.nodes);
  graph.nodes = graph.nodes.map((n) => {
    return {...n, label: getNodeLabel(n)};
  });

  const nodeSort = (a, b) => {
    return a.id >= b.id ? 1 : -1;
  };

  const linkSort = (a, b) => {
    return a.source >= b.source ? 1 : -1;
  };

  // const hasEdge = (source, target, graph) => {
  //   return (
  //     graph.links.find((link) => {
  //       return link.source === source && link.target === target;
  //     }) !== undefined
  //   );
  // };

  // const hasBackEdge = (source, target, graph) => {
  //   return hasEdge(target, source, graph);
  // };

  // const hasInbound = (target, graph) => {
  //   return (
  //     graph.links.find((link) => {
  //       return link.target === target;
  //     }) !== undefined
  //   );
  // };
  // // record all relationships as originating
  // // from this graph...
  // graph.nodes.forEach((node) => {
  //   if (
  //     id !== node.id &&
  //     !hasEdge(id, node.id, graph) &&
  //     !hasBackEdge(id, node.id, graph) &&
  //     !hasInbound(node.id, graph)
  //   ) {
  //     graph.links.push({
  //       source: id,
  //       definition: '🔥',
  //       target: node.id,
  //     });
  //   }
  // });

  return {
    id,
    doc,
    nodes: graph.nodes.sort(nodeSort),
    links: graph.links.sort(linkSort),
  };
};

module.exports = autograph;
