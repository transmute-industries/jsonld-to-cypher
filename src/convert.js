const Graph = require('./Graph');
const documentLoader = require('./documentLoader');

const convert = async (document) => {
  const g = await Graph.documentToGraph(document, {documentLoader});
  const c = await Graph.graphToCypher(g);
  return c;
};

module.exports = convert;
