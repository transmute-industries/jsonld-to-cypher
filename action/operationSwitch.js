const core = require('@actions/core');

const mergeDocument = require('./mergeDocument');
const mergeOperation = async (env) => {
  const parsedDocument = JSON.parse(env.document);
  const errors = [];
  if (Array.isArray(parsedDocument)) {
    for (let i = 0; i < parsedDocument.length; i++) {
      const item = parsedDocument[i];
      try {
        await mergeDocument(item, {
          url: env.neo4j_uri,
          username: env.neo4j_user,
          password: env.neo4j_password,
        });
      } catch (err) {
        errors.push(`document idx ${i}: ${err.message}`);
      }
    }
  } else {
    await mergeDocument(parsedDocument, {
      url: env.neo4j_uri,
      username: env.neo4j_user,
      password: env.neo4j_password,
    });
  }
  if (errors.length > 0) {
    core.setOutput('errors', JSON.stringify(errors));
  }
  return {};
};

const operation = {
  merge: mergeOperation,
};

const operationSwitch = async (env) => {
  if (operation[env.operation]) {
    return operation[env.operation](env);
  }
  throw new Error('GitHub Action does not operation: ' + env.operation);
};

module.exports = operationSwitch;
