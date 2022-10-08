const magic = require('./index')

;(async () => {
  console.log('🌴 testing library...');
  const cypher = await magic.convert(require('../docs/simpler-types.json'));
  console.log(cypher.query);
})();
