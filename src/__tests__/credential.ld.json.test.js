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

it('application/credential+ld+json', async () => {
  const driver = neo4j.driver(
      process.env.NEO4J_URI,
      neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD),
  );
  const session = driver.session();
  await session.run(dropTables);
  const query = await Cypher.fromDocument(fixtures.revocableCredential);
  console.log(query);
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
