/* eslint-disable guard-for-in */
/* eslint-disable max-len */

const {predicateToPropertyName, uriToLabel} = require('./utils');

const moment = require('moment');
const lodash = require('lodash');

const graphToCypher = async (graph) => {
  let query = `CREATE ( g:Graph { uri: "${graph.id}" } )\n`;
  const nodesMerged = [];
  const nodeIdToNodeName = {};
  for (const nodeIndex in graph.nodes) {
    const node = graph.nodes[nodeIndex];
    const nodeName = `n${nodeIndex}`;
    nodeIdToNodeName[node.id] = nodeName;
    if (Object.keys(node).length > 1) {
      const {id, ...props} = node;
      const propKeys = Object.keys(props);
      const rps = [];
      const isLocation =
        propKeys.includes('latitude') && propKeys.includes('longitude');
      for (const ki in propKeys) {
        const k = propKeys[ki];
        const v = props[k];
        const niceName = predicateToPropertyName(k);
        let niceValue = typeof v === 'string' ? `"${v}"` : v;
        if (moment(v, moment.ISO_8601).isValid()) {
          niceValue = `datetime("${v}")`;
        }
        rps.push(`${niceName}: ${niceValue}`);
      }

      if (isLocation) {
        rps.push(
            `point: point({latitude:toFloat(${props.latitude}), longitude:toFloat(${props.longitude})})`,
        );
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
      query += `CREATE (${sourceName})-[${edgeName}: ${lodash
          .startCase(edge.label)
          .replace(/\s+/g, '_')
          .toUpperCase()} ]->(${targetName})\n`;
    }
  }
  query += `CREATE (g)-[nge: CONTAINS ]->(${nodeIdToNodeName[graph.id]})\n`;
  query += `RETURN g,${nodesMerged}\n`;
  return query;
};

module.exports = graphToCypher;
