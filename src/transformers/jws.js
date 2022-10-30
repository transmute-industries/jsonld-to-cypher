const jose = require('jose');
const uuid = require('uuid');
const toIntermediateObject = async (jws, publicKeyJwk) => {
  const id = `urn:uuid:${uuid.v4()}`;
  const publicKey = await jose.importJWK(publicKeyJwk);
  const {payload, protectedHeader} = await jose.compactVerify(jws, publicKey);
  const protectedClaimSet = JSON.parse(new TextDecoder().decode(payload));
  const intermediateObject = {
    '@context': {
      '@vocab': 'https://vocabulary.transmute.industries/ns/dynamic/#',
      '@base': id,
    },
    protectedHeader,
    protectedClaimSet,
  };
  return intermediateObject;
};

const jws = {toIntermediateObject};

module.exports = jws;
