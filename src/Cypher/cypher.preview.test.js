/* eslint-disable max-len */

const fs = require('fs');
const path = require('path');
const {Cypher} = require('..');
const documentLoader = require('../documentLoader');

it('v1 credential', async () => {
  const query = await Cypher.fromDocument(
      require('./__fixtures__/vc.v1.minimal.json'),
      {
        id: 'urn:uuid:123',
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
