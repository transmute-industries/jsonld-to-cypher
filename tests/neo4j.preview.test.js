const {getDriver, dropTables, runExample} = require('../src/test-utils');

describe('neo4j.preview', () => {
  let driver;
  beforeAll(async () => {
    driver = getDriver();
  });

  it('drop tables', async () => {
    await dropTables();
  });

  it('minimal verifiable credential', async () => {
    await runExample(driver, 'minimal-vc');
  });

  it('verifiable credential with proof', async () => {
    await runExample(driver, 'proof-vc');
  });

  it('minimal verifiable presentation', async () => {
    await runExample(driver, 'minimal-vp');
  });

  it('verifiable presentation with proof', async () => {
    await runExample(driver, 'proof-vp');
  });

  afterAll(async () => {
    await driver.close();
  });
});
