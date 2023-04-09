/* eslint-disable guard-for-in */
/* eslint-disable max-len */

const moment = require('moment');

const getTypedValue = (v) => {
  let niceValue = typeof v === 'string' ? `"${v}"` : v;
  if (moment(v, moment.ISO_8601).isValid()) {
    niceValue = `datetime("${v}")`;
  }
  return niceValue;
};

const setProperties = (name, entry) => {
  let properties = '';
  // expect at least id and labels, hence 2 below
  if (Object.keys(entry).length > 1) {
    const {id, labels, target, source, ...props} = entry;
    const keys = Object.keys(props);
    const statements = [];
    for (const i in keys) {
      const key = keys[i];
      const value = getTypedValue(props[keys[i]]);
      statements.push(`  SET  ${name}.\`${key}\`=${value}`);
    }
    properties = statements.join('\n') + '\n';
  }
  return properties;
};

const addNodes = (graph, query) => {
  const nodes = {};
  for (const i in graph.nodes) {
    const node = graph.nodes[i];
    const {id, labels} = node;
    nodes[id] = `n${i}`;
    const label = Array.isArray(labels) ? labels.join('`:`') : labels;
    query += `MERGE (n${i}:\`${label}\`{id:"${id}"}) \n`;
    query += setProperties(`n${i}`, node);
  }
  return {nodes, query};
};

const addEdges = (graph, nodes, query) => {
  for (const i in graph.links) {
    const link = graph.links[i];
    const source = nodes[link.source];
    const target = nodes[link.target];
    const label = link.label;
    query += `MERGE (${source})-[e${i}:\`${label}\`]->(${target})\n`;
    query += setProperties(`e${i}`, link);
  }
  return query;
};

const jsonGraphToCypher = async (graph) => {
  let {nodes, query} = addNodes(graph, ``);
  query = addEdges(graph, nodes, query);
  query += `RETURN ${Object.values(nodes)}\n`;
  return query;
};

module.exports = jsonGraphToCypher;
