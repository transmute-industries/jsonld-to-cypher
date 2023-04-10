const documentLoader = require('../documentLoader');
const autograph = require('../autograph');
const autographToCypher = require('./autographToCypher');

const fromDocument = async (document, options = {documentLoader}) => {
  const graph = await autograph(document, options);
  const cypher = await autographToCypher(graph, options);
  return {cypher, graph};
};

module.exports = fromDocument;
