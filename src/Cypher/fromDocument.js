const documentLoader = require('../documentLoader');
const getGraphFromDocument = require('./getGraphFromDocument');
const getCypherFromGraph = require('./getCypherFromGraph');

const fromDocument = async (document, options = {id: '', documentLoader}) => {
  const graph = await getGraphFromDocument(document, options);
  const cypher = await getCypherFromGraph(graph, options);
  return {cypher, graph};
};

module.exports = fromDocument;
