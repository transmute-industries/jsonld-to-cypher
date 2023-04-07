/* eslint-disable max-len */
const documentLoader = require('../documentLoader');
const autograph = require('../autograph');
const jsonGraphToCypher = require('../jsonGraphToCypher');
// const jsonWebSigantureToDocument = require('./jsonWebSigantureToDocument');

const Cypher = {
  fromDocument: async (
      document,
      options = {documentLoader, sourceGraphId: false},
  ) => {
    const intermediate = await autograph(document, options);
    const cypher = await jsonGraphToCypher(intermediate, options.sourceGraphId);
    return cypher;
  },
  // fromJsonWebSignature: async (
  //     jws,
  //     options = {documentLoader, sourceGraphId: false},
  // ) => {
  //   const document = await jsonWebSigantureToDocument(jws);
  //   const intermediate = await documentToJsonGraph(document, options);
  //   const cypher = await jsonGraphToCypher(intermediate, options.sourceGraphId);
  //   return cypher;
  // },
};

module.exports = Cypher;
