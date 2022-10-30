const fs = require('fs');
const {toGraphViz} = require('../transformers/graphviz');
const {graphToCypher} = require('../transformers/cypher');

const preview = async (intermediate, name = 'preview') => {
  // console.log(JSON.stringify(intermediate, null, 2));
  const dot = toGraphViz(intermediate);
  const cypher = await graphToCypher(intermediate);
  fs.writeFileSync(`./examples/${name}.dot`, dot);
  fs.writeFileSync(
      `./examples/${name}.json`,
      JSON.stringify(intermediate, null, 2),
  );

  fs.writeFileSync(`./examples/${name}.cypher`, cypher);
};

module.exports = preview;
