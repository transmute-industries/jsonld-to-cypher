const fs = require('fs');
const path = require('path');
const {Cypher} = require('..');
const documentLoader = require('../documentLoader');
const getDriver = require('./getDriver');
const dropTables = require('./dropTables');

const readExample = (exampleName) => {
  return JSON.parse(
      fs
          .readFileSync(
              path.resolve(
                  __dirname,
                  '../../examples/',
                  exampleName,
                  `${exampleName}.json`,
              ),
          )
          .toString(),
  );
};

const writeFile = (filePath, fileContent) => {
  fs.writeFileSync(
      path.resolve(__dirname, '../../examples/', filePath),
      fileContent,
  );
};

const writeExampleResult = ({example, cypher, graph}) => {
  writeFile(`${example}/${example}.cypher`, cypher);
  writeFile(
      `${example}/${example}.graph.json`,
      JSON.stringify(graph, null, 2) + '\n',
  );
};

const runQuery = async (driver, query) => {
  const session = driver.session();
  await session.run(query);
  await session.close();
};

const opts = {
  documentLoader,
};

const runExample = async (driver, example) => {
  opts.id = `urn:example:${example}`;
  const doc = readExample(example);
  const {cypher, graph} = await Cypher.fromDocument(doc, opts);
  writeExampleResult({example, cypher, graph});
  await runQuery(driver, cypher);
};

module.exports = {
  getDriver,
  dropTables,
  runExample,
};
