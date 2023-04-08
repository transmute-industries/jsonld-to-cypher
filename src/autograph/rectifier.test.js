const {rectify, derectify} = require('./rectifier');

it('sanity', async () => {
  const doc = require('../Cypher/__fixtures__/vp.v1.proof.json');
  const doc2 = rectify(doc);
  console.log(JSON.stringify(doc2, null, 2));
  const doc3 = derectify(doc2);
  expect(doc3).toEqual(doc);
});
