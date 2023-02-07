const neo4j = require('neo4j-driver');

const {Cypher} = require('..');
const fixtures = require('../__fixtures__');
const documentLoader = require('../documentLoader');

jest.setTimeout(10 * 1000);

const dropTables = `
MATCH (n)
DETACH DELETE n
`;

// const fullTableScan = `
// MATCH (n)
// RETURN n
// `;

it('application/credential+ld+json', async () => {
  const driver = neo4j.driver(
      process.env.NEO4J_URI,
      neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD),
  );
  const session = driver.session();
  await session.run(dropTables);
  const query = await Cypher.fromDocument(fixtures.revocableCredential, {documentLoader, sourceGraphId: 'https://platform.transmute.industries/org_abc12345678/credentials/d1fcf50c-6f91-48a7-ad43-11506ddea5c4'});
  await session.run(query, {
    // No params => injection vulnerable...
    // nameParam: 'Alice',
  });
  await session.close();
  await driver.close();
});

afterAll((done) => {
  setTimeout(done, 0);
});
