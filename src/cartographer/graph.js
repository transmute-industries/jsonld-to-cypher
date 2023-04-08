/* eslint-disable max-len */
const jsonld = require('jsonld');

const tripleRegex =
  /^(?<subject>(<([^<>]+)>|^_:c14n\d+)) (?<predicate>(<([^<>]+)>)) (?<object>(.+))/;

const getObjectValue = (str) => {
  const removeEscapedQuotes = (str) => {
    if (str.startsWith('"') && str.endsWith('"')) {
      return str.substring(1, str.length - 1);
    }
    return str;
  };
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
  if (predicate === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') {
    objectType = '';
  }
  subject = removeAngleBrackets(subject).trim();
  predicate = removeAngleBrackets(predicate).trim();
  objectGraph = removeAngleBrackets(objectGraph).trim();
  objectType = removeAngleBrackets(objectType).trim();
  objectValue = removeAngleBrackets(objectValue).trim();
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

const isUrl = (iri) => {
  return iri.startsWith('http');
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
    ...(graph.nodes[id] || {id: id}),
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

const updateGraph = (graph, nquad) => {
  const statement = parseNQuad(nquad);
  console.log(statement);
  const {subject, predicate, object, objectType, objectValue} = statement;
  addGraphNode({graph, id: subject});
  addGraphNode({graph, id: predicate});
  addGraphNode({graph, id: object});
  if (objectType) {
    if (isUrl(objectType)) {
      addGraphNode({graph, id: objectType});
    } else {
      // we rarely care about object types...
      // because RDF types are sad.
      console.log('🔥', {objectType});
    }
  }
  if (objectValue) {
    addGraphNodeProperty(graph, object, predicate, objectValue);
    if (isUrl(objectValue)) {
      addGraphNode({graph, id: objectValue});
    } else {
      // console.log('🔥', {objectValue});
    }
  }
  addGraphEdge({
    graph,
    source: subject,
    definition: predicate,
    target: object,
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
  console.log(nquads);
  graph.nodes = Object.values(graph.nodes);
  return graph;
};

module.exports = graph;
