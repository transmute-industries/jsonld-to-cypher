const {
  attribute,
  Digraph,
  Subgraph,
  Node,
  Edge,
  toDot,
} = require('ts-graphviz');

it('toDot', async () => {
  const G = new Digraph();
  const A = new Subgraph('A');
  const node1 = new Node('node1', {
    [attribute.color]: 'red',
  });
  const node2 = new Node('node2', {
    [attribute.color]: 'blue',
  });
  const edge = new Edge([node1, node2], {
    [attribute.label]: 'Edge Label',
    [attribute.color]: 'pink',
  });
  G.addSubgraph(A);
  A.addNode(node1);
  A.addNode(node2);
  A.addEdge(edge);
  const dot = toDot(G);
  expect(dot).toBeDefined();
});
