# JSON-LD to Cypher

Compile JSON-LD (Decentralized Identifiers and Verifiable Credentials) to Cypher.

[![CI](https://github.com/transmute-industries/jsonld-to-cypher/actions/workflows/ci.yml/badge.svg)](https://github.com/transmute-industries/jsonld-to-cypher/actions/workflows/ci.yml)
![Branches](./badges/coverage-branches.svg)
![Functions](./badges/coverage-functions.svg)
![Lines](./badges/coverage-lines.svg)
![Statements](./badges/coverage-statements.svg)
![Jest coverage](./badges/coverage-jest%20coverage.svg)
[![NPM](https://nodei.co/npm/@transmute/jsonld-to-cypher.png?mini=true)](https://npmjs.org/package/@transmute/jsonld-to-cypher)

<img src="./transmute-banner.png" />

#### [Questions? Contact Transmute](https://transmute.typeform.com/to/RshfIw?typeform-source=jsonld-to-cypher)

#### 🚧 Warning Experimental 🔥

## Usage

### Library

```
npm i @transmute/jsonld-to-cypher@latest --save
```

```js
const c1 = await Cypher.fromJsonWebSignature(
  'eyJhbGciOiJFUzI1NiJ9.eyJzdHJpbmciOiJJdOKAmXMgYSBkYW5nZXJvdXMgYnVzaW5lc3MsIEZyb2RvLCBnb2luZyBvdXQgeW91ciBkb29yLiIsIm51bWJlciI6NDIuNSwib2JqZWN0Ijp7ImZvbyI6IvCfmYvigI3imYDvuI8ifSwiYm9vbGVhbiI6dHJ1ZX0.ckTfCowf_aYnSae6fp2JMQNd94qtu3KfWMYD_WHTxfVSJzsE6j64CpryLrlJ3MMK7Zp2_NokWiLAL0JqIZPdWw'
)
```

```cypher
MERGE ( n0 : UniformResourceLocator { id: "https://vocabulary.transmute.industries/ns/dynamic/#alg"  } )
MERGE ( n1 : UniformResourceLocator { id: "https://vocabulary.transmute.industries/ns/dynamic/#boolean"  } )
MERGE ( n2 : UniformResourceLocator { id: "https://vocabulary.transmute.industries/ns/dynamic/#foo"  } )
MERGE ( n3 : UniformResourceLocator { id: "https://vocabulary.transmute.industries/ns/dynamic/#number"  } )
MERGE ( n4 : UniformResourceLocator { id: "https://vocabulary.transmute.industries/ns/dynamic/#object"  } )
MERGE ( n5 : UniformResourceLocator { id: "https://vocabulary.transmute.industries/ns/dynamic/#protectedClaimSet"  } )
MERGE ( n6 : UniformResourceLocator { id: "https://vocabulary.transmute.industries/ns/dynamic/#protectedHeader"  } )
MERGE ( n7 : UniformResourceLocator { id: "https://vocabulary.transmute.industries/ns/dynamic/#string"  } )
MERGE ( n8 : UniformResourceName { id: "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0"  } )
MERGE ( n9 : UniformResourceName { id: "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0:_:c14n0" ,  foo: "🙋‍♀️" } )
MERGE ( n10 : UniformResourceName { id: "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0:_:c14n1" ,  alg: "ES256" } )
MERGE ( n11 : UniformResourceName { id: "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0:_:c14n2"  } )
MERGE ( n12 : UniformResourceName { id: "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0:_:c14n3" ,  boolean: true, number: 42.5, string: "It’s a dangerous business, Frodo, going out your door." } )
MERGE (n0)-[e0: Predicate { id : "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedPredicate" } ]->(n10)
MERGE (n1)-[e1: Predicate { id : "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedPredicate" } ]->(n12)
MERGE (n2)-[e2: Predicate { id : "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedPredicate" } ]->(n9)
MERGE (n3)-[e3: Predicate { id : "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedPredicate" } ]->(n12)
MERGE (n7)-[e4: Predicate { id : "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedPredicate" } ]->(n12)
MERGE (n8)-[e5: Relationship { id : "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedRelationship" } ]->(n2)
MERGE (n8)-[e6: Relationship { id : "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedRelationship" } ]->(n0)
MERGE (n8)-[e7: Relationship { id : "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedRelationship" } ]->(n11)
MERGE (n8)-[e8: Relationship { id : "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedRelationship" } ]->(n5)
MERGE (n8)-[e9: Relationship { id : "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedRelationship" } ]->(n6)
MERGE (n8)-[e10: Relationship { id : "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedRelationship" } ]->(n1)
MERGE (n8)-[e11: Relationship { id : "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedRelationship" } ]->(n3)
MERGE (n8)-[e12: Relationship { id : "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedRelationship" } ]->(n4)
MERGE (n8)-[e13: Relationship { id : "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedRelationship" } ]->(n7)
MERGE (n11)-[e14: ProtectedClaimSet { id : "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#protectedClaimSet" } ]->(n12)
MERGE (n11)-[e15: ProtectedHeader { id : "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#protectedHeader" } ]->(n10)
MERGE (n12)-[e16: Object { id : "urn:uuid:beb3dc43-1033-45ee-883b-b1547f2979f0", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#object" } ]->(n9)
RETURN n0,n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12
```

```js
const c1 = await Cypher.fromDocument({
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://w3id.org/vc-revocation-list-2020/v1',
  ],
  id: 'urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416',
  type: ['VerifiableCredential'],
  issuer: 'did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn',
  issuanceDate: '2010-01-01T19:23:24Z',
  credentialStatus: {
    id: 'https://api.did.actor/revocation-lists/1.json#0',
    type: 'RevocationList2020Status',
    revocationListIndex: 0,
    revocationListCredential: 'https://api.did.actor/revocation-lists/1.json',
  },
  credentialSubject: { id: 'did:example:123' },
  proof: {
    type: 'Ed25519Signature2018',
    created: '2022-10-30T20:15:27Z',
    verificationMethod:
      'did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn#z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn',
    proofPurpose: 'assertionMethod',
    jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..eQrU_BmLRp0CtI_gTKTl5UqcbKNy7n7hCtt0dvsYVdx0hR2Mbm4g53apLJ4fApy-dNvrvaJPpIC0OY_xG_e_Bg',
  },
})
```

```cypher
MERGE ( n0 : DecentralizedIdentifier { id: "did:example:123"  } )
MERGE ( n1 : DecentralizedIdentifier { id: "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn"  } )
MERGE ( n2 : DecentralizedIdentifierResource { id: "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn#z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn"  } )
MERGE ( n3 : UniformResourceLocator { id: "http://purl.org/dc/terms/created"  } )
MERGE ( n4 : UniformResourceLocator { id: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"  } )
MERGE ( n5 : UniformResourceLocator { id: "https://api.did.actor/revocation-lists/1.json"  } )
MERGE ( n6 : UniformResourceLocator { id: "https://api.did.actor/revocation-lists/1.json#0" ,  revocationListIndex: 0 } )
MERGE ( n7 : UniformResourceLocator { id: "https://w3id.org/security#Ed25519Signature2018"  } )
MERGE ( n8 : UniformResourceLocator { id: "https://w3id.org/security#assertionMethod"  } )
MERGE ( n9 : UniformResourceLocator { id: "https://w3id.org/security#jws"  } )
MERGE ( n10 : UniformResourceLocator { id: "https://w3id.org/security#proof"  } )
MERGE ( n11 : UniformResourceLocator { id: "https://w3id.org/security#proofPurpose"  } )
MERGE ( n12 : UniformResourceLocator { id: "https://w3id.org/security#verificationMethod"  } )
MERGE ( n13 : UniformResourceLocator { id: "https://w3id.org/vc-revocation-list-2020#RevocationList2020Status"  } )
MERGE ( n14 : UniformResourceLocator { id: "https://w3id.org/vc-revocation-list-2020#revocationListCredential"  } )
MERGE ( n15 : UniformResourceLocator { id: "https://w3id.org/vc-revocation-list-2020#revocationListIndex"  } )
MERGE ( n16 : UniformResourceLocator { id: "https://www.w3.org/2018/credentials#VerifiableCredential"  } )
MERGE ( n17 : UniformResourceLocator { id: "https://www.w3.org/2018/credentials#credentialStatus"  } )
MERGE ( n18 : UniformResourceLocator { id: "https://www.w3.org/2018/credentials#credentialSubject"  } )
MERGE ( n19 : UniformResourceLocator { id: "https://www.w3.org/2018/credentials#issuanceDate"  } )
MERGE ( n20 : UniformResourceLocator { id: "https://www.w3.org/2018/credentials#issuer"  } )
MERGE ( n21 : UniformResourceName { id: "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416" ,  issuanceDate: datetime("2010-01-01T19:23:24Z") } )
MERGE ( n22 : UniformResourceName { id: "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416:_:c14n0"  } )
MERGE ( n23 : UniformResourceName { id: "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416:_:c14n1" ,  created: datetime("2022-10-30T20:15:27Z"), jws: "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..eQrU_BmLRp0CtI_gTKTl5UqcbKNy7n7hCtt0dvsYVdx0hR2Mbm4g53apLJ4fApy-dNvrvaJPpIC0OY_xG_e_Bg" } )
MERGE (n3)-[e0: Predicate { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedPredicate" } ]->(n23)
MERGE (n6)-[e1: Type { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" } ]->(n13)
MERGE (n6)-[e2: RevocationListCredential { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://w3id.org/vc-revocation-list-2020#revocationListCredential" } ]->(n5)
MERGE (n9)-[e3: Predicate { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedPredicate" } ]->(n23)
MERGE (n15)-[e4: Predicate { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedPredicate" } ]->(n6)
MERGE (n19)-[e5: Predicate { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedPredicate" } ]->(n21)
MERGE (n21)-[e6: Type { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" } ]->(n16)
MERGE (n21)-[e7: Proof { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://w3id.org/security#proof" } ]->(n22)
MERGE (n21)-[e8: CredentialStatus { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://www.w3.org/2018/credentials#credentialStatus" } ]->(n6)
MERGE (n21)-[e9: CredentialSubject { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://www.w3.org/2018/credentials#credentialSubject" } ]->(n0)
MERGE (n21)-[e10: Issuer { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://www.w3.org/2018/credentials#issuer" } ]->(n1)
MERGE (n21)-[e11: Relationship { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedRelationship" } ]->(n4)
MERGE (n21)-[e12: Relationship { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedRelationship" } ]->(n14)
MERGE (n21)-[e13: Relationship { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedRelationship" } ]->(n15)
MERGE (n21)-[e14: Relationship { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedRelationship" } ]->(n10)
MERGE (n21)-[e15: Relationship { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedRelationship" } ]->(n17)
MERGE (n21)-[e16: Relationship { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedRelationship" } ]->(n18)
MERGE (n21)-[e17: Relationship { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedRelationship" } ]->(n20)
MERGE (n21)-[e18: Relationship { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedRelationship" } ]->(n3)
MERGE (n21)-[e19: Relationship { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedRelationship" } ]->(n9)
MERGE (n21)-[e20: Relationship { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedRelationship" } ]->(n11)
MERGE (n21)-[e21: Relationship { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://vocabulary.transmute.industries/ns/dynamic/#disclosedRelationship" } ]->(n12)
MERGE (n23)-[e22: Type { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" } ]->(n7)
MERGE (n23)-[e23: ProofPurpose { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://w3id.org/security#proofPurpose" } ]->(n8)
MERGE (n23)-[e24: VerificationMethod { id : "urn:uuid:4d432bf3-ca45-4070-999a-eb48c4f3f416", predicate: "https://w3id.org/security#verificationMethod" } ]->(n2)
RETURN n0,n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16,n17,n18,n19,n20,n21,n22,n23
```

### Command Line

```
npm i -g @transmute/jsonld-to-cypher@latest
```

```
jsonld-to-cypher convert ./src/__fixtures__/vc.jwt  --type jws
```

<img src="./example.png" />

### Development

```
npm i
npm t

npm run jsonld-to-cypher convert ./src/__fixtures__/vc.jwt  -- --type jws
```

### Installing Neo4j Desktop

See [https://neo4j.com](https://neo4j.com/).
