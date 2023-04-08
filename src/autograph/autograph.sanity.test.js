const autograph = require('./autograph');
const documentLoader = require('../documentLoader');
const fs = require('fs');
const path = require('path');

it('sanity', async () => {
  const doc = {
    '@context': {
      '@vocab': 'https://industry.example/vocab#',
      'id': '@id',
      'type': '@type',
    },
    'property': 123,
    'list': [{id: 'did:example:123', bar: 'baz'}, {foo: true}],
  };
  const graph = await autograph(doc, {
    id: 'urn:uuid:123',
    documentLoader,
  });
  // fs.writeFileSync(
  //     path.resolve(__dirname, './__fixtures__/sanity.json'),
  //     JSON.stringify(graph, null, 2),
  // );
  const expected1 = fs
      .readFileSync(path.resolve(__dirname, './__fixtures__/sanity.json'))
      .toString();
  expect(graph).toEqual(JSON.parse(expected1));
});

// required because of esm
afterAll(async () => {});
