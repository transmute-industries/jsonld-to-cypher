const magic = require('./index')

;(async () => {
  console.log('🌴 testing library...');
  const cypher = await magic.convert(require('../docs/example.json'));
  console.log(cypher);
})();
