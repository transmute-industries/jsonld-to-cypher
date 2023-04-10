const getDriver = require('./getDriver');

const dropTables = async () => {
  const driver = getDriver();
  const session = driver.session();
  await session.run(`
  MATCH (n)
  DETACH DELETE n
  `);
  await session.close();
  await driver.close();
};

module.exports = dropTables;
