const fs = require('fs');
const {toGraphViz} = require('../transformers/graphviz');

const preview = (intermediate) => {
  // console.log(JSON.stringify(intermediate, null, 2));
  const dot = toGraphViz(intermediate);
  fs.writeFileSync('./preview.dot', dot);
  fs.writeFileSync('./preview.json', JSON.stringify(intermediate, null, 2));
};

module.exports = preview;
