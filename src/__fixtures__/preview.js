const fs = require('fs');
const jsonGraphToDot = require('../jsonGraphToDot');
const jsonGraphToCypher = require('../jsonGraphToCypher');

const preview = async (intermediate, name = 'preview') => {
  // console.log(JSON.stringify(intermediate, null, 2));
  const dot = jsonGraphToDot(intermediate);
  const cypher = await jsonGraphToCypher(intermediate);
  fs.writeFileSync(`./examples/${name}.dot`, dot);
  fs.writeFileSync(
      `./examples/${name}.json`,
      JSON.stringify(intermediate, null, 2),
  );

  fs.writeFileSync(`./examples/${name}.cypher`, cypher);
};

module.exports = preview;
