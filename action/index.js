const core = require('@actions/core');

const operationSwitch = require('./operationSwitch');

const getOpts = () => {
  return {
    neo4j_uri: core.getInput('neo4j-uri'),
    neo4j_user: core.getInput('neo4j-user'),
    neo4j_password: core.getInput('neo4j-password'),
    operation: core.getInput('operation'),
    document: core.getInput('document'),
  };
};

async function run() {
  try {
    const opts = getOpts();
    const response = await operationSwitch(opts);
    core.setOutput('json', JSON.stringify(response));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
