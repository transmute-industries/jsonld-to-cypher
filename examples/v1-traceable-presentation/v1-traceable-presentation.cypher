MERGE (n0:`Resource`{id:"65587"}) 
MERGE (n1:`DID`:`Holder`{id:"did:web:sender.example"}) 
MERGE (n2:`URL`:`Type`{id:"https://schema.org/Organization"}) 
MERGE (n3:`Blank Node`{id:"urn:example:v1-traceable-presentation:_:c14n1"}) 
MERGE (n4:`URN`{id:"urn:uuid:00000000-8596-4c3a-a978-8fcaba3903c5"}) 
MERGE (n5:`URL`:`Type`{id:"https://w3id.org/traceability#TraceablePresentation"}) 
MERGE (n6:`URL`:`Type`{id:"https://www.w3.org/2018/credentials#VerifiablePresentation"}) 
MERGE (n7:`Blank Node`{id:"urn:example:v1-traceable-presentation:_:c14n2"}) 
MERGE (n8:`Blank Node`{id:"urn:example:v1-traceable-presentation:_:c14n0"}) 
MERGE (n9:`URL`:`Type`{id:"https://schema.org/PostalAddress"}) 
MERGE (n10:`Resource`{id:"Cyprus"}) 
MERGE (n11:`Resource`{id:"O'Connellborough"}) 
MERGE (n12:`Resource`{id:"Missouri"}) 
MERGE (n13:`Resource`{id:"21851 Ima Heights"}) 
MERGE (n14:`Resource`{id:"Ratke - Bergstrom"}) 
MERGE (n15:`URL`:`Type`{id:"https://schema.org/Place"}) 
MERGE (n16:`Blank Node`{id:"urn:example:v1-traceable-presentation:_:c14n3"}) 
MERGE (n17:`URN`{id:"urn:uuid:11111111-cc91-4bb3-91f1-5466a0be084e"}) 
MERGE (n18:`URN`{id:"urn:uuid:22222222-b0b1-41b8-89b0-331ni58b7ee0"}) 
MERGE (n19:`URL`:`Type`{id:"https://schema.org/GeoCoordinates"}) 
MERGE (n20:`Resource`{id:"68.7083"}) 
MERGE (n21:`Resource`{id:"4.6377"}) 
MERGE (n1)-[e0:`Type`]->(n2)
  SET  e0.`label`="Type"
  SET  e0.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n1)-[e1:`Location`]->(n3)
  SET  e1.`label`="Location"
  SET  e1.`definition`="https://schema.org/location"
MERGE (n4)-[e2:`Type`]->(n5)
  SET  e2.`label`="Type"
  SET  e2.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n4)-[e3:`Type`]->(n6)
  SET  e3.`label`="Type"
  SET  e3.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n4)-[e4:`Workflow`]->(n7)
  SET  e4.`label`="Workflow"
  SET  e4.`definition`="https://w3id.org/traceability#Workflow"
MERGE (n4)-[e5:`Holder`]->(n1)
  SET  e5.`label`="Holder"
  SET  e5.`definition`="https://www.w3.org/2018/credentials#holder"
MERGE (n8)-[e6:`Type`]->(n9)
  SET  e6.`label`="Type"
  SET  e6.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n8)-[e7:`Address Country`]->(n10)
  SET  e7.`label`="Address Country"
  SET  e7.`definition`="https://schema.org/addressCountry"
MERGE (n8)-[e8:`Address Locality`]->(n11)
  SET  e8.`label`="Address Locality"
  SET  e8.`definition`="https://schema.org/addressLocality"
MERGE (n8)-[e9:`Address Region`]->(n12)
  SET  e9.`label`="Address Region"
  SET  e9.`definition`="https://schema.org/addressRegion"
MERGE (n8)-[e10:`Postal Code`]->(n0)
  SET  e10.`label`="Postal Code"
  SET  e10.`definition`="https://schema.org/postalCode"
MERGE (n8)-[e11:`Street Address`]->(n13)
  SET  e11.`label`="Street Address"
  SET  e11.`definition`="https://schema.org/streetAddress"
MERGE (n8)-[e12:`Undefined Termorganization Name`]->(n14)
  SET  e12.`label`="Undefined Termorganization Name"
  SET  e12.`definition`="https://w3id.org/traceability/#undefinedTermorganizationName"
MERGE (n3)-[e13:`Type`]->(n15)
  SET  e13.`label`="Type"
  SET  e13.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n3)-[e14:`Geo Coordinates`]->(n16)
  SET  e14.`label`="Geo Coordinates"
  SET  e14.`definition`="https://schema.org/GeoCoordinates"
MERGE (n3)-[e15:`Postal Address`]->(n8)
  SET  e15.`label`="Postal Address"
  SET  e15.`definition`="https://schema.org/PostalAddress"
MERGE (n7)-[e16:`Undefined Termdefinition`]->(n17)
  SET  e16.`label`="Undefined Termdefinition"
  SET  e16.`definition`="https://w3id.org/traceability/#undefinedTermdefinition"
MERGE (n7)-[e17:`Undefined Terminstance`]->(n18)
  SET  e17.`label`="Undefined Terminstance"
  SET  e17.`definition`="https://w3id.org/traceability/#undefinedTerminstance"
MERGE (n16)-[e18:`Type`]->(n19)
  SET  e18.`label`="Type"
  SET  e18.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n16)-[e19:`Latitude`]->(n20)
  SET  e19.`label`="Latitude"
  SET  e19.`definition`="https://schema.org/latitude"
MERGE (n16)-[e20:`Longitude`]->(n21)
  SET  e20.`label`="Longitude"
  SET  e20.`definition`="https://schema.org/longitude"
RETURN n0,n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16,n17,n18,n19,n20,n21
