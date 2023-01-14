const neo4j = require('neo4j-driver');
const {Cypher} = require('../..');

const mergeDocument = async (document, {url, username, password}) => {
  const driver = neo4j.driver(url, neo4j.auth.basic(username, password));
  const session = driver.session();
  // dangerous af.
  const query = await Cypher.fromDocument(document);
  await session.run(query, {
    // No params => injection vulnerable...
    // nameParam: 'Alice',
  });
  // console.log(result);
  await session.close();
  await driver.close();
};

module.exports = mergeDocument;
