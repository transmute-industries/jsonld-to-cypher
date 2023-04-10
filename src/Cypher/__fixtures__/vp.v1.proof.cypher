MERGE (n0:`URL`{id:"https://api.did.actor/revocation-lists/1.json#0"}) 

MERGE (n1:`Verifiable Credential`{id:"urn:uuid:0000:_:c14n0"}) 
  SET  n1.`http://www.w3.org/1999/02/22-rdf-syntax-ns#type`="https://www.w3.org/2018/credentials#VerifiableCredential"
  SET  n1.`https://w3id.org/vc-revocation-list-2020#revocationListCredential`="https://api.did.actor/revocation-lists/1.json"
  SET  n1.`https://www.w3.org/2018/credentials#credentialStatus`="https://api.did.actor/revocation-lists/1.json#0"
  SET  n1.`https://www.w3.org/2018/credentials#credentialSubject`="did:example:123"
  SET  n1.`https://www.w3.org/2018/credentials#issuanceDate`=datetime("2010-01-01T19:23:24Z")
  SET  n1.`https://www.w3.org/2018/credentials#issuer`="did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn"
MERGE (n2:`URL`:`Type`{id:"https://w3id.org/vc-revocation-list-2020#RevocationList2020Status"}) 

MERGE (n3:`URL`{id:"https://api.did.actor/revocation-lists/1.json"}) 

MERGE (n4:`URL`{id:"http://www.w3.org/2001/XMLSchema#integer"}) 

MERGE (n5:`URN`{id:"urn:uuid:1fe5c199-271b-4598-b2aa-528802efeaeb"}) 

MERGE (n6:`URL`:`Type`{id:"https://www.w3.org/2018/credentials#VerifiablePresentation"}) 

MERGE (n7:`Blank Node`{id:"urn:uuid:0000:_:c14n2"}) 
  SET  n7.`http://purl.org/dc/terms/created`=datetime("2023-04-09T13:56:20Z")
  SET  n7.`http://www.w3.org/1999/02/22-rdf-syntax-ns#type`="https://w3id.org/security#Ed25519Signature2018"
  SET  n7.`https://w3id.org/security#challenge`="76f80bbc-c61c-4776-a2e9-49c239d57d6b"
  SET  n7.`https://w3id.org/security#domain`="example.verifier"
  SET  n7.`https://w3id.org/security#jws`="eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..HHnnJSadPRJ7-mwuuEvRod-h9u9DjVMaqZ23NAjA8YSH-QcyH_EbC1jadFsc_042wDH9f3qGDcW-ncTIarCPBA"
  SET  n7.`https://w3id.org/security#proofPurpose`="https://w3id.org/security#authenticationMethod"
  SET  n7.`https://w3id.org/security#verificationMethod`="did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn#z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn"
MERGE (n8:`DID`:`Holder`:`Issuer`{id:"did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn"}) 

MERGE (n9:`URN`{id:"urn:uuid:4f1eabd0-76b7-4c8b-be72-a125b8bb9c48"}) 

MERGE (n10:`URL`:`Type`{id:"https://www.w3.org/2018/credentials#VerifiableCredential"}) 

MERGE (n11:`Blank Node`{id:"urn:uuid:0000:_:c14n3"}) 
  SET  n11.`http://purl.org/dc/terms/created`=datetime("2022-05-07T15:30:56Z")
  SET  n11.`http://www.w3.org/1999/02/22-rdf-syntax-ns#type`="https://w3id.org/security#Ed25519Signature2018"
  SET  n11.`https://w3id.org/security#jws`="eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..GgO_6jlepqqhXbeSqLCfp4NEnzqi4JTmwNCDQT2hi9TR2nhQ8NhY9CTjssXrsxTSYNPED1MVmCll7Hsj33KYDQ"
  SET  n11.`https://w3id.org/security#proofPurpose`="https://w3id.org/security#assertionMethod"
  SET  n11.`https://w3id.org/security#verificationMethod`="did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn#z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn"
MERGE (n12:`DID`:`Credential Subject`{id:"did:example:123"}) 

MERGE (n13:`URL`{id:"http://www.w3.org/2001/XMLSchema#dateTime"}) 

MERGE (n14:`Blank Node`{id:"urn:uuid:0000:_:c14n1"}) 

MERGE (n15:`URL`:`Type`{id:"https://w3id.org/security#Ed25519Signature2018"}) 

MERGE (n16:`URL`{id:"https://w3id.org/security#authenticationMethod"}) 

MERGE (n17:`DID URL`{id:"did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn#z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn"}) 

MERGE (n18:`Blank Node`{id:"urn:uuid:0000:_:c14n4"}) 

MERGE (n19:`URL`{id:"https://w3id.org/security#assertionMethod"}) 

MERGE (n0)-[e0:`Revocation List 2020 Status`]->(n1)
  SET  e0.`label`="Revocation List 2020 Status"
  SET  e0.`definition`="https://w3id.org/vc-revocation-list-2020#RevocationList2020Status"
MERGE (n0)-[e1:`Type`]->(n2)
  SET  e1.`label`="Type"
  SET  e1.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n1)-[e2:`Revocation List Credential`]->(n3)
  SET  e2.`label`="Revocation List Credential"
  SET  e2.`definition`="https://w3id.org/vc-revocation-list-2020#revocationListCredential"
MERGE (n1)-[e3:`Integer`]->(n4)
  SET  e3.`label`="Integer"
  SET  e3.`definition`="https://w3id.org/vc-revocation-list-2020#revocationListIndex"
MERGE (n5)-[e4:`Type`]->(n6)
  SET  e4.`label`="Type"
  SET  e4.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n5)-[e5:`Proof`]->(n7)
  SET  e5.`label`="Proof"
  SET  e5.`definition`="https://w3id.org/security#proof"
MERGE (n5)-[e6:`Holder`]->(n8)
  SET  e6.`label`="Holder"
  SET  e6.`definition`="https://www.w3.org/2018/credentials#holder"
MERGE (n5)-[e7:`Verifiable Credential`]->(n1)
  SET  e7.`label`="Verifiable Credential"
  SET  e7.`definition`="https://www.w3.org/2018/credentials#verifiableCredential"
MERGE (n9)-[e8:`Verifiable Credential`]->(n1)
  SET  e8.`label`="Verifiable Credential"
  SET  e8.`definition`="https://www.w3.org/2018/credentials#VerifiableCredential"
MERGE (n9)-[e9:`Type`]->(n10)
  SET  e9.`label`="Type"
  SET  e9.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n9)-[e10:`Proof`]->(n11)
  SET  e10.`label`="Proof"
  SET  e10.`definition`="https://w3id.org/security#proof"
MERGE (n1)-[e11:`Credential Status`]->(n0)
  SET  e11.`label`="Credential Status"
  SET  e11.`definition`="https://www.w3.org/2018/credentials#credentialStatus"
MERGE (n1)-[e12:`Credential Subject`]->(n12)
  SET  e12.`label`="Credential Subject"
  SET  e12.`definition`="https://www.w3.org/2018/credentials#credentialSubject"
MERGE (n1)-[e13:`Date Time`]->(n13)
  SET  e13.`label`="Date Time"
  SET  e13.`definition`="https://www.w3.org/2018/credentials#issuanceDate"
MERGE (n1)-[e14:`Issuer`]->(n8)
  SET  e14.`label`="Issuer"
  SET  e14.`definition`="https://www.w3.org/2018/credentials#issuer"
MERGE (n7)-[e15:`Date Time`]->(n13)
  SET  e15.`label`="Date Time"
  SET  e15.`definition`="http://purl.org/dc/terms/created"
MERGE (n14)-[e16:`Ed 25519 Signature 2018`]->(n7)
  SET  e16.`label`="Ed 25519 Signature 2018"
  SET  e16.`definition`="https://w3id.org/security#Ed25519Signature2018"
MERGE (n14)-[e17:`Type`]->(n15)
  SET  e17.`label`="Type"
  SET  e17.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n7)-[e18:`Proof Purpose`]->(n16)
  SET  e18.`label`="Proof Purpose"
  SET  e18.`definition`="https://w3id.org/security#proofPurpose"
MERGE (n7)-[e19:`Verification Method`]->(n17)
  SET  e19.`label`="Verification Method"
  SET  e19.`definition`="https://w3id.org/security#verificationMethod"
MERGE (n11)-[e20:`Date Time`]->(n13)
  SET  e20.`label`="Date Time"
  SET  e20.`definition`="http://purl.org/dc/terms/created"
MERGE (n18)-[e21:`Ed 25519 Signature 2018`]->(n11)
  SET  e21.`label`="Ed 25519 Signature 2018"
  SET  e21.`definition`="https://w3id.org/security#Ed25519Signature2018"
MERGE (n18)-[e22:`Type`]->(n15)
  SET  e22.`label`="Type"
  SET  e22.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n11)-[e23:`Proof Purpose`]->(n19)
  SET  e23.`label`="Proof Purpose"
  SET  e23.`definition`="https://w3id.org/security#proofPurpose"
MERGE (n11)-[e24:`Verification Method`]->(n17)
  SET  e24.`label`="Verification Method"
  SET  e24.`definition`="https://w3id.org/security#verificationMethod"
RETURN n0,n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16,n17,n18,n19
