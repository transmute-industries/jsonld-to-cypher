const getGraphFromDocument = require('./getGraphFromDocument');
const getCypherFromGraph = require('./getCypherFromGraph');
const getLinkedDataFromJws = require('./getLinkedDataFromJws');

const fromJsonWebSignature = async (jws, options = {documentLoader}) => {
  const document = await getLinkedDataFromJws(jws);
  const graph = await getGraphFromDocument(document, options);
  const cypher = await getCypherFromGraph(graph, options);
  return {cypher, graph};
};

module.exports = fromJsonWebSignature;
