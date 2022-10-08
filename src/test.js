const fs = require('fs');
const magic = require('./index')

;(async () => {
  console.log('🌴 testing library...');
  const cypher = await magic.convert(require('../docs/simpler-types.json'));
  const markdown = '# Generated Cypher\n```cypher\n' + cypher.query + '```';
  fs.writeFileSync('./docs/cypher-query.md', markdown);
})();
