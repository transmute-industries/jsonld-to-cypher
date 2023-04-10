const autograph = require('../autograph');
const autographToCypher = require('./autographToCypher');

const fromJsonWebSignature = async (jws, options = {documentLoader}) => {
  const document = await jsonWebSigantureToDocument(jws);
  const intermediate = await autograph(document, options);
  const cypher = await autographToCypher(intermediate, options);
  return cypher;
};

module.exports = fromJsonWebSignature;
