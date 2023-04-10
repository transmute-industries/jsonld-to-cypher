const {getDriver, dropTables} = require('../src/test-utils');

let driver;

describe.skip('sanity', () => {
  beforeAll(async () => {
    await dropTables();
    driver = getDriver();
    const session = driver.session();
    const {records} = await session.run(`
    MATCH (n)
    RETURN n
    `);
    expect(records.length).toBe(0);
    await session.close();
  });

  it('create', async () => {
    const session = driver.session();
    const {records} = await session.run(`
    MERGE ( notary: Controller { name: 'Tiro' } )
    RETURN notary
    `);
    expect(records.length).toBe(1);
    await session.close();
  });

  it('read', async () => {
    const session = driver.session();
    const {records} = await session.run(`
    MATCH ( notary: Controller { name: 'Tiro' } )
    RETURN notary
    `);
    expect(records.length).toBe(1);
    expect(records[0]._fields[0].properties.name).toBe('Tiro');
    await session.close();
  });

  it('update', async () => {
    const session = driver.session();
    const {records} = await session.run(`
    MERGE (notary: Controller { name: 'Tiro' })
    ON MATCH
      SET notary.name = 'scribae'
    RETURN notary.name
    `);
    expect(records.length).toBe(1);
    expect(records[0]._fields[0]).toBe('scribae');
    await session.close();
  });

  it('delete', async () => {
    const session = driver.session();
    const {records} = await session.run(`
    MATCH ( notary: Controller { name: 'scribae' } )
    DELETE notary
    `);
    await session.close();
  });

  afterAll(async () => {
    const session = driver.session();
    const {records} = await session.run(`
    MATCH (n)
    RETURN n
    `);
    expect(records.length).toBe(0);
    await session.close();
    await driver.close();
  });
});
