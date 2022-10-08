# Generated Cypher

```cypher
CREATE ( g:Graph { uri: "urn:uuid:4269a864-5fdd-4957-ac1d-ce0a7afc6b1a:_:c14n1", keys: ["/@context/@vocab","/@type","/offers/@type","/offers/price","/offers/priceCurrency"], values: ["https://schema.org/","Product","Offer","55.00","USD"] } )
MERGE ( n0 :Resource { uri: "urn:uuid:4269a864-5fdd-4957-ac1d-ce0a7afc6b1a:_:c14n0", price: "55.00", priceCurrency: "USD" } )
MERGE ( n1 :Offer { uri: "https://schema.org/Offer" } )
MERGE ( n2 :Resource { uri: "https://schema.org/price" } )
MERGE ( n3 :Resource { uri: "https://schema.org/priceCurrency" } )
MERGE ( n4 :Resource { uri: "urn:uuid:4269a864-5fdd-4957-ac1d-ce0a7afc6b1a:_:c14n1" } )
MERGE ( n5 :Product { uri: "https://schema.org/Product" } )
MERGE ( n6 :Resource { uri: "https://schema.org/offers" } )
CREATE (n0)-[e0: type ]->(n1)
CREATE (n0)-[e1: has ]->(n2)
CREATE (n0)-[e2: has ]->(n3)
CREATE (n4)-[e3: type ]->(n5)
CREATE (n4)-[e4: offers ]->(n0)
CREATE (n4)-[e5: has ]->(n6)
CREATE (g)-[namedGraphEdge: CONTAINS ]->(n4)
RETURN g,n0,n1,n2,n3,n4,n5,n6
```
