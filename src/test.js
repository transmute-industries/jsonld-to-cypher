/* eslint-disable max-len */
const fs = require('fs');
const {Graph, documentLoader} = require('./index')

// ;(async () => {
//   console.log('🌴 testing library...');
//   const intermediate = await Graph.documentToGraph(
//       require('../docs/simpler-types.json'),
//       {documentLoader},
//   );
//   fs.writeFileSync(
//       './docs/intermediate.json',
//       JSON.stringify(intermediate, null, 2),
//   );
//   const cypher = await Graph.graphToCypher(intermediate);
//   const markdown =
//     '# Clear Database\n```cypher\nMATCH (n) DETACH DELETE n\n```\n# Generated Cypher\n```cypher\n' +
//     cypher.query +
//     '```';
//   fs.writeFileSync('./docs/cypher-query.md', markdown);
// })()

;(async () => {
  console.log('🌴 testing library...');
  const intermediate = await Graph.documentToGraph(
      require('../docs/advanced-types.json'),
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
  fs.writeFileSync('./docs/cypher-query.md', markdown);
})();
