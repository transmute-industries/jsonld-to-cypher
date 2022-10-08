const Graph = require('./Graph');
const documentLoader = require('./documentLoader');

const convert = async (document, type = 'json') => {
  let g;

  if (type === 'json') {
    g = await Graph.documentToGraph(document, {documentLoader});
  }

  if (type === 'jwt') {
    g = await Graph.jwsToGraph(document, {documentLoader});
  }

  const c = await Graph.graphToCypher(g);
  return c;
};

module.exports = convert;
