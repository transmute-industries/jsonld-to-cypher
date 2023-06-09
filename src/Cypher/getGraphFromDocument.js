/* eslint-disable max-len */
const jsonld = require('jsonld');
const _ = require('lodash');
const {NQuads} = require('rdf-canonize');

const structuredClone = (obj) => JSON.parse(JSON.stringify(obj));

const getLabelFromIri = (iri) => {
  return _.startCase(iri.split('/').pop().split('#').pop());
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

const isBlankNode = (iri) => {
  return iri.includes('_:c14n');
};

const isIri = (iri) => {
  if (typeof iri === 'string') {
    return isDid(iri) || isDidUrl(iri) || isUrl(iri) || isUrn(iri);
  }
  return false;
};

const getNodeLabel = (node) => {
  if (isBlankNode(node.id)) {
    return 'Blank Node';
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
  const knownLabels = [
    'Type',
    'Issuer',
    'Holder',
    'Credential Subject',
    'Verifiable Credential',
    'Verifiable Presentation',
  ];
  graph.links.forEach((link) => {
    if (knownLabels.includes(link.label)) {
      if (!graph.nodes[link.target].labels.includes(link.label)) {
        graph.nodes[link.target].labels.push(link.label);
      }
    }
  });
};

const addGraphNode = ({graph, id}) => {
  graph.nodes[id] = {
    ...(graph.nodes[id] || {id: id, labels: []}),
  };
};

const addGraphNodeProperty = (graph, id, key, value) => {
  graph.nodes[id] = {
    ...graph.nodes[id],
    [key]: value,
  };
};

const addGraphEdge = ({graph, source, target, label, definition}) => {
  graph.links.push(
      JSON.parse(
          JSON.stringify({
            source,
            label,
            definition,
            target,
          }),
      ),
  );
};

const updateGraph = (graph, nquad) => {
  addGraphNode({graph, id: nquad.subject.value});
  if (!nquad.object.datatype) {
    addGraphNode({graph, id: nquad.object.value});
    addGraphEdge({
      graph,
      label: getLabelFromIri(nquad.predicate.value),
      source: nquad.subject.value,
      definition: nquad.predicate.value,
      target: nquad.object.value,
    });
  } else {
    addGraphNodeProperty(
        graph,
        nquad.subject.value,
        nquad.predicate.value,
        nquad.object.value,
    );
  }
};

const removeEmptyBlankNodes = (graph) => {
  const blankNodes = graph.nodes
      .filter((n) => n.id.includes('_:c14n') && Object.keys(n).length === 2)
      .map((n) => n.id);
  blankNodes.forEach((id) => {
    const edges = graph.links.find((e) => {
      return e.source === id || e.target === id;
    });
    // remove blank nodes with no edges
    if (edges === undefined) {
      graph.nodes = graph.nodes.filter((n) => {
        return n.id !== id;
      });
    }
  });
};

const requireAbsoluteNodes = (graph) => {
  graph.nodes = graph.nodes.map((n) => {
    if (n.id.includes('_:c14n')) {
      n.id = graph.id + ':' + n.id;
    }
    return n;
  });
  graph.links = graph.links.map((e) => {
    if (e.source.includes('_:c14n')) {
      e.source = graph.id + ':' + e.source;
    }
    if (e.target.includes('_:c14n')) {
      e.target = graph.id + ':' + e.target;
    }
    return e;
  });
};

const fixPresentationGraph = (graph) => {
  const search = (e) =>
    e.definition === 'https://www.w3.org/2018/credentials#verifiableCredential';
  const index = graph.links.findIndex(search);
  const edge = graph.links[index];
  graph.links.splice(index, 1);
  delete graph.nodes[edge.target];
  return graph;
};

const getGraphFromDocument = async (doc, {id, documentLoader}) => {
  if (doc.id) {
    id = doc.id;
  }
  const nodes = {};
  const links = [];
  const graph = {id, nodes, links};
  const proofs = {};
  const credentialIds = [];
  const document = structuredClone(doc);
  if (document.proof) {
    proofs[document.id] = document.proof;
    delete document.proof;
  }
  // TODO: refactor to remove @container sadness
  if (document.verifiableCredential) {
    document.verifiableCredential.forEach((credential) => {
      proofs[credential.id] = credential.proof;
      delete credential.proof;
      credentialIds.push(credential.id);
    });
    // delete document.verifiableCredential;
  }
  const canonized = await jsonld.canonize(document, {
    algorithm: 'URDNA2015',
    format: 'application/n-quads',
    documentLoader,
    safe: false, // lossy behavior but doesn't fail
  });
  const parsedNquads = NQuads.parse(canonized);
  parsedNquads.forEach((nquad) => {
    updateGraph(graph, nquad);
  });
  const keys = Object.keys(proofs);
  for (let i = 0; i < keys.length; i++) {
    const id = keys[i];
    const proof = proofs[id];
    if (proof) {
      const proofId = proof.id || id + ':proof:' + i;
      addGraphNode({graph, id: proofId});
      graph.nodes[proofId] = {
        ...graph.nodes[proofId],
        ...proof,
        labels: [proof.type],
      };
      addGraphEdge({
        graph,
        label: 'proof',
        source: id,
        definition: 'https://w3id.org/security#proof',
        target: proofId,
      });
    }
  }
  if (credentialIds.length) {
    credentialIds.forEach((credentialId) => {
      addGraphEdge({
        graph,
        label: 'Verifiable Credential',
        source: document.id,
        definition: 'https://www.w3.org/2018/credentials#verifiableCredential',
        target: credentialId,
      });
    });
  }
  setNodeLabelFromEdges(graph);
  fixPresentationGraph(graph);
  graph.nodes = Object.values(graph.nodes);
  graph.nodes = graph.nodes.map((n) => {
    const defaultLabel = getNodeLabel(n);
    let finalLabels =
      n.labels.length >= 1 && defaultLabel === 'Blank Node' ?
        n.labels :
        [defaultLabel, ...n.labels];

    const typeEdge = graph.links.find(
        (e) =>
          e.source === n.id &&
        e.definition === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
    );

    if (typeEdge && typeEdge.target.includes('VerifiablePresentation')) {
      finalLabels = ['VerifiablePresentation', ...finalLabels];
    }

    return {...n, labels: finalLabels};
  });

  removeEmptyBlankNodes(graph);
  requireAbsoluteNodes(graph);
  return graph;
};

module.exports = getGraphFromDocument;
