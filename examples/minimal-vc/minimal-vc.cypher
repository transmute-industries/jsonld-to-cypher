MERGE (n0:`Blank Node`{id:"urn:example:minimal-vc:_:c14n0"}) 
  SET  n0.`https://www.w3.org/2018/credentials#issuanceDate`=datetime("2010-01-01T19:23:24Z")
MERGE (n1:`URL`:`Type`{id:"https://www.w3.org/2018/credentials#VerifiableCredential"}) 
MERGE (n2:`DID`:`Credential Subject`{id:"did:example:ebfeb1f712ebc6f1c276e12ec21"}) 
MERGE (n3:`URL`{id:"http://www.w3.org/2001/XMLSchema#dateTime"}) 
MERGE (n4:`URL`:`Issuer`{id:"https://example.edu/issuers/565049"}) 
MERGE (n0)-[e0:`Type`]->(n1)
  SET  e0.`label`="Type"
  SET  e0.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n0)-[e1:`Credential Subject`]->(n2)
  SET  e1.`label`="Credential Subject"
  SET  e1.`definition`="https://www.w3.org/2018/credentials#credentialSubject"
MERGE (n0)-[e2:`Date Time`]->(n3)
  SET  e2.`label`="Date Time"
  SET  e2.`definition`="https://www.w3.org/2018/credentials#issuanceDate"
MERGE (n0)-[e3:`Issuer`]->(n4)
  SET  e3.`label`="Issuer"
  SET  e3.`definition`="https://www.w3.org/2018/credentials#issuer"
RETURN n0,n1,n2,n3,n4
