MERGE (n0:`Resource`{id:"_:c14n1"}) 
  SET  n0.`http://www.w3.org/1999/02/22-rdf-syntax-ns#type`="https://www.w3.org/2018/credentials#VerifiableCredential"
  SET  n0.`https://www.w3.org/2018/credentials#issuanceDate`=datetime("2010-01-01T19:23:24Z")
  SET  n0.`https://www.w3.org/2018/credentials#issuer`="https://example.edu/issuers/111"
MERGE (n1:`Type`{id:"https://www.w3.org/2018/credentials#VerifiableCredential"}) 

MERGE (n2:`URL`{id:"http://www.w3.org/2001/XMLSchema#dateTime"}) 

MERGE (n3:`URL`{id:"https://example.edu/issuers/111"}) 

MERGE (n4:`Resource`{id:"_:c14n6"}) 
  SET  n4.`http://www.w3.org/1999/02/22-rdf-syntax-ns#type`="https://www.w3.org/2018/credentials#VerifiableCredential"
  SET  n4.`https://www.w3.org/2018/credentials#issuer`="https://example.edu/issuers/222"
MERGE (n5:`URL`{id:"https://example.edu/issuers/222"}) 

MERGE (n6:`Resource`{id:"_:c14n3"}) 
  SET  n6.`http://www.w3.org/1999/02/22-rdf-syntax-ns#type`="https://w3id.org/security#Ed25519Signature2018"
MERGE (n7:`Type`{id:"https://w3id.org/security#Ed25519Signature2018"}) 

MERGE (n8:`Resource`{id:"_:c14n5"}) 

MERGE (n9:`Type`{id:"https://www.w3.org/2018/credentials#VerifiablePresentation"}) 

MERGE (n10:`DID`{id:"did:example:555"}) 

MERGE (n0)-[e0:`Type`]->(n1)
  SET  e0.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n0)-[e1:`Date Time`]->(n2)
  SET  e1.`definition`="https://www.w3.org/2018/credentials#issuanceDate"
MERGE (n0)-[e2:`Issuer`]->(n3)
  SET  e2.`definition`="https://www.w3.org/2018/credentials#issuer"
MERGE (n4)-[e3:`Type`]->(n1)
  SET  e3.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n4)-[e4:`Issuer`]->(n5)
  SET  e4.`definition`="https://www.w3.org/2018/credentials#issuer"
MERGE (n6)-[e5:`Type`]->(n7)
  SET  e5.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n8)-[e6:`Type`]->(n9)
  SET  e6.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n8)-[e7:`Proof`]->(n6)
  SET  e7.`definition`="https://w3id.org/security#proof"
MERGE (n8)-[e8:`Holder`]->(n10)
  SET  e8.`definition`="https://www.w3.org/2018/credentials#holder"
MERGE (n8)-[e9:`Verifiable Credential`]->(n0)
  SET  e9.`definition`="https://www.w3.org/2018/credentials#verifiableCredential"
MERGE (n8)-[e10:`Verifiable Credential`]->(n4)
  SET  e10.`definition`="https://www.w3.org/2018/credentials#verifiableCredential"
RETURN n0,n1,n2,n3,n4,n5,n6,n7,n8,n9,n10
