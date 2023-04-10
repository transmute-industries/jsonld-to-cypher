const {getDriver, dropTables, runExample} = require('../src/test-utils');

describe.skip('neo4j.preview', () => {
  let driver;
  beforeAll(async () => {
    driver = getDriver();
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

  it('minimal json web signature', async () => {
    await runExample(driver, 'minimal-jws');
  });

  it('v1 vc-jwt', async () => {
    await runExample(driver, 'v1-vc-jwt');
  });

  afterAll(async () => {
    await driver.close();
  });
});
