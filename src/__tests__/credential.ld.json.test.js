const neo4j = require('neo4j-driver');

const {Cypher} = require('..');
const fixtures = require('../__fixtures__');

jest.setTimeout(10 * 1000);

const dropTables = `
MATCH (n)
DETACH DELETE n
`;

// const fullTableScan = `
// MATCH (n)
// RETURN n
// `;

it.skip('application/credential+ld+json', async () => {
  const driver = neo4j.driver(
      'bolt://127.0.0.1:11003',
      neo4j.auth.basic('neo4j', 'password'),
  );
  const session = driver.session();
  await session.run(dropTables);
  const query = await Cypher.fromDocument(fixtures.revocableCredential);
  await session.run(query, {
    // No params => injection vulnerable...
    // nameParam: 'Alice',
  });
  // console.log(result);
  await session.close();
  await driver.close();
});

afterAll((done) => {
  setTimeout(done, 0);
});
