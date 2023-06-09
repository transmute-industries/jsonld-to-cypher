const neo4j = require('neo4j-driver');
const uuid = require('uuid');

const {Cypher} = require('../src');
const documentLoader = require('../src/documentLoader');

const mergeDocument = async (document, {url, username, password}) => {
  const driver = neo4j.driver(url, neo4j.auth.basic(username, password));
  const session = driver.session();
  const id = document.id || `urn:uuid:${uuid.v4()}`;
  // dangerous af.
  const {cypher} = await Cypher.fromDocument(document, {id, documentLoader});
  await session.run(cypher, {
    // No params => injection vulnerable...
    // nameParam: 'Alice',
  });
  // console.log(result);
  await session.close();
  await driver.close();
};

module.exports = mergeDocument;
