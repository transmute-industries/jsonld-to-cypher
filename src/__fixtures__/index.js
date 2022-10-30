/* eslint-disable max-len */
const documentLoader = require('../documentLoader');

const preview = require('./preview');
const {jws} = require('./jws.json');
const publicKeyJwk = require('./publicKeyJwk.json');
const revocableCredential = require('./revocableCredential.json');
const alg = 'ES256';

const claimSet = {
  string: 'It’s a dangerous business, Frodo, going out your door.',
  number: 42.5,
  object: {foo: '🙋‍♀️'},
  boolean: true,
};

const injectedVocabExample = {
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

const verifiableCredential = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    {
      '@vocab': 'https://vocabulary.transmute.industries/ns/dynamic/#',
    },
  ],
  'id': 'urn:uuid:11111111111',
  'type': ['VerifiableCredential'],
  'issuer': 'did:example:123',
  'issuanceDate': '2010-01-01T19:23:24Z',
  'credentialSubject': {
    id: 'https://vendor.example/subjects/123',
    type: 'Brand',
    string: 'It’s a dangerous business, Frodo, going out your door.',
    number: 42.5,
    object: {foo: '🙋‍♀️'},
    boolean: true,
    image: 'https://source.unsplash.com/category/nature/896x896',
  },
  'proof': {
    type: 'Ed25519Signature2018',
    created: '2022-10-29T16:36:26Z',
    verificationMethod:
      'did:example:123#z6Mks97GYazoL5eaSwidTSumYVsoaJn1qZ9AMPF7idY3TjSz',
    proofPurpose: 'assertionMethod',
    jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..A--05OBGky5rtBJBiWUTx77p3BK2rUaeKJRVMqyQVwOZR4_zE8XNQsH7Vrgae143VpGuGCbMNl_5QgvZkPO1Dw',
  },
};

module.exports = {
  jws,
  publicKeyJwk,
  alg,
  claimSet,
  injectedVocabExample,
  verifiableCredential,
  revocableCredential,
  preview,
  documentLoader,
};
