const jose = require('jose');
const uuid = require('uuid');

const getLinkedDataFromDecoded = async ({payload, protectedHeader}) => {
  const id = `urn:uuid:${uuid.v4()}`;
  const protectedClaimSet = JSON.parse(new TextDecoder().decode(payload));
  const intermediateObject = {
    '@context': {
      '@vocab': 'https://voc.example/',
      '@base': id,
    },
    protectedHeader,
    protectedClaimSet,
  };
  return intermediateObject;
};

const getLinkedDataFromJws = async (jws) => {
  const [encodedHeader, encodedPayload] = jws.split('.');
  const protectedHeader = JSON.parse(
      new TextDecoder().decode(jose.base64url.decode(encodedHeader)),
  );
  const payload = jose.base64url.decode(encodedPayload);
  return getLinkedDataFromDecoded({protectedHeader, payload});
};

module.exports = getLinkedDataFromJws;
