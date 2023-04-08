MERGE (n0:`DID`{id:"did:example:ebfeb1f712ebc6f1c276e12ec21"}) 
MERGE (n1:`URL`{id:"https://example.edu/issuers/565049"}) 
MERGE (n2:`Type`{id:"https://www.w3.org/2018/credentials#VerifiableCredential"}) 
MERGE (n3:`URN`{id:"urn:uuid:123"}) 
MERGE (n4:`URN`{id:"urn:uuid:123:_:c14n0"}) 
  SET  n4.`https://www.w3.org/2018/credentials#issuanceDate`=datetime("2010-01-01T19:23:24Z")
MERGE (n3)-[e0:`Named Graph`]->(n4)
  SET  e0.`definition`="https://wikipedia.org/wiki/Named_graph"
MERGE (n4)-[e1:`Type`]->(n2)
  SET  e1.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n4)-[e2:`Credential Subject`]->(n0)
  SET  e2.`definition`="https://www.w3.org/2018/credentials#credentialSubject"
MERGE (n4)-[e3:`Issuer`]->(n1)
  SET  e3.`definition`="https://www.w3.org/2018/credentials#issuer"
RETURN n0,n1,n2,n3,n4
