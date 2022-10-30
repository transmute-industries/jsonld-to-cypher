/* eslint-disable guard-for-in */
/* eslint-disable max-len */

const moment = require('moment');

const isDid = (iri) => {
  return iri.startsWith('did:');
};

const isUrn = (iri) => {
  return iri.startsWith('urn:');
};

const isUrl = (iri) => {
  return iri.startsWith('http');
};

const nodeToNodeLabel = (node) => {
  if (isDid(node.id)) {
    return 'DecentralizedIdentifier';
  }
  if (isUrn(node.id)) {
    return 'UniformResourceName';
  }
  if (isUrl(node.id)) {
    return 'UniformResourceLocator';
  }
  return 'InternationalizedResourceIdentifier';
};

const getTypedValue = (v) => {
  let niceValue = typeof v === 'string' ? `"${v}"` : v;
  if (moment(v, moment.ISO_8601).isValid()) {
    niceValue = `datetime("${v}")`;
  }
  return niceValue;
};

const graphToCypher = async (graph) => {
  let query = ``;
  const nodesMerged = [];
  const nodeIdToNodeName = {};
  for (const nodeIndex in graph.nodes) {
    const node = graph.nodes[nodeIndex];
    const nodeName = `n${nodeIndex}`;
    nodeIdToNodeName[node.id] = nodeName;
    let typedProperties = '';
    if (Object.keys(node).length > 1) {
      const {id, ...props} = node;
      const propKeys = Object.keys(props);
      const rps = [];
      for (const ki in propKeys) {
        const k = propKeys[ki];
        const v = props[k];
        const niceName = k;
        const niceValue = getTypedValue(v);
        rps.push(`${niceName}: ${niceValue}`);
      }
      const isLocation =
        propKeys.includes('latitude') && propKeys.includes('longitude');
      if (isLocation) {
        rps.push(
            `point: point({latitude:toFloat(${props.latitude}), longitude:toFloat(${props.longitude})})`,
        );
      }
      typedProperties = `,  ${rps.join(', ')}`;
    }
    const nodeLabel = nodeToNodeLabel(node);
    query += `MERGE ( ${nodeName} : ${nodeLabel} { id: "${node.id}" ${typedProperties} } )\n`;
    nodesMerged.push(nodeName);
  }
  for (const edgeIndex in graph.links) {
    const edge = graph.links[edgeIndex];
    const edgeName = `e${edgeIndex}`;
    const sourceName = nodeIdToNodeName[edge.source];
    const targetName = nodeIdToNodeName[edge.target];
    // console.log(edge);
    if (targetName) {
      query += `CREATE (${sourceName})-[${edgeName}: Relationship { id : "${graph.id}" } ]->(${targetName})\n`;
    }
  }
  query += `RETURN ${nodesMerged}\n`;
  return query;
};

module.exports = {graphToCypher};
