const documentLoader = require('../documentLoader');

const preview = require('./preview');
const {jws} = require('./jws.json');
const publicKeyJwk = require('./publicKeyJwk.json');

const alg = 'ES256';

const claimSet = {
  string: 'It’s a dangerous business, Frodo, going out your door.',
  number: 42.5,
  object: {foo: '🙋‍♀️'},
  boolean: true,
};

const exampleDocument = {
  '@context': {
    '@vocab': 'https://vocabulary.transmute.industries/ns/dynamic/#',
  },
  'protectedHeader': {alg: 'ES256'},
  'protectedClaimSet': {
    string: 'It’s a dangerous business, Frodo, going out your door.',
    number: 42.5,
    object: {foo: '🙋‍♀️'},
    boolean: true,
  },
};

module.exports = {
  jws,
  publicKeyJwk,
  alg,
  claimSet,
  exampleDocument,
  preview,
  documentLoader,
};
