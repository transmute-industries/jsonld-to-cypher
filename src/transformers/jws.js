const jose = require('jose');

const toIntermediateObject = async (jws, publicKeyJwk) => {
  const publicKey = await jose.importJWK(publicKeyJwk);
  const {payload, protectedHeader} = await jose.compactVerify(jws, publicKey);
  const protectedClaimSet = JSON.parse(new TextDecoder().decode(payload));
  const intermediateObject = {
    '@context': {
      '@vocab': 'https://vocabulary.transmute.industries/ns/dynamic/#',
    },
    protectedHeader,
    protectedClaimSet,
  };
  return intermediateObject;
};

const jws = {toIntermediateObject};

module.exports = jws;
