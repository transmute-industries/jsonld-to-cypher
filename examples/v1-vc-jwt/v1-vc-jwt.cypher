MERGE (n0:`URN`{id:"urn:uuid:0be1de75-61b9-42c7-949e-fc97096848dd"}) 
  SET  n0.`https://www.w3.org/2018/credentials#issuanceDate`=datetime("2010-01-01T19:23:24Z")
MERGE (n1:`URL`:`Type`{id:"https://www.w3.org/2018/credentials#VerifiableCredential"}) 
MERGE (n2:`Credential Subject`{id:"urn:example:v1-vc-jwt:_:c14n5"}) 
MERGE (n3:`URL`{id:"http://www.w3.org/2001/XMLSchema#dateTime"}) 
MERGE (n4:`DID`:`Issuer`{id:"did:key:zQ3shrnCZq3R7vLvDeWQFnxz5HMKqP9JoiMonzYJB4TGYnftL"}) 
MERGE (n5:`Blank Node`{id:"urn:example:v1-vc-jwt:_:c14n0"}) 
  SET  n5.`https://voc.example/price`=99.99
MERGE (n6:`URL`{id:"http://www.w3.org/2001/XMLSchema#boolean"}) 
MERGE (n7:`URL`{id:"http://www.w3.org/2001/XMLSchema#double"}) 
MERGE (n8:`Resource`{id:"EUR"}) 
MERGE (n9:`Resource`:`Type`{id:"Offer"}) 
MERGE (n10:`Blank Node`{id:"urn:example:v1-vc-jwt:_:c14n1"}) 
MERGE (n11:`URL`:`Type`{id:"https://schema.org/GeoCoordinates"}) 
MERGE (n12:`Resource`{id:"40.75"}) 
MERGE (n13:`Resource`{id:"-73.98"}) 
MERGE (n14:`Blank Node`{id:"urn:example:v1-vc-jwt:_:c14n10"}) 
MERGE (n15:`Blank Node`{id:"urn:example:v1-vc-jwt:_:c14n9"}) 
  SET  n15.`https://voc.example/price`=100
MERGE (n16:`Resource`:`Type`{id:"Product"}) 
MERGE (n17:`Blank Node`{id:"urn:example:v1-vc-jwt:_:c14n11"}) 
MERGE (n18:`Blank Node`{id:"urn:example:v1-vc-jwt:_:c14n13"}) 
  SET  n18.`https://voc.example/nbf`=1262373804
MERGE (n19:`Blank Node`{id:"urn:example:v1-vc-jwt:_:c14n4"}) 
MERGE (n20:`Blank Node`{id:"urn:example:v1-vc-jwt:_:c14n12"}) 
MERGE (n21:`URL`:`Type`{id:"https://schema.org/Place"}) 
MERGE (n22:`Resource`{id:"Empire State Building"}) 
MERGE (n23:`URL`{id:"http://www.w3.org/2001/XMLSchema#integer"}) 
MERGE (n24:`Blank Node`{id:"urn:example:v1-vc-jwt:_:c14n14"}) 
  SET  n24.`https://schema.org/price`=99.99
MERGE (n25:`URL`:`Type`{id:"https://schema.org/Offer"}) 
MERGE (n26:`Blank Node`{id:"urn:example:v1-vc-jwt:_:c14n2"}) 
MERGE (n27:`URL`:`Type`{id:"https://voc.example/GeoCoordinates"}) 
MERGE (n28:`Blank Node`{id:"urn:example:v1-vc-jwt:_:c14n3"}) 
MERGE (n29:`URL`:`Type`{id:"https://voc.example/Place"}) 
MERGE (n30:`Resource`{id:"ES256K"}) 
MERGE (n31:`DID URL`{id:"did:key:zQ3shrnCZq3R7vLvDeWQFnxz5HMKqP9JoiMonzYJB4TGYnftL#zQ3shrnCZq3R7vLvDeWQFnxz5HMKqP9JoiMonzYJB4TGYnftL"}) 
MERGE (n32:`URL`:`Type`{id:"https://schema.org/Product"}) 
MERGE (n33:`Blank Node`{id:"urn:example:v1-vc-jwt:_:c14n6"}) 
  SET  n33.`https://schema.org/price`=100
MERGE (n34:`Resource`{id:"2022-10-08T18:52:38.220Z"}) 
MERGE (n35:`Blank Node`{id:"urn:example:v1-vc-jwt:_:c14n8"}) 
MERGE (n36:`Resource`{id:"USD"}) 
MERGE (n37:`Blank Node`{id:"urn:example:v1-vc-jwt:_:c14n7"}) 
MERGE (n38:`URL`:`Type`{id:"https://voc.example/Organization"}) 
MERGE (n39:`URL`:`Type`{id:"https://schema.org/Organization"}) 
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
MERGE (n5)-[e4:`Boolean`]->(n6)
  SET  e4.`label`="Boolean"
  SET  e4.`definition`="https://voc.example/isFamilyFriendly"
MERGE (n5)-[e5:`Double`]->(n7)
  SET  e5.`label`="Double"
  SET  e5.`definition`="https://voc.example/price"
MERGE (n5)-[e6:`Price Currency`]->(n8)
  SET  e6.`label`="Price Currency"
  SET  e6.`definition`="https://voc.example/priceCurrency"
MERGE (n5)-[e7:`Type`]->(n9)
  SET  e7.`label`="Type"
  SET  e7.`definition`="https://voc.example/type"
MERGE (n10)-[e8:`Type`]->(n11)
  SET  e8.`label`="Type"
  SET  e8.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n10)-[e9:`Latitude`]->(n12)
  SET  e9.`label`="Latitude"
  SET  e9.`definition`="https://schema.org/latitude"
MERGE (n10)-[e10:`Longitude`]->(n13)
  SET  e10.`label`="Longitude"
  SET  e10.`definition`="https://schema.org/longitude"
MERGE (n14)-[e11:`Offers`]->(n5)
  SET  e11.`label`="Offers"
  SET  e11.`definition`="https://voc.example/offers"
MERGE (n14)-[e12:`Offers`]->(n15)
  SET  e12.`label`="Offers"
  SET  e12.`definition`="https://voc.example/offers"
MERGE (n14)-[e13:`Type`]->(n16)
  SET  e13.`label`="Type"
  SET  e13.`definition`="https://voc.example/type"
MERGE (n17)-[e14:`Protected Claim Set`]->(n18)
  SET  e14.`label`="Protected Claim Set"
  SET  e14.`definition`="https://voc.example/protectedClaimSet"
MERGE (n17)-[e15:`Protected Header`]->(n19)
  SET  e15.`label`="Protected Header"
  SET  e15.`definition`="https://voc.example/protectedHeader"
MERGE (n20)-[e16:`Type`]->(n21)
  SET  e16.`label`="Type"
  SET  e16.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n20)-[e17:`Geo`]->(n10)
  SET  e17.`label`="Geo"
  SET  e17.`definition`="https://schema.org/geo"
MERGE (n20)-[e18:`Name`]->(n22)
  SET  e18.`label`="Name"
  SET  e18.`definition`="https://schema.org/name"
MERGE (n18)-[e19:`Iss`]->(n4)
  SET  e19.`label`="Iss"
  SET  e19.`definition`="https://voc.example/iss"
MERGE (n18)-[e20:`Jti`]->(n0)
  SET  e20.`label`="Jti"
  SET  e20.`definition`="https://voc.example/jti"
MERGE (n18)-[e21:`Integer`]->(n23)
  SET  e21.`label`="Integer"
  SET  e21.`definition`="https://voc.example/nbf"
MERGE (n18)-[e22:`Sub`]->(n14)
  SET  e22.`label`="Sub"
  SET  e22.`definition`="https://voc.example/sub"
MERGE (n18)-[e23:`Vc`]->(n0)
  SET  e23.`label`="Vc"
  SET  e23.`definition`="https://voc.example/vc"
MERGE (n24)-[e24:`Type`]->(n25)
  SET  e24.`label`="Type"
  SET  e24.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n24)-[e25:`Boolean`]->(n6)
  SET  e25.`label`="Boolean"
  SET  e25.`definition`="https://schema.org/isFamilyFriendly"
MERGE (n24)-[e26:`Double`]->(n7)
  SET  e26.`label`="Double"
  SET  e26.`definition`="https://schema.org/price"
MERGE (n24)-[e27:`Price Currency`]->(n8)
  SET  e27.`label`="Price Currency"
  SET  e27.`definition`="https://schema.org/priceCurrency"
MERGE (n26)-[e28:`Type`]->(n27)
  SET  e28.`label`="Type"
  SET  e28.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n26)-[e29:`Latitude`]->(n12)
  SET  e29.`label`="Latitude"
  SET  e29.`definition`="https://voc.example/latitude"
MERGE (n26)-[e30:`Longitude`]->(n13)
  SET  e30.`label`="Longitude"
  SET  e30.`definition`="https://voc.example/longitude"
MERGE (n28)-[e31:`Type`]->(n29)
  SET  e31.`label`="Type"
  SET  e31.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n28)-[e32:`Geo`]->(n26)
  SET  e32.`label`="Geo"
  SET  e32.`definition`="https://voc.example/geo"
MERGE (n28)-[e33:`Name`]->(n22)
  SET  e33.`label`="Name"
  SET  e33.`definition`="https://voc.example/name"
MERGE (n19)-[e34:`Alg`]->(n30)
  SET  e34.`label`="Alg"
  SET  e34.`definition`="https://voc.example/alg"
MERGE (n19)-[e35:`Kid`]->(n31)
  SET  e35.`label`="Kid"
  SET  e35.`definition`="https://voc.example/kid"
MERGE (n2)-[e36:`Type`]->(n32)
  SET  e36.`label`="Type"
  SET  e36.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n2)-[e37:`Offers`]->(n24)
  SET  e37.`label`="Offers"
  SET  e37.`definition`="https://schema.org/offers"
MERGE (n2)-[e38:`Offers`]->(n33)
  SET  e38.`label`="Offers"
  SET  e38.`definition`="https://schema.org/offers"
MERGE (n33)-[e39:`Type`]->(n25)
  SET  e39.`label`="Type"
  SET  e39.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n33)-[e40:`Availability Ends`]->(n34)
  SET  e40.`label`="Availability Ends"
  SET  e40.`definition`="https://schema.org/availabilityEnds"
MERGE (n33)-[e41:`Offered By`]->(n35)
  SET  e41.`label`="Offered By"
  SET  e41.`definition`="https://schema.org/offeredBy"
MERGE (n33)-[e42:`Integer`]->(n23)
  SET  e42.`label`="Integer"
  SET  e42.`definition`="https://schema.org/price"
MERGE (n33)-[e43:`Price Currency`]->(n36)
  SET  e43.`label`="Price Currency"
  SET  e43.`definition`="https://schema.org/priceCurrency"
MERGE (n37)-[e44:`Type`]->(n38)
  SET  e44.`label`="Type"
  SET  e44.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n37)-[e45:`Founding Location`]->(n28)
  SET  e45.`label`="Founding Location"
  SET  e45.`definition`="https://voc.example/foundingLocation"
MERGE (n35)-[e46:`Type`]->(n39)
  SET  e46.`label`="Type"
  SET  e46.`definition`="http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
MERGE (n35)-[e47:`Founding Location`]->(n20)
  SET  e47.`label`="Founding Location"
  SET  e47.`definition`="https://schema.org/foundingLocation"
MERGE (n15)-[e48:`Availability Ends`]->(n34)
  SET  e48.`label`="Availability Ends"
  SET  e48.`definition`="https://voc.example/availabilityEnds"
MERGE (n15)-[e49:`Offered By`]->(n37)
  SET  e49.`label`="Offered By"
  SET  e49.`definition`="https://voc.example/offeredBy"
MERGE (n15)-[e50:`Integer`]->(n23)
  SET  e50.`label`="Integer"
  SET  e50.`definition`="https://voc.example/price"
MERGE (n15)-[e51:`Price Currency`]->(n36)
  SET  e51.`label`="Price Currency"
  SET  e51.`definition`="https://voc.example/priceCurrency"
MERGE (n15)-[e52:`Type`]->(n9)
  SET  e52.`label`="Type"
  SET  e52.`definition`="https://voc.example/type"
RETURN n0,n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16,n17,n18,n19,n20,n21,n22,n23,n24,n25,n26,n27,n28,n29,n30,n31,n32,n33,n34,n35,n36,n37,n38,n39
