/* eslint-disable guard-for-in */
/* eslint-disable max-len */

const documentToGraph = require('./documentToGraph');
const graphToCypher = require('./graphToCypher');

const jwsToGraph = async (jws, {documentLoader}) => {
  const credential = JSON.parse(
      Buffer.from(jws.split('.')[1], 'base64').toString(),
  );
  return documentToGraph(credential, {documentLoader});
};

const Graph = {documentToGraph, jwsToGraph, graphToCypher};

module.exports = Graph;
