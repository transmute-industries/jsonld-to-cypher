MERGE (n0:`DID`{id:"did:example:111"}) 
MERGE (n1:`DID URL`{id:"did:example:111#key-0"}) 
MERGE (n2:`DID`{id:"did:example:222"}) 
MERGE (n3:`Type`{id:"https://w3id.org/security#Ed25519Signature2018"}) 
MERGE (n4:`URL`{id:"https://w3id.org/security#assertionMethod"}) 
MERGE (n5:`Type`{id:"https://www.w3.org/2018/credentials#VerifiableCredential"}) 
MERGE (n6:`URN`{id:"urn:rx:0"}) 
  SET  n6.`http://purl.org/dc/terms/created`=datetime("2023-04-07T22:57:31Z")
  SET  n6.`https://w3id.org/security#jws`="eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..UGl8mW4rHgk0FJW3BXTteFxwZ9PnteyOiv9QBl2KNCOKhhxzVgA-Cl2qxxK_ITTd5R-F6ICFtWVqB0IkwVcuBg"
MERGE (n7:`URN`{id:"urn:uuid:000"}) 
  SET  n7.`https://www.w3.org/2018/credentials#issuanceDate`=datetime("2010-01-01T19:23:24Z")
MERGE (n8:`URN`{id:"urn:uuid:000:_:c14n0"}) 
MERGE (n9:`URN`{id:"urn:uuid:456"}) 
MERGE (n6)-[e0:`Type`]->(n3)
  SET  e0.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n6)-[e1:`Proof Purpose`]->(n4)
  SET  e1.`definition`="https://w3id.org/security#proofPurpose"
MERGE (n6)-[e2:`Verification Method`]->(n1)
  SET  e2.`definition`="https://w3id.org/security#verificationMethod"
MERGE (n7)-[e3:`Type`]->(n5)
  SET  e3.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n7)-[e4:`Proof`]->(n8)
  SET  e4.`definition`="https://w3id.org/security#proof"
MERGE (n7)-[e5:`Credential Subject`]->(n2)
  SET  e5.`definition`="https://www.w3.org/2018/credentials#credentialSubject"
MERGE (n7)-[e6:`Issuer`]->(n0)
  SET  e6.`definition`="https://www.w3.org/2018/credentials#issuer"
RETURN n0,n1,n2,n3,n4,n5,n6,n7,n8,n9
