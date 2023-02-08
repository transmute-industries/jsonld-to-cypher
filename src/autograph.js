/* eslint-disable max-len */
const jsonld = require('jsonld');

const autograph = async (object, {documentLoader, id}) => {
  const nodes = {[id]: {id}};
  const links = [];
  const graph = {id, nodes, links};

  const canonized = await jsonld.canonize(object, {
    algorithm: 'URDNA2015',
    format: 'application/n-quads',
    documentLoader,
  });
  const rows = canonized
      .split('\n')
      .filter((r) => r !== '')
      .map((r) => {
        return r.substring(0, r.length - 2);
      });

  const isBlankNode = (iri) => {
    return iri.includes('_:c14n');
  };

  const tripleRegex =
    /^(?<subject>(<([^<>]+)>|^_:c14n\d+)) (?<predicate>(<([^<>]+)>)) (?<object>(.+))/;
  const isRdfNode = (str) => {
    return str.startsWith('<') && str.endsWith('>');
  };

  const removeAngleBrackets = (str) => {
    if (isRdfNode(str)) {
      return str.substring(1, str.length - 1);
    }
    return str;
  };

  const rowToIntermediateObject = (id, row) => {
    const match = row.match(tripleRegex);
    let {subject, predicate, object} = match.groups;
    if (object.includes('_:c14n')) {
      const objectParts = object.split('_:c14n');
      const objectValue = objectParts[0].trim();
      object = objectValue;
      if (object === '') {
        object = '_:c14n' + objectParts[1];
      }
    }
    if (isBlankNode(subject)) {
      subject = `<${id}:${subject}>`;
    }
    if (isBlankNode(object)) {
      object = `<${id}:${object}>`;
    }
    return {subject, predicate, object};
  };

  const addSubjectToGraph = ({subject, graph}) => {
    subject = removeAngleBrackets(subject);
    graph.nodes[subject] = {
      ...(graph.nodes[subject] || {id: subject}),
    };
  };

  const removeEscapedQuotes = (str) => {
    if (str.startsWith('"') && str.endsWith('"')) {
      return str.substring(1, str.length - 1);
    }
    return str;
  };

  const getPrimitiveTypeFromObject = (str) => {
    const [primitive] = str.split('^^');
    try {
      if (str.includes('http://www.w3.org/2001/XMLSchema#integer')) {
        return parseInt(removeEscapedQuotes(primitive));
      }
      if (str.includes('http://www.w3.org/2001/XMLSchema#double')) {
        return parseFloat(removeEscapedQuotes(primitive));
      }
      if (str.includes('http://www.w3.org/2001/XMLSchema#boolean')) {
        return removeEscapedQuotes(primitive) === 'true';
      }

      if (str.includes('http://www.w3.org/2001/XMLSchema#dateTime')) {
        return removeEscapedQuotes(primitive);
      }

      return `${str.replace(/'/g, '\\\'')}`;
    } catch (e) {
      return `${str.replace(/'/g, '\\\'')}`;
    }
  };

  const addObjectToGraph = ({object, graph}) => {
    object = removeAngleBrackets(object);
    graph.nodes[object] = {
      ...(graph.nodes[object] || {id: object}),
    };
  };

  const predicateToPropertyName = (predicate) => {
    return predicate.split('/').pop().split('#').pop().replace('>', '');
  };

  const addObjectAsPropertiesOfSubject = ({
    subject,
    predicate,
    object,
    graph,
  }) => {
    subject = removeAngleBrackets(subject);
    graph.nodes[subject] = {
      ...graph.nodes[subject],
      [removeAngleBrackets(predicate)]:
        getPrimitiveTypeFromObject(removeEscapedQuotes(object)),
    };
  };

  const maybeAddPredicateAsLink = ({subject, predicate, graph}) => {
    const subjectIri = removeAngleBrackets(subject);
    if (isBlankNode(subjectIri)) {
      const predicateIri = removeAngleBrackets(predicate);
      graph.links.push({
        source: subjectIri.split(':_:')[0],
        label: predicateIri.split('/').pop().split('#').pop(),
        predicate: predicateIri,
        target: subjectIri,
      });
    }
  };
  for (const row of rows) {
    const {subject, predicate, object} = rowToIntermediateObject(
        graph.id,
        row,
    );
    addSubjectToGraph({subject, graph});
    if (isRdfNode(object)) {
      addObjectToGraph({object, graph});
      const predicateIri = removeAngleBrackets(predicate);
      graph.links.push({
        source: removeAngleBrackets(subject),
        label: predicateIri.split('/').pop().split('#').pop(),
        predicate: predicateIri,
        target: removeAngleBrackets(object),
      });
    } else {
      addObjectAsPropertiesOfSubject({subject, predicate, object, graph});
      maybeAddPredicateAsLink({subject, predicate, graph});
    }
  }
  graph.nodes = Object.values(graph.nodes);
  return graph;
};

module.exports = autograph;
