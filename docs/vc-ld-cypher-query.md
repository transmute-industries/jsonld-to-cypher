# Clear Database
```cypher
MATCH (n) DETACH DELETE n
```
# Generated Cypher
```cypher
CREATE ( g:Graph { uri: "urn:uuid:1e61e0e0-ee5e-4767-8481-81179d382336" } )
MERGE ( n0 :Resource { uri: "urn:uuid:1e61e0e0-ee5e-4767-8481-81179d382336", issuanceDate: datetime("2010-01-01T19:23:24Z") } )
MERGE ( n1 :Resource { uri: "https://api.did.actor/revocation-lists/1.json#0", revocationListIndex: 0 } )
MERGE ( n2 :Resource { uri: "https://w3id.org/vc-revocation-list-2020#RevocationList2020Status" } )
MERGE ( n3 :Resource { uri: "https://api.did.actor/revocation-lists/1.json" } )
MERGE ( n4 :Resource { uri: "https://w3id.org/vc-revocation-list-2020#revocationListIndex" } )
MERGE ( n5 :Resource { uri: "https://www.w3.org/2018/credentials#VerifiableCredential" } )
MERGE ( n6 :Resource { uri: "urn:uuid:1e61e0e0-ee5e-4767-8481-81179d382336:_:c14n0" } )
MERGE ( n7 :Resource { uri: "did:example:123" } )
MERGE ( n8 :Resource { uri: "https://www.w3.org/2018/credentials#issuanceDate" } )
MERGE ( n9 :Resource { uri: "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn" } )
MERGE ( n10 :Resource { uri: "urn:uuid:1e61e0e0-ee5e-4767-8481-81179d382336:_:c14n1", created: datetime("2022-10-08T20:26:48Z"), jws: "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..CG1nd5IaGgOEiEKuCVhaXTQKkqL_EWBgfHCEqs5tHaMqAXZ5luk_5OMGJ_uNS9vgaCVhVEBXXkG5c4gDh2sLCQ" } )
MERGE ( n11 :Resource { uri: "http://purl.org/dc/terms/created" } )
MERGE ( n12 :Resource { uri: "https://w3id.org/security#Ed25519Signature2018" } )
MERGE ( n13 :Resource { uri: "https://w3id.org/security#jws" } )
MERGE ( n14 :Resource { uri: "https://w3id.org/security#assertionMethod" } )
MERGE ( n15 :Resource { uri: "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn#z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn" } )
CREATE (n1)-[e0: TYPE ]->(n2)
CREATE (n1)-[e1: REVOCATION_LIST_CREDENTIAL ]->(n3)
CREATE (n1)-[e2: REVOCATION_LIST_INDEX ]->(n4)
CREATE (n0)-[e3: TYPE ]->(n5)
CREATE (n0)-[e4: PROOF ]->(n6)
CREATE (n6)-[e5: PROOF ]->(n10)
CREATE (n0)-[e6: CREDENTIAL_STATUS ]->(n1)
CREATE (n0)-[e7: SUBJECT ]->(n7)
CREATE (n0)-[e8: ISSUANCE_DATE ]->(n8)
CREATE (n0)-[e9: ISSUER ]->(n9)
CREATE (n10)-[e10: HAS ]->(n11)
CREATE (n10)-[e11: TYPE ]->(n12)
CREATE (n10)-[e12: HAS ]->(n13)
CREATE (n10)-[e13: PROOF_PURPOSE ]->(n14)
CREATE (n10)-[e14: VERIFICATION_METHOD ]->(n15)
CREATE (g)-[nge: CONTAINS ]->(n0)
RETURN g,n0,n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15
```