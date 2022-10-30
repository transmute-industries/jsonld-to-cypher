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

const preferences = require('./preferences');

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

const addSubjectToGraph = ({subject, graph}) => {
  subject = removeAngleBrackets(subject);
  graph.nodes[subject] = {
    ...(graph.nodes[subject] || {id: subject}),
  };
};

const addPredicateToGraph = ({predicate, graph}) => {
  predicate = removeAngleBrackets(predicate);
  graph.nodes[predicate] = {
    ...(graph.nodes[predicate] || {id: predicate}),
  };
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
    [predicateToPropertyName(removeAngleBrackets(predicate))]:
      getPrimitiveTypeFromObject(removeEscapedQuotes(object)),
  };
};

const addRowsToGraph = (rows, graph) => {
  for (const row of rows) {
    const {subject, predicate, object} = rowToIntermediateObject(
        graph.id,
        row,
    );
    addSubjectToGraph({subject, graph});
    addPredicateToGraph({predicate, graph});
    if (isRdfNode(object)) {
      addObjectToGraph({object, graph});
      graph.links.push({
        source: removeAngleBrackets(subject),
        label: removeAngleBrackets(predicate),
        target: removeAngleBrackets(object),
      });
    } else {
      addObjectAsPropertiesOfSubject({subject, predicate, object, graph});
      graph.links.push({
        source: removeAngleBrackets(predicate),
        label: preferences.defaultPredicate,
        target: removeAngleBrackets(subject),
      });
    }
  }
  graph.nodes = Object.values(graph.nodes);
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

const nodeSort = (a, b) => {
  return a.id >= b.id ? 1 : -1;
};

const linkSort = (a, b) => {
  return a.source >= b.source ? 1 : -1;
};

const hasEdge = (source, target, graph) => {
  return (
    graph.links.find((link) => {
      return link.source === source && link.target === target;
    }) !== undefined
  );
};

const hasBackEdge = (source, target, graph) => {
  return hasEdge(target, source, graph);
};

const hasInbound = (target, graph) => {
  return (
    graph.links.find((link) => {
      return link.target === target;
    }) !== undefined
  );
};

const documentToJsonGraph = async (doc, {documentLoader}) => {
  const id = doc.id || `urn:uuid:${uuid.v4()}`;
  const rows = await documentToRows(doc, documentLoader);
  const nodes = {[id]: {id}};
  const links = [];
  const graph = {id, nodes, links};
  addRowsToGraph(rows, graph);
  // record all relationships as originating
  // from this graph...
  graph.nodes.forEach((node) => {
    if (
      id !== node.id &&
      !hasEdge(id, node.id, graph) &&
      !hasBackEdge(id, node.id, graph) &&
      !hasInbound(node.id, graph)
    ) {
      graph.links.push({
        source: id,
        label: preferences.defaultRelationship,
        target: node.id,
      });
    }
  });

  return {
    id,
    doc,
    nodes: graph.nodes.sort(nodeSort),
    links: graph.links.sort(linkSort),
  };
};

module.exports = documentToJsonGraph;
