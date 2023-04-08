/* eslint-disable max-len */

const fs = require('fs');
const path = require('path');
const {Cypher} = require('..');
const documentLoader = require('../documentLoader');

it('v1 credential', async () => {
  const query = await Cypher.fromDocument(
      require('./__fixtures__/vc.v1.minimal.json'),
      {
        id: 'urn:uuid:123', // these MUST be unique.
        documentLoader,
      },
  );
  fs.writeFileSync(
      path.resolve(__dirname, './__fixtures__/vc.v1.minimal.cypher'),
      query,
  );
});

it('v1 verifiable credential', async () => {
  const query = await Cypher.fromDocument(
      require('./__fixtures__/vc.v1.proof.json'),
      {
        id: 'urn:uuid:456', // these MUST be unique.
        documentLoader,
      },
  );
  fs.writeFileSync(
      path.resolve(__dirname, './__fixtures__/vc.v1.proof.cypher'),
      query,
  );
});

it('v1 verifiable presentation', async () => {
  const query = await Cypher.fromDocument(
      require('./__fixtures__/vp.v1.minimal.json'),
      {
        id: 'urn:uuid:789', // these MUST be unique.
        documentLoader,
      },
  );
  fs.writeFileSync(
      path.resolve(__dirname, './__fixtures__/vp.v1.minimal.cypher'),
      query,
  );
});

it('v1 verifiable presentation with proof', async () => {
  const query = await Cypher.fromDocument(
      require('./__fixtures__/vp.v1.proof.json'),
      {
        id: 'urn:uuid:0000', // these MUST be unique.
        documentLoader,
      },
  );
  fs.writeFileSync(
      path.resolve(__dirname, './__fixtures__/vp.v1.proof.cypher'),
      query,
  );
});
