/* eslint-disable max-len */

const fs = require('fs');
const path = require('path');
const {Cypher} = require('../..');
const {getDriver, dropTables} = require('../../test-utils');
let driver;

const v1 = {
  '@context': ['https://www.w3.org/2018/credentials/v1'],
  'id': 'urn:uuid:123', // optional
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
    const query = await Cypher.fromDocument(v1);
    expect(query).toBe(expected);
  });

  it('merge v1 credential', async () => {
    const session = driver.session();
    await session.run(expected);
    await session.close();
  });

  afterAll(async () => {
    await driver.close();
  });
});
