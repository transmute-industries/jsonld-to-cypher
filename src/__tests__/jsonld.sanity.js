const jsonld = require('jsonld');

it('canonize', async () => {
  const document = {
    '@context': {
      '@vocab': 'https://vocabulary.transmute.industries/ns/dynamic/#',
    },
    'example': 123,
  };
  const canonized = await jsonld.canonize(document, {
    algorithm: 'URDNA2015',
    format: 'application/n-quads',
  });
  expect(canonized).toBeDefined();
});
