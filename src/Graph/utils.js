const isRdfNode = (str) => {
  return str.startsWith('<') && str.endsWith('>');
};

const removeAngleBrackets = (str) => {
  if (isRdfNode(str)) {
    return str.substring(1, str.length - 1);
  }
  return str;
};

const removeEscapedQuotes = (str) => {
  if (str.startsWith('"') && str.endsWith('"')) {
    return str.substring(1, str.length - 1);
  }
  return str;
};

const isBlankNode = (iri) => {
  return iri.includes('_:c14n');
};

const predicateToPropertyName = (predicate) => {
  return predicate.split('/').pop().split('#').pop().replace('>', '');
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

const getNodeType = (graph, node) => {
  const link = graph.links.find((link) => {
    return link.source === node && link.label === 'type';
  });
  return predicateToPropertyName(link.target);
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const isDid = (iri) => {
  return iri.startsWith('did:');
};

const uriToLabel = (iri) => {
  if (iri.match(/:/g).length >= 1) {
    return 'Resource';
  }
  return capitalizeFirstLetter(predicateToPropertyName(iri));
};

module.exports = {
  isRdfNode,
  removeAngleBrackets,
  removeEscapedQuotes,
  isBlankNode,
  predicateToPropertyName,
  getPrimitiveTypeFromObject,
  uriToLabel,

  getNodeType,
  isDid,
};
