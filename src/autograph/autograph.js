/* eslint-disable max-len */
const jsonld = require('jsonld');
const _ = require('lodash');
// const {rectify, derectify} = require('./rectifier');

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

const getLabelFromIri = (iri) => {
  return _.startCase(iri.split('/').pop().split('#').pop());
};

const getNodeLabel = (node) => {
  if (node.label) {
    return node.label;
  }
  if (isDid(node.id)) {
    return 'DID';
  }
  if (isDidUrl(node.id)) {
    return 'DID URL';
  }
  if (isUrn(node.id)) {
    return 'URN';
  }
  if (isUrl(node.id)) {
    return 'URL';
  }
  return 'Resource';
};

const setNodeLabelFromEdges = (graph) => {
  // add a label to RDF types for easier querying
  // we could add more specific types here...
  // but that is a mistake.
  // That kind of thing belongs at a different layer
  // like after importing data...
  graph.links.forEach((link) => {
    if (link.label === 'Type') {
      graph.nodes[link.target].label = 'Type';
    }
  });
};

const addObjectToGraph = ({object, graph}) => {
  object = removeAngleBrackets(object);
  graph.nodes[object] = {
    ...(graph.nodes[object] || {id: object}),
  };
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
    [removeAngleBrackets(predicate)]: getPrimitiveTypeFromObject(
        removeEscapedQuotes(object),
    ),
  };
};

const maybeAddPredicateAsLink = ({subject, predicate, graph}) => {
  const subjectIri = removeAngleBrackets(subject);
  if (isBlankNode(subjectIri)) {
    const predicateIri = removeAngleBrackets(predicate);
    graph.links.push({
      definition: predicateIri,
      source: subjectIri,
      label: getLabelFromIri(predicateIri),
      target: subjectIri,
    });
  }
};

const nodeSort = (a, b) => {
  return a.id >= b.id ? 1 : -1;
};

const linkSort = (a, b) => {
  return a.source >= b.source ? 1 : -1;
};

const hasEdge = (source, target, graph) => {
  return (
    graph.links.find((link) => {
      return link.source === source && link.target === target;
    }) !== undefined
  );
};

const hasInbound = (target, graph) => {
  return (
    graph.links.find((link) => {
      return link.target === target;
    }) !== undefined
  );
};

const getRows = (canonized) => {
  const blankNodes = [];
  const rows = canonized
      .split('\n')
      .filter((r) => r !== '')
      .map((r) => {
        return r.substring(0, r.length - 2);
      })
      .map((r) => {
        const match = r.match(tripleRegex);
        const {object} = match.groups;
        if (object.includes('_:c14n')) {
          const objectParts = object.split('_:c14n');
          const objectValue = objectParts[0].trim();
          let objectSubject = objectValue;
          if (objectValue === '') {
            objectSubject = '_:c14n' + objectParts[1];
          }
          if (objectSubject !== objectValue) {
            blankNodes.push(objectSubject);
          }
        }
        return r;
      })
      .map((r) => {
        const match = r.match(tripleRegex);
        const {subject, predicate, object} = match.groups;

        if (object.includes('_:c14n')) {
          const objectParts = object.split('_:c14n');
          const objectValue = objectParts[1].trim();
          const objectSubject = '_:c14n' + objectValue;
          console.log(subject, predicate, objectSubject);
          // const objectParts = object.split('_:c14n');
          // const objectValue = objectParts[0].trim();
          // let objectSubject = objectValue;
          // if (objectValue === '') {
          //   objectSubject = '_:c14n' + objectParts[1];
          // }
          // if (objectSubject !== objectValue) {
          //   const proposed = `${objectSubject} ${predicate} ${objectSubject}`;
          //   console.log('fix me', proposed);

        //   specialRows.push(proposed);
        // }
        }
        return r;
      });

  // console.log(rows);
  // console.log(specialRows);
  return [
    ...rows,
    // edges from objects.
    // ...specialRows,
  ];
};

const autograph = async (doc, {documentLoader, id}) => {
  const nodes = {[id]: {id}};
  const links = [];
  const graph = {id, nodes, links};
  const canonized = await jsonld.canonize(doc, {
    algorithm: 'URDNA2015',
    format: 'application/n-quads',
    documentLoader,
    safe: false, // lossy behavior but doesn't fail
  });
  const rows = getRows(canonized);
  console.log(rows);
  return;
  for (const row of rows) {
    const {subject, predicate, object} = rowToIntermediateObject(id, row);
    addSubjectToGraph({subject, graph});
    if (isRdfNode(object)) {
      // console.log('first case', {subject, predicate, object});
      addObjectToGraph({object, graph});
      const predicateIri = removeAngleBrackets(predicate);
      graph.links.push({
        definition: predicateIri,
        source: removeAngleBrackets(subject),
        label: getLabelFromIri(predicateIri),
        target: removeAngleBrackets(object),
      });
    } else {
      // console.log('second case', {subject, predicate, object});
    }
    //   if (isRdfNode(object)) {
    //     addObjectToGraph({object, graph});
    //     const predicateIri = removeAngleBrackets(predicate);
    //     graph.links.push({
    //       definition: predicateIri,
    //       source: removeAngleBrackets(subject),
    //       label: getLabelFromIri(predicateIri),
    //       target: removeAngleBrackets(object),
    //     });
    //   } else {
    //     addObjectAsPropertiesOfSubject({subject, predicate, object, graph});
    //     maybeAddPredicateAsLink({subject, predicate, graph});
    //     graph.links.push({
    //       definition: predicate,
    //       source: removeAngleBrackets(subject),
    //       label: getLabelFromIri(predicate),
    //       target: removeAngleBrackets(object),
    //     });
    //   }
  }
  // setNodeLabelFromEdges(graph);

  // graph.nodes = graph.nodes.map((n) => {
  //   return {...n, label: getNodeLabel(n)};
  // });

  // const blankNodes = graph.nodes
  //     .filter((n) => n.id.includes('c14n'))
  //     .map((n) => n.id)
  //     .sort(nodeSort);
  // console.log(blankNodes);
  // console.log(JSON.stringify(graph, null, 2));
  // blankNodes.reduce((pv, cv, ci, arr) => {
  //   if (pv) {
  //     graph.links.push({
  //       label: 'Blank Node',
  //       source: id,
  //       definition: 'https://wikipedia.org/wiki/Blank_node',
  //       target: cv.id,
  //     });
  //   }
  // });

  // remove self edges for node properties
  // graph.links.forEach((link, i) => {
  //   const node = graph.nodes.find((n) => {
  //     return n.id === link.target;
  //   });
  //   if (node && link.source === link.target && node[link.definition]) {
  //     graph.links.splice(i, 1);
  //   }
  // });

  // ensure the graph is connected.
  // graph.nodes.forEach((node) => {
  //   if (
  //     id !== node.id &&
  //     !hasEdge(id, node.id, graph) &&
  //     !hasEdge(node.id, id, graph) &&
  //     !hasInbound(node.id, graph)
  //   ) {
  //     graph.links.push({
  //       label: 'Named Graph',
  //       source: id,
  //       definition: 'https://wikipedia.org/wiki/Named_graph',
  //       target: node.id,
  //     });
  //   }
  // });

  graph.nodes = Object.values(graph.nodes);
  // console.log(JSON.stringify(graph, null, 2));
  return {
    id,
    // doc,
    nodes: graph.nodes.sort(nodeSort),
    links: graph.links.sort(linkSort),
  };
};

module.exports = autograph;
