const mergeDocument = require('./mergeDocument');
const mergeOperation = async (env) => {
  const parsedDocument = JSON.parse(env.document);
  await mergeDocument(parsedDocument, {
    url: env.neo4j_uri,
    username: env.neo4j_user,
    password: env.neo4j_password,
  });
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
