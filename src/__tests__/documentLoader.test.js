const {documentLoader} = require('..');

it.skip('can load remote contexts', async () => {
  const {document} = await documentLoader(
      'https://www.w3.org/2018/credentials/v1',
  );
  expect(document['@context']['@version']).toBe(1.1);
});
