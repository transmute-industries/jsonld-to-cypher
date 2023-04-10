const {getDriver, dropTables, runExample} = require('../test-utils');

let driver;

describe('preview', () => {
  beforeAll(async () => {
    driver = getDriver();
  });
  it('drop tables', async () => {
    await dropTables();
  });
  it('minimal verifiable credential', async () => {
    await runExample(driver, 'minimal-vc');
  });

  // it('v1 vc', async () => {
  //   const query = fs
  //     .readFileSync(
  //       path.resolve(__dirname, './__fixtures__/vc.v1.proof.cypher')
  //     )
  //     .toString()
  //   const session = driver.session()
  //   await session.run(query)
  //   await session.close()
  // })
  // it('v1 vp', async () => {
  //   const query = fs
  //     .readFileSync(
  //       path.resolve(__dirname, './__fixtures__/vp.v1.minimal.cypher')
  //     )
  //     .toString()
  //   const session = driver.session()
  //   await session.run(query)
  //   await session.close()
  // })
  // it.only('v1 vp with proof', async () => {
  //   const query = fs
  //     .readFileSync(
  //       path.resolve(__dirname, './__fixtures__/vp.v1.proof.cypher')
  //     )
  //     .toString()
  //   const session = driver.session()
  //   await session.run(query)
  //   await session.close()
  // })
  afterAll(async () => {
    await driver.close();
  });
});