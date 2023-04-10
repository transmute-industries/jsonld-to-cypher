MERGE (n0:`Blank Node`{id:"urn:example:minimal-vp:_:c14n1"}) 
  SET  n0.`https://www.w3.org/2018/credentials#issuanceDate`=datetime("2010-01-01T19:23:24Z")
MERGE (n1:`Verifiable Credential`{id:"urn:example:minimal-vp:_:c14n0"}) 
  SET  n1.`http://www.w3.org/1999/02/22-rdf-syntax-ns#type`="https://www.w3.org/2018/credentials#VerifiableCredential"
  SET  n1.`https://www.w3.org/2018/credentials#credentialSubject`="did:example:ebfeb1f712ebc6f1c276e12ec21"
  SET  n1.`https://www.w3.org/2018/credentials#issuer`="https://example.edu/issuers/565049"
MERGE (n2:`URL`:`Type`{id:"https://www.w3.org/2018/credentials#VerifiableCredential"}) 
MERGE (n3:`DID`:`Credential Subject`{id:"did:example:ebfeb1f712ebc6f1c276e12ec21"}) 
MERGE (n4:`URL`:`Issuer`{id:"https://example.edu/issuers/565049"}) 
MERGE (n5:`Blank Node`{id:"urn:example:minimal-vp:_:c14n2"}) 
MERGE (n6:`URL`:`Type`{id:"https://www.w3.org/2018/credentials#VerifiablePresentation"}) 
MERGE (n0)-[e0:`Verifiable Credential`]->(n1)
  SET  e0.`label`="Verifiable Credential"
  SET  e0.`definition`="https://www.w3.org/2018/credentials#VerifiableCredential"
MERGE (n0)-[e1:`Type`]->(n2)
  SET  e1.`label`="Type"
  SET  e1.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n1)-[e2:`Credential Subject`]->(n3)
  SET  e2.`label`="Credential Subject"
  SET  e2.`definition`="https://www.w3.org/2018/credentials#credentialSubject"
MERGE (n1)-[e3:`Issuer`]->(n4)
  SET  e3.`label`="Issuer"
  SET  e3.`definition`="https://www.w3.org/2018/credentials#issuer"
MERGE (n5)-[e4:`Type`]->(n6)
  SET  e4.`label`="Type"
  SET  e4.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n5)-[e5:`Verifiable Credential`]->(n1)
  SET  e5.`label`="Verifiable Credential"
  SET  e5.`definition`="https://www.w3.org/2018/credentials#verifiableCredential"
RETURN n0,n1,n2,n3,n4,n5,n6
