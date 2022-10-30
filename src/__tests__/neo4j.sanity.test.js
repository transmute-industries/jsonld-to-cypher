const neo4j = require('neo4j-driver');

it.skip('driver', async () => {
  const driver = neo4j.driver(
      'bolt://127.0.0.1:11006',
      neo4j.auth.basic('neo4j', 'test'),
  );
  const session = driver.session();
  // await session.run(
  //     `
  // CREATE (n:Person {name:'John'})
  // RETURN n
  // `,
  // );
  //   await session.run(
  //       `
  // MATCH (n)
  // DETACH DELETE n;
  // `,
  //   );
  await driver.close();
});
