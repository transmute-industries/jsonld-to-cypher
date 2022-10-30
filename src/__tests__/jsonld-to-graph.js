const lib = require('../');
const fixtures = require('../__fixtures__');

it('can inject context', async () => {
  const graph = await lib.transformers.document.toJsonLdGraph(
      fixtures.exampleDocument,
      {documentLoader: fixtures.documentLoader},
  );
  console.log(JSON.stringify(graph, null, 2));
});
