const lib = require('../');
const fixtures = require('../__fixtures__');
const jose = require('jose');

it('can sign & verify', async () => {
  const {alg, claimSet} = fixtures;
  const {publicKey, privateKey} = await jose.generateKeyPair(alg);
  const jws = await new jose.CompactSign(
      new TextEncoder().encode(JSON.stringify(claimSet)),
  )
      .setProtectedHeader({alg})
      .sign(privateKey);

  const {payload, protectedHeader} = await jose.compactVerify(jws, publicKey);
  expect(protectedHeader.alg).toBe(alg);
  const protectedClaimSet = JSON.parse(new TextDecoder().decode(payload));
  expect(protectedClaimSet.boolean).toBe(true);
});

it('can inject context', async () => {
  const intermediate = await lib.transformers.jws.toIntermediateObject(
      fixtures.jws,
      fixtures.publicKeyJwk,
  );
  expect(intermediate['@context']).toBeDefined();
});
