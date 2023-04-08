/* eslint-disable max-len */

const fs = require('fs');
const path = require('path');

const {getDriver, dropTables} = require('../test-utils');

let driver;

describe('preview', () => {
  beforeAll(async () => {
    driver = getDriver();
  });
  it.only('drop tables', async () => {
    await dropTables();
  });
  it('v1 c', async () => {
    const query = fs
        .readFileSync(
            path.resolve(__dirname, './__fixtures__/vc.v1.minimal.cypher'),
        )
        .toString();
    const session = driver.session();
    await session.run(query);
    await session.close();
  });
  it('v1 vc', async () => {
    const query = fs
        .readFileSync(
            path.resolve(__dirname, './__fixtures__/vc.v1.proof.cypher'),
        )
        .toString();
    const session = driver.session();
    await session.run(query);
    await session.close();
  });
  it('v1 vp', async () => {
    const query = fs
        .readFileSync(
            path.resolve(__dirname, './__fixtures__/vp.v1.minimal.cypher'),
        )
        .toString();
    const session = driver.session();
    await session.run(query);
    await session.close();
  });
  it.only('v1 vp with proof', async () => {
    const query = fs
        .readFileSync(
            path.resolve(__dirname, './__fixtures__/vp.v1.proof.cypher'),
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
