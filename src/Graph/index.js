/* eslint-disable guard-for-in */
/* eslint-disable max-len */

const documentToGraph = require('./documentToGraph');
const graphToCypher = require('./graphToCypher');

const jwsToGraph = async (jws, {documentLoader}) => {
  let parsed = JSON.parse(Buffer.from(jws.split('.')[1], 'base64').toString());
  // handle support for future proofing VCDM security formats.
  if (parsed.vc) {
    parsed = parsed.vc;
  }
  if (parsed.vp) {
    parsed = parsed.vp;
  }
  return documentToGraph(parsed, {
    documentLoader,
  });
};

const Graph = {documentToGraph, jwsToGraph, graphToCypher};

module.exports = Graph;
