const lib = require('..');
const fixtures = require('../__fixtures__');

it('graphviz', async () => {
  const graph = await lib.transformers.document.toJsonLdGraph(
      fixtures.exampleDocument,
      {documentLoader: fixtures.documentLoader},
  );
  fixtures.preview(graph);
});
