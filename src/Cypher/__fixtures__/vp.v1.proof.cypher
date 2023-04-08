MERGE (n0:`DID URL`{id:"did:example:111#key-0"}) 
MERGE (n1:`DID`{id:"did:example:333"}) 
MERGE (n2:`DID`{id:"did:example:444"}) 
MERGE (n3:`DID`{id:"did:example:555"}) 
MERGE (n4:`URL`{id:"https://example.edu/issuers/111"}) 
MERGE (n5:`URL`{id:"https://example.edu/issuers/222"}) 
MERGE (n6:`Type`{id:"https://w3id.org/security#Ed25519Signature2018"}) 
MERGE (n7:`URL`{id:"https://w3id.org/security#assertionMethod"}) 
MERGE (n8:`Type`{id:"https://www.w3.org/2018/credentials#VerifiableCredential"}) 
MERGE (n9:`Type`{id:"https://www.w3.org/2018/credentials#VerifiablePresentation"}) 
MERGE (n10:`URN`{id:"urn:uuid:0000"}) 
MERGE (n11:`URN`{id:"urn:uuid:0000:_:c14n0"}) 
MERGE (n12:`URN`{id:"urn:uuid:0000:_:c14n1"}) 
  SET  n12.`https://www.w3.org/2018/credentials#issuanceDate`=datetime("2010-01-01T19:23:24Z")
MERGE (n13:`URN`{id:"urn:uuid:0000:_:c14n2"}) 
MERGE (n14:`URN`{id:"urn:uuid:0000:_:c14n3"}) 
  SET  n14.`https://www.w3.org/2018/credentials#issuanceDate`=datetime("2010-01-01T19:23:24Z")
MERGE (n15:`URN`{id:"urn:uuid:0000:_:c14n4"}) 
  SET  n15.`http://purl.org/dc/terms/created`=datetime("2023-04-07T22:57:31Z")
  SET  n15.`https://w3id.org/security#jws`="eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..UGl8mW4rHgk0FJW3BXTteFxwZ9PnteyOiv9QBl2KNCOKhhxzVgA-Cl2qxxK_ITTd5R-F6ICFtWVqB0IkwVcuBg"
MERGE (n16:`URN`{id:"urn:uuid:0000:_:c14n5"}) 
MERGE (n17:`URN`{id:"urn:uuid:0000:_:c14n6"}) 
MERGE (n10)-[e0:`Named Graph`]->(n14)
  SET  e0.`definition`="https://wikipedia.org/wiki/Named_graph"
MERGE (n10)-[e1:`Named Graph`]->(n15)
  SET  e1.`definition`="https://wikipedia.org/wiki/Named_graph"
MERGE (n10)-[e2:`Named Graph`]->(n17)
  SET  e2.`definition`="https://wikipedia.org/wiki/Named_graph"
MERGE (n11)-[e3:`Blank Node`]->(n12)
  SET  e3.`definition`="https://wikipedia.org/wiki/Blank_node"
MERGE (n12)-[e4:`Type`]->(n8)
  SET  e4.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n12)-[e5:`Credential Subject`]->(n2)
  SET  e5.`definition`="https://www.w3.org/2018/credentials#credentialSubject"
MERGE (n12)-[e6:`Issuer`]->(n5)
  SET  e6.`definition`="https://www.w3.org/2018/credentials#issuer"
MERGE (n14)-[e7:`Type`]->(n8)
  SET  e7.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n14)-[e8:`Credential Subject`]->(n1)
  SET  e8.`definition`="https://www.w3.org/2018/credentials#credentialSubject"
MERGE (n14)-[e9:`Issuer`]->(n4)
  SET  e9.`definition`="https://www.w3.org/2018/credentials#issuer"
MERGE (n15)-[e10:`Type`]->(n6)
  SET  e10.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n15)-[e11:`Proof Purpose`]->(n7)
  SET  e11.`definition`="https://w3id.org/security#proofPurpose"
MERGE (n15)-[e12:`Verification Method`]->(n0)
  SET  e12.`definition`="https://w3id.org/security#verificationMethod"
MERGE (n17)-[e13:`Type`]->(n9)
  SET  e13.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n17)-[e14:`Proof`]->(n11)
  SET  e14.`definition`="https://w3id.org/security#proof"
MERGE (n17)-[e15:`Holder`]->(n3)
  SET  e15.`definition`="https://www.w3.org/2018/credentials#holder"
MERGE (n17)-[e16:`Verifiable Credential`]->(n13)
  SET  e16.`definition`="https://www.w3.org/2018/credentials#verifiableCredential"
MERGE (n17)-[e17:`Verifiable Credential`]->(n16)
  SET  e17.`definition`="https://www.w3.org/2018/credentials#verifiableCredential"
RETURN n0,n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16,n17
