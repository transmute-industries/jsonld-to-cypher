const fs = require('fs');
const {toGraphViz} = require('../transformers/graphviz');

const preview = (intermediate, name = 'preview') => {
  // console.log(JSON.stringify(intermediate, null, 2));
  const dot = toGraphViz(intermediate);
  fs.writeFileSync(`./examples/${name}.dot`, dot);
  fs.writeFileSync(
      `./examples/${name}.json`,
      JSON.stringify(intermediate, null, 2),
  );
};

module.exports = preview;
