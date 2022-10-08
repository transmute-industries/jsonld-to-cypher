// due to the use of @container in vc data model
// there are several predicate types that need to be created like
// little snowflakes.

const {removeAngleBrackets, predicateToPropertyName} = require('./utils');

const littleNasties = [
  'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  'https://www.w3.org/2018/credentials#issuer',
  'https://www.w3.org/2018/credentials#credentialSubject',
  'https://w3id.org/vc-revocation-list-2020#revocationListCredential',
  'https://www.w3.org/2018/credentials#credentialStatus',
  'https://w3id.org/security#proofPurpose',
  'https://w3id.org/security#verificationMethod',
];

const bigNasties = ['https://w3id.org/security#proof'];

const handleSnowFlake = ({subject, predicate, object, graph}) => {
  object = removeAngleBrackets(object);
  graph.nodes[object] = {
    ...(graph.nodes[object] || {id: object}),
  };
  graph.links.push({
    source: subject,
    label: predicateToPropertyName(predicate),
    target: object,
  });
  if (bigNasties.includes(predicate)) {
    graph.links.push({
      source: object,
      label: predicateToPropertyName(predicate),
      // because we know we don't support proof chains / proof sets...
      target: object.replace('c14n0', 'c14n1'),
    });
  }
};

module.exports = {
  littleNasties,
  bigNasties,
  handleSnowFlake,
};
