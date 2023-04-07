const autograph = require('./autograph');
const documentLoader = require('../documentLoader');
const fs = require('fs');
const path = require('path');

it('sanity', async () => {
  const object = {
    '@context': {
      '@vocab': 'https://industry.example/vocab#',
      'id': '@id',
      'type': '@type',
    },
    'property': 123,
    'list': [{id: 'did:example:123', bar: 'baz'}, {foo: true}],
  };
  const dataset = await autograph(object, {
    id: 'urn:uuid:123',
    documentLoader,
  });
  // fs.writeFileSync(
  //     path.resolve(__dirname, './__fixtures__/sanity.json'),
  //     JSON.stringify(dataset, null, 2),
  // );
  const expected1 = fs
      .readFileSync(path.resolve(__dirname, './__fixtures__/sanity.json'))
      .toString();
  expect(dataset).toEqual(JSON.parse(expected1));
});
