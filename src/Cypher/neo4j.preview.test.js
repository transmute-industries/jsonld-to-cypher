/* eslint-disable max-len */

const fs = require('fs');
const path = require('path');

const {getDriver, dropTables} = require('../test-utils');

let driver;

describe('preview', () => {
  beforeAll(async () => {
    driver = getDriver();
  });
  it('drop tables', async () => {
    await dropTables();
  });
  it('v1 minimal', async () => {
    const query = fs
        .readFileSync(
            path.resolve(__dirname, './__fixtures__/vc.v1.minimal.cypher'),
        )
        .toString();
    const session = driver.session();
    await session.run(query);
    await session.close();
  });
  afterAll(async () => {
    await driver.close();
  });
});
