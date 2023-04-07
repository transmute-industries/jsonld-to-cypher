/* eslint-disable max-len */

const fs = require('fs');
const path = require('path');
const {Cypher} = require('../../..');
const {getDriver, dropTables} = require('../../../test-utils');
const documentLoader = require('../../../documentLoader');

let driver;

const v1 = {
  '@context': ['https://www.w3.org/2018/credentials/v1'],
  'type': ['VerifiableCredential'],
  'issuer': 'https://example.edu/issuers/565049',
  'issuanceDate': '2010-01-01T19:23:24Z',
  'credentialSubject': {
    id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
  },
};
const expected = fs
    .readFileSync(path.resolve(__dirname, './minimal.v1.txt'))
    .toString();

describe('minimal', () => {
  beforeAll(async () => {
    await dropTables();
    driver = getDriver();
  });
  it('v1 credential', async () => {
    const query = await Cypher.fromDocument(v1, {
      id: 'urn:uuid:123',
      documentLoader,
    });
    const session = driver.session();
    await session.run(query);
    await session.close();
    // expect(query).toBe(expected);
  });
  afterAll(async () => {
    await driver.close();
  });
});
