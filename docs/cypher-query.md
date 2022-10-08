# Clear Database
```cypher
MATCH (n) DETACH DELETE n
```
# Generated Cypher
```cypher
CREATE ( g:Graph { uri: "urn:uuid:2ee0ad2d-255f-4498-bbe8-707c6cf77c15:_:c14n1", keys: ["/@context/@vocab","/@type","/offers/@type","/offers/price","/offers/priceCurrency"], values: ["https://schema.org/","Product","Offer","55.00","USD"] } )
MERGE ( n0 :Resource { uri: "urn:uuid:2ee0ad2d-255f-4498-bbe8-707c6cf77c15:_:c14n0", price: "55.00", priceCurrency: "USD" } )
MERGE ( n1 :Offer { uri: "https://schema.org/Offer" } )
MERGE ( n2 :Price { uri: "https://schema.org/price" } )
MERGE ( n3 :PriceCurrency { uri: "https://schema.org/priceCurrency" } )
MERGE ( n4 :Resource { uri: "urn:uuid:2ee0ad2d-255f-4498-bbe8-707c6cf77c15:_:c14n1" } )
MERGE ( n5 :Product { uri: "https://schema.org/Product" } )
MERGE ( n6 :Offers { uri: "https://schema.org/offers" } )
CREATE (n0)-[e0: TYPE ]->(n1)
CREATE (n0)-[e1: HAS ]->(n2)
CREATE (n0)-[e2: HAS ]->(n3)
CREATE (n4)-[e3: TYPE ]->(n5)
CREATE (n4)-[e4: OFFERS ]->(n0)
CREATE (n4)-[e5: HAS ]->(n6)
CREATE (g)-[nge: CONTAINS ]->(n4)
RETURN g,n0,n1,n2,n3,n4,n5,n6
```