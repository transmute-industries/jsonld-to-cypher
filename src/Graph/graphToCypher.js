/* eslint-disable guard-for-in */
/* eslint-disable max-len */

const {predicateToPropertyName, uriToLabel} = require('./utils');

const graphToCypher = async (graph) => {
  const args = {};

  let query = `CREATE ( g:Graph { uri: "${graph.id}" } )\n`;
  const nodesMerged = [];
  const nodeIdToNodeName = {};

  // console.log(graph);
  for (const nodeIndex in graph.nodes) {
    const node = graph.nodes[nodeIndex];
    const nodeName = `n${nodeIndex}`;
    nodeIdToNodeName[node.id] = nodeName;
    if (Object.keys(node).length > 1) {
      const {id, ...props} = node;

      const propKeys = Object.keys(props);

      const rps = [];
      for (const ki in propKeys) {
        const k = propKeys[ki];
        const v = props[k];
        const niceName = predicateToPropertyName(k);
        const niceValue = typeof v === 'string' ? `"${v}"` : v;

        rps.push(`${niceName}: ${niceValue}`);
      }
      const typedProperties = rps.join(', ');
      query += `MERGE ( ${nodeName} :Resource { uri: "${node.id}", ${typedProperties} } )\n`;
    } else {
      const nodeType = uriToLabel(node.id);

      query += `MERGE ( ${nodeName} :${nodeType} { uri: "${node.id}" } )\n`;
    }
    nodesMerged.push(nodeName);
  }
  for (const edgeIndex in graph.links) {
    const edge = graph.links[edgeIndex];
    const edgeName = `e${edgeIndex}`;
    const sourceName = nodeIdToNodeName[edge.source];
    const targetName = nodeIdToNodeName[edge.target];
    if (targetName) {
      query += `CREATE (${sourceName})-[${edgeName}: ${edge.label.toUpperCase()} ]->(${targetName})\n`;
    }
  }
  query += `CREATE (g)-[nge: CONTAINS ]->(${nodeIdToNodeName[graph.id]})\n`;
  query += `RETURN g,${nodesMerged}\n`;
  return {query, args};
};

module.exports = graphToCypher;
