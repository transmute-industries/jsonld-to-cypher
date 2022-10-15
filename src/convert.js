const Graph = require('./Graph');
const VerifiableCredentials = require('./VerifiableCredentials');
const documentLoader = require('./documentLoader');

const convert = async (document, type = 'json') => {
  if (type === 'json') {
    const g = await Graph.documentToGraph(document, {documentLoader});
    const c = await Graph.graphToCypher(g);
    return c;
  }

  if (type === 'jwt') {
    return VerifiableCredentials.toCypher(document, {documentLoader});
  }
};

module.exports = convert;
