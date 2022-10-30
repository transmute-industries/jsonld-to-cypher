const neo4j = require('neo4j-driver');
const lib = require('../');
const fixtures = require('../__fixtures__');

const driver = neo4j.driver(
    'bolt://127.0.0.1:11006',
    neo4j.auth.basic('neo4j', 'test'),
);
const session = driver.session();

beforeAll(async () => {
  await session.run(
      `
    MATCH (n)
    DETACH DELETE n;
    `,
  );
});

it('test', async () => {
  const graph = await lib.transformers.document.toJsonLdGraph(
      fixtures.verifiableCredential,
      {documentLoader: fixtures.documentLoader},
  );

  const cypher = await lib.transformers.cypher.graphToCypher(graph);
  console.log(cypher);
  await session.run(cypher);
  await driver.close();
});
