const axios = require('axios');

const documentLoader = async (iri) => {
  const response = await axios.get(iri);
  const doc = response.data;
  if (doc) {
    return {document: doc};
  }
  throw new Error('Unsupported iri: ' + iri);
};

module.exports = documentLoader;
