# Clear Database
```cypher
MATCH (n) DETACH DELETE n
```
# Generated Cypher
```cypher
CREATE ( g:Graph { uri: "urn:uuid:0be1de75-61b9-42c7-949e-fc97096848dd" } )
MERGE ( n0 :Resource { uri: "urn:uuid:0be1de75-61b9-42c7-949e-fc97096848dd", issuanceDate: datetime("2010-01-01T19:23:24Z") } )
MERGE ( n1 :Resource { uri: "did:example:123" } )
MERGE ( n2 :Product { uri: "https://schema.org/Product" } )
MERGE ( n3 :VerifiableCredential { uri: "https://www.w3.org/2018/credentials#VerifiableCredential" } )
MERGE ( n4 :IssuanceDate { uri: "https://www.w3.org/2018/credentials#issuanceDate" } )
MERGE ( n5 :Resource { uri: "did:key:zQ3shrnCZq3R7vLvDeWQFnxz5HMKqP9JoiMonzYJB4TGYnftL" } )
CREATE (n1)-[e0: TYPE ]->(n2)
CREATE (n0)-[e1: TYPE ]->(n3)
CREATE (n0)-[e2: SUBJECT ]->(n1)
CREATE (n0)-[e3: ISSUANCEDATE ]->(n4)
CREATE (n0)-[e4: ISSUER ]->(n5)
CREATE (g)-[nge: CONTAINS ]->(n0)
RETURN g,n0,n1,n2,n3,n4,n5
```