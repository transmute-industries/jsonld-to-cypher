const documentLoader = require('./documentLoader');

const preferences = require('./preferences');
const utils = require('./utils');

const jsonWebSigantureToDocument = require('./jsonWebSigantureToDocument');
const documentToJsonGraph = require('./documentToJsonGraph');

const jsonGraphToCypher = require('./jsonGraphToCypher');
const jsonGraphToDot = require('./jsonGraphToDot');

const Cypher = {
  fromDocument: async (document, options = {documentLoader}) => {
    const intermediate = await documentToJsonGraph(document, options);
    const cypher = await jsonGraphToCypher(intermediate);
    return cypher;
  },
  fromJsonWebSignature: async (jws, options = {documentLoader}) => {
    const document = await jsonWebSigantureToDocument(jws);
    return this.fromDocument(document, options);
  },
};

const GraphViz = {
  fromJsonWebSignature: async (jws, options = {documentLoader}) => {
    const document = await jsonWebSigantureToDocument(jws);
    const intermediate = await documentToJsonGraph(document, options);
    const dot = await jsonGraphToDot(intermediate);
    return dot;
  },
};

module.exports = {
  Cypher,
  GraphViz,

  utils: {
    preferences,
    documentLoader,
    documentToJsonGraph,
    jsonGraphToDot,
    jsonGraphToCypher,
    jsonWebSigantureToDocument,
    ...utils,
  },
};
