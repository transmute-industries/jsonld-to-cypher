/* eslint-disable guard-for-in */
/* eslint-disable max-len */

const moment = require('moment');

const {predicateToPropertyName} = require('./utils');
const preferences = require('./preferences');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const isDidUrl = (iri) => {
  return (
    iri.startsWith('did:') &&
    (iri.includes('#') || iri.includes('/') || iri.includes('?'))
  );
};

const isDid = (iri) => {
  return iri.startsWith('did:') && !isDidUrl(iri);
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
  if (isDidUrl(node.id)) {
    return 'DecentralizedIdentifierResource';
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

const linkToEdgeLabel = (link) => {
  if (link.label.includes(preferences.defaultPredicate)) {
    return 'Predicate';
  }
  if (link.label.includes(preferences.defaultRelationship)) {
    return 'Relationship';
  }
  return `\`${link.predicate}\``;
};

const jsonGraphToCypher = async (graph) => {
  const sourceTimestamp = new Date().toISOString();
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
    query += `MERGE ( ${nodeName} : ${nodeLabel} { id: "${node.id}" ${typedProperties}, sourceTimestamp: "${sourceTimestamp}" } )\n`;
    nodesMerged.push(nodeName);
  }
  for (const linkIndex in graph.links) {
    const link = graph.links[linkIndex];
    const edgeName = `e${linkIndex}`;
    const sourceName = nodeIdToNodeName[link.source];
    const targetName = nodeIdToNodeName[link.target];
    const linkLabel = linkToEdgeLabel(link);
    query += `MERGE (${sourceName})-[${edgeName}: ${linkLabel} { name: "${link.label}", id: "${graph.id}", predicate: "${link.label}", sourceTimestamp: "${sourceTimestamp}" } ]->(${targetName})\n`;
  }
  query += `RETURN ${nodesMerged}\n`;
  return query;
};

module.exports = jsonGraphToCypher;
