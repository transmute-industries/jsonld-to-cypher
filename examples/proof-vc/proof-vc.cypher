MERGE (n0:`URN`{id:"urn:uuid:000"}) 
  SET  n0.`https://www.w3.org/2018/credentials#issuanceDate`=datetime("2010-01-01T19:23:24Z")
MERGE (n1:`URL`:`Type`{id:"https://www.w3.org/2018/credentials#VerifiableCredential"}) 
MERGE (n2:`Blank Node`{id:"urn:example:proof-vc:_:c14n1"}) 
  SET  n2.`http://www.w3.org/1999/02/22-rdf-syntax-ns#type`="https://w3id.org/security#Ed25519Signature2018"
  SET  n2.`https://w3id.org/security#jws`="eyJhbGc..tWVqB0IkwVcuBg"
  SET  n2.`https://w3id.org/security#proofPurpose`="https://w3id.org/security#assertionMethod"
  SET  n2.`https://w3id.org/security#verificationMethod`="did:example:111#key-0"
MERGE (n3:`DID`:`Credential Subject`{id:"did:example:222"}) 
MERGE (n4:`URL`{id:"http://www.w3.org/2001/XMLSchema#dateTime"}) 
MERGE (n5:`DID`:`Issuer`{id:"did:example:111"}) 
MERGE (n6:`Blank Node`{id:"urn:example:proof-vc:_:c14n0"}) 
  SET  n6.`http://purl.org/dc/terms/created`=datetime("2023-04-07T22:57:31Z")
MERGE (n7:`URL`:`Type`{id:"https://w3id.org/security#Ed25519Signature2018"}) 
MERGE (n8:`URL`{id:"https://w3id.org/security#assertionMethod"}) 
MERGE (n9:`DID URL`{id:"did:example:111#key-0"}) 
MERGE (n0)-[e0:`Type`]->(n1)
  SET  e0.`label`="Type"
  SET  e0.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n0)-[e1:`Proof`]->(n2)
  SET  e1.`label`="Proof"
  SET  e1.`definition`="https://w3id.org/security#proof"
MERGE (n0)-[e2:`Credential Subject`]->(n3)
  SET  e2.`label`="Credential Subject"
  SET  e2.`definition`="https://www.w3.org/2018/credentials#credentialSubject"
MERGE (n0)-[e3:`Date Time`]->(n4)
  SET  e3.`label`="Date Time"
  SET  e3.`definition`="https://www.w3.org/2018/credentials#issuanceDate"
MERGE (n0)-[e4:`Issuer`]->(n5)
  SET  e4.`label`="Issuer"
  SET  e4.`definition`="https://www.w3.org/2018/credentials#issuer"
MERGE (n6)-[e5:`Ed 25519 Signature 2018`]->(n2)
  SET  e5.`label`="Ed 25519 Signature 2018"
  SET  e5.`definition`="https://w3id.org/security#Ed25519Signature2018"
MERGE (n6)-[e6:`Type`]->(n7)
  SET  e6.`label`="Type"
  SET  e6.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n2)-[e7:`Proof Purpose`]->(n8)
  SET  e7.`label`="Proof Purpose"
  SET  e7.`definition`="https://w3id.org/security#proofPurpose"
MERGE (n2)-[e8:`Verification Method`]->(n9)
  SET  e8.`label`="Verification Method"
  SET  e8.`definition`="https://w3id.org/security#verificationMethod"
RETURN n0,n1,n2,n3,n4,n5,n6,n7,n8,n9
