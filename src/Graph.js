/* eslint-disable guard-for-in */
/* eslint-disable max-len */
const jsonld = require('jsonld');
const uuid = require('uuid');

const documentToGraph = async (doc, {documentLoader}) => {
  const canonized = await jsonld.canonize(doc, {
    algorithm: 'URDNA2015',
    format: 'application/n-quads',
    documentLoader,
  });

  const nodes = {};
  const links = [];

  const rows = canonized
      .split('\n')
      .filter((r) => r !== '')
      .map((r) => {
        return r.substring(0, r.length - 2); // remove the " ." from every line...
      });

  const graphId = `urn:uuid:${uuid.v4()}`;

  for (const row of rows) {
    const match = row.match(
        /^(?<subject>(<([^<>]+)>|^_:c14n\d+)) (?<predicate>(<([^<>]+)>)) (?<object>(.+))/,
    );
    let {subject, predicate, object} = match.groups;
    // console.log({ subject, predicate, object });

    // rewrite all blank node ids to compound IRIs

    if (subject.startsWith('_:c14n')) {
      subject = `<${graphId}:${subject}>`;
    }
    if (object.startsWith('_:c14n')) {
      object = `<${graphId}:${object}>`;
    }

    if (!nodes[subject]) {
      // node does not yet exist, add it
      nodes[subject] = {
        id: subject,
        value: subject,
      };
    } else {
      // node exists already, see its object has properties
      if (!object.startsWith('<')) {
        nodes[subject] = {
          ...nodes[subject],
          [predicate]: object,
        };
      }
    }

    if (predicate.startsWith('<')) {
      if (!nodes[predicate]) {
        nodes[predicate] = {
          id: predicate,
          value: predicate,
        };
      }
    } else {
      console.error('Never expected a predicate like this', predicate);
    }

    links.push({
      source: subject,
      target: predicate,
    });

    if (object.startsWith('<') || object.startsWith('_:c14n')) {
      // object is another node (which contains properties)
      if (!nodes[object]) {
        nodes[object] = {
          id: object,
          value: object,
        };
      }

      links.push({
        source: predicate,
        target: object,
      });
    } else {
      // object is properties... of a subject.
    }
  }
  return {id: graphId, nodes: Object.values(nodes), links};
};

const jwsToGraph = async (jws, {documentLoader}) => {
  const credential = JSON.parse(
      Buffer.from(jws.split('.')[1], 'base64').toString(),
  );
  return documentToGraph(credential, {documentLoader});
};

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

const Graph = {documentToGraph, jwsToGraph, graphToCypher};

module.exports = Graph;
