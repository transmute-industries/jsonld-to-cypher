const neo4j = require('neo4j-driver');
const lib = require('../');
const fixtures = require('../__fixtures__');
// it('driver', async () => {
//   const driver = neo4j.driver(
//       'bolt://127.0.0.1:11006',
//       neo4j.auth.basic('neo4j', 'test'),
//   );
//   const session = driver.session();
//   await session.run(
//       `
//   CREATE (n:Person {name:'John'})
//   RETURN n
//   `,
//   );

//   await driver.close();
// });

it('test', async () => {
  const driver = neo4j.driver(
      'bolt://127.0.0.1:11006',
      neo4j.auth.basic('neo4j', 'test'),
  );
  const session = driver.session();
  const graph = await lib.transformers.document.toJsonLdGraph(
      fixtures.injectedVocabExample,
      {documentLoader: fixtures.documentLoader},
  );
  await session.run(
      `
  MATCH (n)
  DETACH DELETE n;
  `,
  );
  const cypher = await lib.transformers.cypher.graphToCypher(graph);
  console.log(cypher);
  await session.run(cypher);
  await driver.close();
});
