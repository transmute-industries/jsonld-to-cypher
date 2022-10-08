/* eslint-disable max-len */
const fs = require('fs');
const path = require('path');
const {Graph, documentLoader} = require('./index');

const readFile = (filePath) => {
  const absPath = path.resolve(process.cwd(), filePath);
  try {
    const file = fs.readFileSync(absPath).toString();
    return file;
  } catch (e) {
    console.error(e);
    console.error('Cannot read from file: ' + absPath);
    process.exit(1);
  }
}

;(async () => {
  console.log('🌴 testing library...');
  const intermediate = await Graph.documentToGraph(
      require('../docs/example-vc-ld-proof.json'),
      {documentLoader},
  );
  fs.writeFileSync(
      './docs/intermediate.json',
      JSON.stringify(intermediate, null, 2),
  );
  const cypher = await Graph.graphToCypher(intermediate);
  const markdown =
    '# Clear Database\n```cypher\nMATCH (n) DETACH DELETE n\n```\n# Generated Cypher\n```cypher\n' +
    cypher +
    '```';
  fs.writeFileSync('./docs/vc-ld-cypher-query.md', markdown);
})();

// ;(async () => {
//   console.log('🌴 testing library...');
//   const intermediate = await Graph.documentToGraph(
//       require('../docs/simple-vc.json'),
//       {documentLoader},
//   );
//   fs.writeFileSync(
//       './docs/intermediate.json',
//       JSON.stringify(intermediate, null, 2),
//   );
//   const cypher = await Graph.graphToCypher(intermediate);
//   console.log(cypher);
//   const markdown =
//     '# Clear Database\n```cypher\nMATCH (n) DETACH DELETE n\n```\n# Generated Cypher\n```cypher\n' +
//     cypher +
//     '```';
//   fs.writeFileSync('./docs/cypher-simple-vc-query.md', markdown);
// })();

// ;(async () => {
//   console.log('🌴 testing library...');
//   const intermediate = await Graph.documentToGraph(
//       require('../docs/advanced-types.json'),
//       {documentLoader},
//   );
//   fs.writeFileSync(
//       './docs/intermediate.json',
//       JSON.stringify(intermediate, null, 2),
//   );
//   const cypher = await Graph.graphToCypher(intermediate);
//   const markdown =
//     '# Clear Database\n```cypher\nMATCH (n) DETACH DELETE n\n```\n# Generated Cypher\n```cypher\n' +
//     cypher +
//     '```';
//   fs.writeFileSync('./docs/cypher-query.md', markdown);
// })();

// ;(async () => {
//   console.log('🌴 testing library...');
//   const intermediate = await Graph.jwsToGraph(readFile('./docs/vc.jwt'), {
//     documentLoader,
//   });
//   fs.writeFileSync(
//       './docs/intermediate.json',
//       JSON.stringify(intermediate, null, 2),
//   );
//   const cypher = await Graph.graphToCypher(intermediate);
//   const markdown =
//     '# Clear Database\n```cypher\nMATCH (n) DETACH DELETE n\n```\n# Generated Cypher\n```cypher\n' +
//     cypher +
//     '```';
//   fs.writeFileSync('./docs/cypher-from-jwt-query.md', markdown);
// })();
