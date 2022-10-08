const Graph = require('./Graph');
const documentLoader = require('./documentLoader');

const convert = async (document) => {
  const g = await Graph.documentToGraph(document, {documentLoader});

  console.log(g);
  return '';
};

module.exports = convert;
