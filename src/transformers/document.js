/* eslint-disable guard-for-in */
/* eslint-disable max-len */
const jsonld = require('jsonld');
const uuid = require('uuid');

const {
  tripleRegex,
  isRdfNode,
  removeAngleBrackets,
  removeEscapedQuotes,
  isBlankNode,
  predicateToPropertyName,
  getPrimitiveTypeFromObject,
} = require('./utils');

const documentToRows = async (document, documentLoader) => {
  const canonized = await jsonld.canonize(document, {
    algorithm: 'URDNA2015',
    format: 'application/n-quads',
    documentLoader,
  });
  const rows = canonized
      .split('\n')
      .filter((r) => r !== '')
      .map((r) => {
        return r.substring(0, r.length - 2);
      });
  return rows;
};

const addRowsToGraph = (rows, graph) => {
  for (const row of rows) {
    const {subject, predicate, object} = rowToIntermediateObject(
        graph.id,
        row,
    );
    patchGraph({subject, predicate, object, graph});
  }
  graph.nodes = Object.values(graph.nodes);
};

const rowToIntermediateObject = (id, row) => {
  const match = row.match(tripleRegex);
  let {subject, predicate, object} = match.groups;
  subject = removeAngleBrackets(subject);
  predicate = removeAngleBrackets(predicate);
  // what is happening here...
  // pretty sure this is related to `@container`.
  if (object.includes('_:c14n')) {
    const objectParts = object.split('_:c14n');
    const objectValue = objectParts[0].trim();
    object = objectValue;
    if (object === '') {
      object = '_:c14n' + objectParts[1];
    }
  }
  if (isBlankNode(subject)) {
    subject = `${id}:${subject}`;
  }
  if (isBlankNode(object)) {
    object = `${id}:${object}`;
  }
  return {subject, predicate, object};
};

const patchGraph = ({subject, predicate, object, graph}) => {
  graph.nodes[subject] = {
    ...(graph.nodes[subject] || {id: subject}),
  };

  if (isBlankNode(subject) && isBlankNode(object)) {
    graph.links.push({
      source: removeAngleBrackets(subject),
      label: predicateToPropertyName(predicate),
      target: removeAngleBrackets(object),
    });
  }
  addTripleToGraph({subject, predicate, object, graph});
};

const addObjectAsNode = ({object, predicate, graph}) => {
  object = removeAngleBrackets(object);
  // add node
  graph.nodes[object] = {
    ...(graph.nodes[object] || {id: object}),
  };
  const label = predicateToPropertyName(object);
  // add edge
  graph.links.push({
    source: removeAngleBrackets(predicate),
    label,
    target: removeAngleBrackets(object),
  });
};

const addObjectAsProperty = ({subject, predicate, object, graph}) => {
  const label = predicateToPropertyName(predicate);
  graph.links.push({
    source: removeAngleBrackets(subject),
    label,
    target: removeAngleBrackets(predicate),
  });
  // add predicate as subject property
  graph.nodes[subject] = {
    ...graph.nodes[subject],
    [predicateToPropertyName(removeAngleBrackets(predicate))]:
      getPrimitiveTypeFromObject(removeEscapedQuotes(object)),
  };
};
const addTripleToGraph = ({subject, predicate, object, graph}) => {
  graph.nodes[predicate] = {
    ...(graph.nodes[predicate] || {id: predicate}),
  };
  if (isRdfNode(object)) {
    addObjectAsNode({object, predicate, graph});
  } else {
    addObjectAsProperty({subject, predicate, object, graph});
  }
};

const toJsonLdGraph = async (doc, {documentLoader}) => {
  const id = `urn:uuid:${uuid.v4()}`;
  const rows = await documentToRows(doc, documentLoader);
  const nodes = {[id]: {id}};
  const links = [];
  const graph = {id, nodes, links};
  addRowsToGraph(rows, graph);
  return {
    id,
    doc,
    nodes: graph.nodes,
    links: graph.links,
  };
};
const document = {toJsonLdGraph};
module.exports = document;
