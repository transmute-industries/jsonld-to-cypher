/* eslint-disable guard-for-in */
/* eslint-disable max-len */

const getPrimitiveTypeFromObject = (str) => {
  if (str.includes('<http://www.w3.org/2001/XMLSchema#integer>')) {
    const v = str.split('^^')[0];
    return parseInt(v.replace(/"/g, ''), 10);
  }
  return str.replace(/'/g, '\\\'');
};

const graphToCypher = async (graph) => {
  const args = {};
  let query = `CREATE ( g:NamedGraph { uri: "${graph.id}" } )\n`;
  const nodesMerged = [];
  const nodeIdToNodeName = {};
  for (const nodeIndex in graph.nodes) {
    const node = graph.nodes[nodeIndex];
    const nodeName = `n${nodeIndex}`;
    const nodeRelationInGraph = `r${nodeIndex}`;

    nodeIdToNodeName[node.id] = nodeName;

    if (Object.keys(node).length > 2) {
      const {id, value, ...props} = node;
      const propKeys = Object.keys(props);
      const rdf_keys = [];
      const rdf_values = [];
      const rps = [];
      for (const ki in propKeys) {
        const k = propKeys[ki];
        const v = props[k];
        const niceName = k.split('/').pop().split('#').pop().replace('>', '');
        rdf_keys.push(`'${k}'`);
        rdf_values.push(`'${v.replace(/'/g, '\\\'')}'`);
        rps.push(`${niceName}: ${getPrimitiveTypeFromObject(v)}`);
      }
      const typedProperties = rps.join(', ');
      query += `MERGE ( ${nodeName} :Resource { uri: "${node.id}", ${typedProperties}, rdf_keys: [${rdf_keys}], rdf_values: [${rdf_values}] } )\n`;
    } else {
      query += `MERGE ( ${nodeName} :Resource { uri: "${node.id}" } )\n`;
    }
    query += `CREATE (g)-[${nodeRelationInGraph}: FROM_NAMED_GRAPH ]->(${nodeName})\n`;
    nodesMerged.push(nodeName);
  }

  for (const edgeIndex in graph.links) {
    const edge = graph.links[edgeIndex];
    const edgeName = `e${edgeIndex}`;
    const sourceName = nodeIdToNodeName[edge.source];
    const targetName = nodeIdToNodeName[edge.target];
    query += `CREATE (${sourceName})-[${edgeName}: FROM_NAMED_GRAPH_EDGE ]->(${targetName})\n`;
  }

  query += `RETURN ${nodesMerged}\n`;
  return {query, args};
};

module.exports = graphToCypher;
