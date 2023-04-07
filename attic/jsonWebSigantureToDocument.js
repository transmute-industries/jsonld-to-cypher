const jose = require('jose');
const uuid = require('uuid');
const preferences = require('./preferences');

const fromVerification = async ({payload, protectedHeader}) => {
  const id = `urn:uuid:${uuid.v4()}`;
  const protectedClaimSet = JSON.parse(new TextDecoder().decode(payload));
  const intermediateObject = {
    '@context': {
      '@vocab': preferences.defaultVocabulary,
      '@base': id,
    },
    protectedHeader,
    protectedClaimSet,
  };
  return intermediateObject;
};

const jsonWebSigantureToDocument = async (jws) => {
  const [encodedHeader, encodedPayload] = jws.split('.');
  const protectedHeader = JSON.parse(
      new TextDecoder().decode(jose.base64url.decode(encodedHeader)),
  );
  const payload = jose.base64url.decode(encodedPayload);
  return fromVerification({protectedHeader, payload});
};

module.exports = jsonWebSigantureToDocument;
