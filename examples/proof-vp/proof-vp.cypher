MERGE (n0:`URL`{id:"https://api.did.actor/revocation-lists/1.json#0"}) 
MERGE (n1:`Verifiable Credential`{id:"urn:example:proof-vp:_:c14n0"}) 
  SET  n1.`http://www.w3.org/1999/02/22-rdf-syntax-ns#type`="https://www.w3.org/2018/credentials#VerifiableCredential"
  SET  n1.`https://w3id.org/vc-revocation-list-2020#revocationListCredential`="https://api.did.actor/revocation-lists/1.json"
  SET  n1.`https://www.w3.org/2018/credentials#credentialStatus`="https://api.did.actor/revocation-lists/1.json#0"
  SET  n1.`https://www.w3.org/2018/credentials#credentialSubject`="did:example:123"
  SET  n1.`https://www.w3.org/2018/credentials#issuer`="did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn"
MERGE (n2:`URL`:`Type`{id:"https://w3id.org/vc-revocation-list-2020#RevocationList2020Status"}) 
MERGE (n3:`URL`{id:"https://api.did.actor/revocation-lists/1.json"}) 
MERGE (n4:`URN`{id:"urn:uuid:1fe5c199-271b-4598-b2aa-528802efeaeb"}) 
MERGE (n5:`URL`:`Type`{id:"https://www.w3.org/2018/credentials#VerifiablePresentation"}) 
MERGE (n6:`Blank Node`{id:"urn:example:proof-vp:_:c14n2"}) 
  SET  n6.`http://www.w3.org/1999/02/22-rdf-syntax-ns#type`="https://w3id.org/security#Ed25519Signature2018"
  SET  n6.`https://w3id.org/security#challenge`="76f80bbc-c61c-4776-a2e9-49c239d57d6b"
  SET  n6.`https://w3id.org/security#domain`="example.verifier"
  SET  n6.`https://w3id.org/security#jws`="eyJhbGciOiJFZERTQSIsImI2.._EbC1jadFsc_042wDH9f3qGDcW-ncTIarCPBA"
  SET  n6.`https://w3id.org/security#proofPurpose`="https://w3id.org/security#authenticationMethod"
  SET  n6.`https://w3id.org/security#verificationMethod`="did:key:z6MktiSzq..GznpicNiWfn#z6MktiSzqF9..UAGznpicNiWfn"
MERGE (n7:`DID`:`Holder`:`Issuer`{id:"did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn"}) 
MERGE (n8:`URN`{id:"urn:uuid:4f1eabd0-76b7-4c8b-be72-a125b8bb9c48"}) 
  SET  n8.`https://www.w3.org/2018/credentials#issuanceDate`=datetime("2010-01-01T19:23:24Z")
MERGE (n9:`URL`:`Type`{id:"https://www.w3.org/2018/credentials#VerifiableCredential"}) 
MERGE (n10:`Blank Node`{id:"urn:example:proof-vp:_:c14n3"}) 
  SET  n10.`http://www.w3.org/1999/02/22-rdf-syntax-ns#type`="https://w3id.org/security#Ed25519Signature2018"
  SET  n10.`https://w3id.org/security#jws`="eyJhbGciOiJFZE..YNPED1MVmCll7Hsj33KYDQ"
  SET  n10.`https://w3id.org/security#proofPurpose`="https://w3id.org/security#assertionMethod"
  SET  n10.`https://w3id.org/security#verificationMethod`="did:key:z6MktiSzq..GznpicNiWfn#z6MktiSzqF9..UAGznpicNiWfn"
MERGE (n11:`DID`:`Credential Subject`{id:"did:example:123"}) 
MERGE (n12:`Blank Node`{id:"urn:example:proof-vp:_:c14n1"}) 
  SET  n12.`http://purl.org/dc/terms/created`=datetime("2022-05-07T15:30:56Z")
MERGE (n13:`URL`:`Type`{id:"https://w3id.org/security#Ed25519Signature2018"}) 
MERGE (n14:`URL`{id:"https://w3id.org/security#assertionMethod"}) 
MERGE (n15:`DID URL`{id:"did:key:z6MktiSzq..GznpicNiWfn#z6MktiSzqF9..UAGznpicNiWfn"}) 
MERGE (n16:`Blank Node`{id:"urn:example:proof-vp:_:c14n4"}) 
  SET  n16.`http://purl.org/dc/terms/created`=datetime("2023-04-09T13:56:20Z")
MERGE (n17:`URL`{id:"https://w3id.org/security#authenticationMethod"}) 
MERGE (n0)-[e0:`Revocation List 2020 Status`]->(n1)
  SET  e0.`label`="Revocation List 2020 Status"
  SET  e0.`definition`="https://w3id.org/vc-revocation-list-2020#RevocationList2020Status"
MERGE (n0)-[e1:`Type`]->(n2)
  SET  e1.`label`="Type"
  SET  e1.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n1)-[e2:`Revocation List Credential`]->(n3)
  SET  e2.`label`="Revocation List Credential"
  SET  e2.`definition`="https://w3id.org/vc-revocation-list-2020#revocationListCredential"
MERGE (n4)-[e3:`Type`]->(n5)
  SET  e3.`label`="Type"
  SET  e3.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n4)-[e4:`Proof`]->(n6)
  SET  e4.`label`="Proof"
  SET  e4.`definition`="https://w3id.org/security#proof"
MERGE (n4)-[e5:`Holder`]->(n7)
  SET  e5.`label`="Holder"
  SET  e5.`definition`="https://www.w3.org/2018/credentials#holder"
MERGE (n4)-[e6:`Verifiable Credential`]->(n1)
  SET  e6.`label`="Verifiable Credential"
  SET  e6.`definition`="https://www.w3.org/2018/credentials#verifiableCredential"
MERGE (n8)-[e7:`Verifiable Credential`]->(n1)
  SET  e7.`label`="Verifiable Credential"
  SET  e7.`definition`="https://www.w3.org/2018/credentials#VerifiableCredential"
MERGE (n8)-[e8:`Type`]->(n9)
  SET  e8.`label`="Type"
  SET  e8.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n8)-[e9:`Proof`]->(n10)
  SET  e9.`label`="Proof"
  SET  e9.`definition`="https://w3id.org/security#proof"
MERGE (n1)-[e10:`Credential Status`]->(n0)
  SET  e10.`label`="Credential Status"
  SET  e10.`definition`="https://www.w3.org/2018/credentials#credentialStatus"
MERGE (n1)-[e11:`Credential Subject`]->(n11)
  SET  e11.`label`="Credential Subject"
  SET  e11.`definition`="https://www.w3.org/2018/credentials#credentialSubject"
MERGE (n1)-[e12:`Issuer`]->(n7)
  SET  e12.`label`="Issuer"
  SET  e12.`definition`="https://www.w3.org/2018/credentials#issuer"
MERGE (n12)-[e13:`Ed 25519 Signature 2018`]->(n10)
  SET  e13.`label`="Ed 25519 Signature 2018"
  SET  e13.`definition`="https://w3id.org/security#Ed25519Signature2018"
MERGE (n12)-[e14:`Type`]->(n13)
  SET  e14.`label`="Type"
  SET  e14.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n10)-[e15:`Proof Purpose`]->(n14)
  SET  e15.`label`="Proof Purpose"
  SET  e15.`definition`="https://w3id.org/security#proofPurpose"
MERGE (n10)-[e16:`Verification Method`]->(n15)
  SET  e16.`label`="Verification Method"
  SET  e16.`definition`="https://w3id.org/security#verificationMethod"
MERGE (n16)-[e17:`Ed 25519 Signature 2018`]->(n6)
  SET  e17.`label`="Ed 25519 Signature 2018"
  SET  e17.`definition`="https://w3id.org/security#Ed25519Signature2018"
MERGE (n16)-[e18:`Type`]->(n13)
  SET  e18.`label`="Type"
  SET  e18.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n6)-[e19:`Proof Purpose`]->(n17)
  SET  e19.`label`="Proof Purpose"
  SET  e19.`definition`="https://w3id.org/security#proofPurpose"
MERGE (n6)-[e20:`Verification Method`]->(n15)
  SET  e20.`label`="Verification Method"
  SET  e20.`definition`="https://w3id.org/security#verificationMethod"
RETURN n0,n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16,n17
