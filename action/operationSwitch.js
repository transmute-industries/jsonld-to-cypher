const mergeOperation = (env) => {
  // TODO;
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
