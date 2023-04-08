MERGE (n0:`undefined`{id:"did:example:555"}) 
MERGE (n1:`undefined`{id:"https://example.edu/issuers/111"}) 
MERGE (n2:`undefined`{id:"https://example.edu/issuers/222"}) 
MERGE (n3:`undefined`{id:"https://w3id.org/security#Ed25519Signature2018"}) 
MERGE (n4:`undefined`{id:"https://www.w3.org/2018/credentials#VerifiableCredential"}) 
MERGE (n5:`undefined`{id:"https://www.w3.org/2018/credentials#VerifiablePresentation"}) 
MERGE (n6:`undefined`{id:"urn:uuid:0000"}) 
MERGE (n7:`undefined`{id:"urn:uuid:0000:_:c14n0"}) 
MERGE (n8:`undefined`{id:"urn:uuid:0000:_:c14n1"}) 
MERGE (n9:`undefined`{id:"urn:uuid:0000:_:c14n2"}) 
MERGE (n10:`undefined`{id:"urn:uuid:0000:_:c14n3"}) 
MERGE (n11:`undefined`{id:"urn:uuid:0000:_:c14n4"}) 
MERGE (n12:`undefined`{id:"urn:uuid:0000:_:c14n5"}) 
MERGE (n13:`undefined`{id:"urn:uuid:0000:_:c14n6"}) 
MERGE (n7)-[e0:`Type`]->(n4)
  SET  e0.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n7)-[e1:`Issuer`]->(n1)
  SET  e1.`definition`="https://www.w3.org/2018/credentials#issuer"
MERGE (n9)-[e2:`Type`]->(n4)
  SET  e2.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n9)-[e3:`Issuer`]->(n2)
  SET  e3.`definition`="https://www.w3.org/2018/credentials#issuer"
MERGE (n11)-[e4:`Type`]->(n3)
  SET  e4.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n12)-[e5:`Type`]->(n5)
  SET  e5.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n12)-[e6:`Proof`]->(n10)
  SET  e6.`definition`="https://w3id.org/security#proof"
MERGE (n12)-[e7:`Holder`]->(n0)
  SET  e7.`definition`="https://www.w3.org/2018/credentials#holder"
MERGE (n12)-[e8:`Verifiable Credential`]->(n8)
  SET  e8.`definition`="https://www.w3.org/2018/credentials#verifiableCredential"
MERGE (n12)-[e9:`Verifiable Credential`]->(n13)
  SET  e9.`definition`="https://www.w3.org/2018/credentials#verifiableCredential"
RETURN n0,n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13
