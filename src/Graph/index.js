/* eslint-disable guard-for-in */
/* eslint-disable max-len */

const documentToGraph = require('./documentToGraph');
const graphToCypher = require('./graphToCypher');

const Graph = {documentToGraph, graphToCypher};

module.exports = Graph;
