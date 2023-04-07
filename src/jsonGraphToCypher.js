/* eslint-disable guard-for-in */
/* eslint-disable max-len */

const moment = require('moment');
const preferences = require('./preferences');
const {isBlankNode} = require('./utils');

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

const nodeToNodeLabel = (node, links) => {
  if (links[0] !== undefined && links[0].target) {
    let label = links[0].target.split('/').pop().split('#').pop();

    if (links[1] !== undefined && links[1].target) {
      const secondPossibleLabel = links[1].target.split('/').pop().split('#').pop();
      if (secondPossibleLabel === 'VerifiableCredential') {
        label += '`:`' + secondPossibleLabel;
      }
    }
    return `${label}`;
  }
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
    const splitChar = node.id.indexOf('#') >= 0 ? '#' : '/';
    const label = node.id.split(splitChar).pop();
    if (label) {
      return `${label}`;
    }
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

const findNodeLink = (node, links) => {
  return links.filter((link) => link.source === node.id);
};

const jsonGraphToCypher = async (graph, sourceGraphId) => {
  const hasSource = sourceGraphId !== false;
  let sourceGraphInfo = ``;
  let query = ``;
  const nodesMerged = [];
  const nodeIdToNodeName = {};
  for (const nodeIndex in graph.nodes) {
    const node = graph.nodes[nodeIndex];
    const nodeName = `n${nodeIndex}`;
    if (hasSource) {
      sourceGraphInfo = `, sourceGraphId: "${sourceGraphId}" `;
    }
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
        rps.push(`${nodeName}.\`${niceName}\` = ${niceValue}`);
      }
      const isLocation =
        propKeys.includes('latitude') && propKeys.includes('longitude');
      if (isLocation) {
        rps.push(`${nodeName}.point = point({latitude:toFloat(${props.latitude}), longitude:toFloat(${props.longitude})})`);
      }
      typedProperties = `,  ${rps.join(', ')}`.trim();
    }

    const nodeLinks = findNodeLink(node, graph.links);
    const nodeLabel = nodeToNodeLabel(node, nodeLinks);
    const typeNode = nodeLinks.length === 0;

    // check if the node or nodelabel have blank node identifiers in them
    const blanKNodeID = isBlankNode(node.id);
    const blanKNodeLabel = isBlankNode(nodeLabel);

    // if either nodeid or the nodelable have blank node identifiers then this is a blank node
    const blankNode = blanKNodeID || blanKNodeLabel;

    // old code left commented in place that made the merge statments have a blank string for their nodeid
    // this makes the merge statements duplicate property creation accross all nodes of the same type
    // and causes the merge statements to crash for even a single presentation.
    // This needs to be evaluated and resolved differently.
    // const nodeId = blankNode ? '' : `{ id: "${node.id}" }`;
    const nodeId = `{ id: "${node.id}" }`;

    if (typeNode) {
      query += `MERGE ( ${nodeName} : \`Type\` ${nodeId}) SET ${nodeName}.type = "${node.id.split('/').pop().split('#').pop()}", ${typedProperties && `${typedProperties.substring(2)},`} ${nodeName}.sourceTimestamp = datetime() ${sourceGraphInfo.replace(', ', `, ${nodeName}.`).replace(':', ` =`)}\n`;
    } else {
      query += `MERGE ( ${nodeName} : \`${nodeLabel.toString()}\` ${nodeId}) SET ${typedProperties && `${typedProperties.substring(2)},`} ${nodeName}.sourceTimestamp = datetime() ${sourceGraphInfo.replace(', ', `, ${nodeName}.`).replace(':', ` =`)}\n`;
    }
    nodesMerged.push(nodeName);
  }
  for (const linkIndex in graph.links) {
    const link = graph.links[linkIndex];
    const edgeName = `e${linkIndex}`;
    const sourceName = nodeIdToNodeName[link.source];
    const targetName = nodeIdToNodeName[link.target];
    const linkLabel = linkToEdgeLabel(link);
    // We do not want to draw edges linking a node to itself.
    const sourceToBlank = link.source === graph.id && link.target.indexOf('_:c14n') >= 0;
    if (sourceName !== targetName && !sourceToBlank) {
      query += `MERGE (${sourceName})-[${edgeName}: ${linkLabel} { name: "${link.label}", id: "${linkLabel.replace('`', '')}" ${sourceGraphInfo} } ]->(${targetName})\n`;
    }
  }
  query += `RETURN ${nodesMerged}\n`;
  return query;
};


module.exports = jsonGraphToCypher;
