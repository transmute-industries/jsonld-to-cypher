# Clear Database
```cypher
MATCH (n) DETACH DELETE n
```
# Generated Cypher
```cypher
CREATE ( g:Graph { uri: "urn:uuid:766320b3-89be-410b-b184-d1b85d21506b:_:c14n2" } )
MERGE ( n0 :Resource { uri: "urn:uuid:766320b3-89be-410b-b184-d1b85d21506b:_:c14n0", price: 100, priceCurrency: "USD" } )
MERGE ( n1 :Offer { uri: "https://schema.org/Offer" } )
MERGE ( n2 :Price { uri: "https://schema.org/price" } )
MERGE ( n3 :PriceCurrency { uri: "https://schema.org/priceCurrency" } )
MERGE ( n4 :Resource { uri: "urn:uuid:766320b3-89be-410b-b184-d1b85d21506b:_:c14n1", offers: "urn:uuid:766320b3-89be-410b-b184-d1b85d21506b:_:c14n2" } )
MERGE ( n5 :Product { uri: "https://schema.org/Product" } )
MERGE ( n6 :Offers { uri: "https://schema.org/offers" } )
MERGE ( n7 :Resource { uri: "urn:uuid:766320b3-89be-410b-b184-d1b85d21506b:_:c14n2", isFamilyFriendly: false, price: 99.99, priceCurrency: "EUR" } )
MERGE ( n8 :IsFamilyFriendly { uri: "https://schema.org/isFamilyFriendly" } )
CREATE (n0)-[e0: TYPE ]->(n1)
CREATE (n0)-[e1: HAS ]->(n2)
CREATE (n0)-[e2: HAS ]->(n3)
CREATE (n4)-[e3: TYPE ]->(n5)
CREATE (n4)-[e4: OFFERS ]->(n0)
CREATE (n4)-[e5: HAS ]->(n6)
CREATE (n4)-[e6: OFFERS ]->(n7)
CREATE (n4)-[e7: HAS ]->(n6)
CREATE (n7)-[e8: TYPE ]->(n1)
CREATE (n7)-[e9: HAS ]->(n8)
CREATE (n7)-[e10: HAS ]->(n2)
CREATE (n7)-[e11: HAS ]->(n3)
CREATE (g)-[nge: CONTAINS ]->(n7)
RETURN g,n0,n1,n2,n3,n4,n5,n6,n7,n8
```