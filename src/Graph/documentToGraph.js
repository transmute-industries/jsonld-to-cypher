/* eslint-disable guard-for-in */
/* eslint-disable max-len */
const jsonld = require('jsonld');
const uuid = require('uuid');
const pointer = require('json-pointer');

const removeAngleBrackets = (str) => {
  if (str.startsWith('<') && str.endsWith('>')) {
    return str.substring(1, str.length - 1);
  }
  return str;
};

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

    subject = removeAngleBrackets(subject);

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
      predicate = removeAngleBrackets(predicate);
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

      object = removeAngleBrackets(object);
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
  const dict = pointer.dict(doc);
  return {id: graphId, dict, nodes: Object.values(nodes), links};
};

module.exports = documentToGraph;
