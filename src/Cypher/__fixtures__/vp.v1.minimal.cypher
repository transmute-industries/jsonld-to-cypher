MERGE (n0:`DID`{id:"did:example:ebfeb1f712ebc6f1c276e12ec21"}) 
MERGE (n1:`URL`{id:"https://example.edu/issuers/565049"}) 
MERGE (n2:`Type`{id:"https://www.w3.org/2018/credentials#VerifiableCredential"}) 
MERGE (n3:`Type`{id:"https://www.w3.org/2018/credentials#VerifiablePresentation"}) 
MERGE (n4:`URN`{id:"urn:uuid:789"}) 
MERGE (n5:`URN`{id:"urn:uuid:789:_:c14n0"}) 
MERGE (n6:`URN`{id:"urn:uuid:789:_:c14n1"}) 
  SET  n6.`https://www.w3.org/2018/credentials#issuanceDate`=datetime("2010-01-01T19:23:24Z")
MERGE (n7:`URN`{id:"urn:uuid:789:_:c14n2"}) 
MERGE (n4)-[e0:`Named Graph`]->(n7)
  SET  e0.`definition`="https://wikipedia.org/wiki/Named_graph"
MERGE (n5)-[e1:`Blank Node`]->(n6)
  SET  e1.`definition`="https://wikipedia.org/wiki/Blank_node"
MERGE (n6)-[e2:`Type`]->(n2)
  SET  e2.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n6)-[e3:`Credential Subject`]->(n0)
  SET  e3.`definition`="https://www.w3.org/2018/credentials#credentialSubject"
MERGE (n6)-[e4:`Issuer`]->(n1)
  SET  e4.`definition`="https://www.w3.org/2018/credentials#issuer"
MERGE (n7)-[e5:`Type`]->(n3)
  SET  e5.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n7)-[e6:`Verifiable Credential`]->(n5)
  SET  e6.`definition`="https://www.w3.org/2018/credentials#verifiableCredential"
RETURN n0,n1,n2,n3,n4,n5,n6,n7
