jest.setTimeout(10 * 1000);

const dropTables = require('../test-utils/dropTables');

beforeAll(async () => {
  await dropTables();
});

it('application/vc+ld+json', async () => {
  //
});

afterAll(async () => {
  await driver.close();
});

// const query = await Cypher.fromDocument(fixtures.revocableCredential, {
//   documentLoader,
//   sourceGraphId:
//     'https://platform.transmute.industries/org_abc12345678/credentials/d1fcf50c-6f91-48a7-ad43-11506ddea5c4',
// });
// await session.run(query, {
//   // No params => injection vulnerable...
//   // nameParam: 'Alice',
// });
// await session.close();
// await driver.close();
// const {Cypher} = require('..');
// const fixtures = require('../__fixtures__');
// const documentLoader = require('../documentLoader');
