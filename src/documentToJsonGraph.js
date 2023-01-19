/* eslint-disable guard-for-in */
/* eslint-disable max-len */

const uuid = require('uuid');
const autograph = require('./autograph');
const preferences = require('./preferences');

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
  const graph = await autograph(doc, {documentLoader, id});
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
