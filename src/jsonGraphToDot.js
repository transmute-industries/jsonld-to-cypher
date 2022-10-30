const {
  attribute,
  Digraph,
  Subgraph,
  Node,
  Edge,
  toDot,
} = require('ts-graphviz');

const nodeToColor = (node) => {
  if (Object.keys(node).length === 1) {
    return 'red';
  }
  return 'blue';
};

const nodeToLabel = (node) => {
  const lines = JSON.stringify(node, null, 2).split('\n');
  return lines.slice(1, lines.length - 1).join('\n');
};

const jsonGraphToDot = (intermediate) => {
  const G = new Digraph();
  const A = new Subgraph('A');
  const internalNodeMap = {};
  intermediate.nodes.forEach((node) => {
    const newNode = new Node(node.id, {
      [attribute.shape]: 'rectangle',
      [attribute.color]: nodeToColor(node),
      [attribute.label]: nodeToLabel(node),
    });
    internalNodeMap[node.id] = newNode;
    A.addNode(newNode);
  });
  intermediate.links.forEach((link) => {
    const edge = new Edge(
        [internalNodeMap[link.source], internalNodeMap[link.target]],
        {
          [attribute.label]: link.label,
          [attribute.color]: 'gray',
        },
    );
    A.addEdge(edge);
  });

  G.addSubgraph(A);

  return toDot(G);
};

module.exports = jsonGraphToDot;
