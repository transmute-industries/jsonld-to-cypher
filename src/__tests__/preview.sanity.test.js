const lib = require('..');
const fixtures = require('../__fixtures__');

it('injectedVocabExample', async () => {
  const graph = await lib.transformers.document.toJsonLdGraph(
      fixtures.injectedVocabExample,
      {documentLoader: fixtures.documentLoader},
  );
  await fixtures.preview(graph, 'injected-jws');
});

it('example verifiable credential', async () => {
  const graph = await lib.transformers.document.toJsonLdGraph(
      fixtures.verifiableCredential,
      {documentLoader: fixtures.documentLoader},
  );
  await fixtures.preview(graph, 'vc');
});
