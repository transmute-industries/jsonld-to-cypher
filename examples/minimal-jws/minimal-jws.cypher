MERGE (n0:`Blank Node`{id:"urn:example:minimal-jws:_:c14n0"}) 
MERGE (n1:`Resource`{id:"🙋‍♀️"}) 
MERGE (n2:`Blank Node`{id:"urn:example:minimal-jws:_:c14n1"}) 
MERGE (n3:`Resource`{id:"ES256"}) 
MERGE (n4:`Blank Node`{id:"urn:example:minimal-jws:_:c14n2"}) 
  SET  n4.`https://voc.example/boolean`=true
  SET  n4.`https://voc.example/number`=42.5
MERGE (n5:`URL`{id:"http://www.w3.org/2001/XMLSchema#boolean"}) 
MERGE (n6:`URL`{id:"http://www.w3.org/2001/XMLSchema#double"}) 
MERGE (n7:`Resource`{id:"It’s a dangerous business, Frodo, going out your door."}) 
MERGE (n8:`Blank Node`{id:"urn:example:minimal-jws:_:c14n3"}) 
MERGE (n0)-[e0:`Foo`]->(n1)
  SET  e0.`label`="Foo"
  SET  e0.`definition`="https://voc.example/foo"
MERGE (n2)-[e1:`Alg`]->(n3)
  SET  e1.`label`="Alg"
  SET  e1.`definition`="https://voc.example/alg"
MERGE (n4)-[e2:`Boolean`]->(n5)
  SET  e2.`label`="Boolean"
  SET  e2.`definition`="https://voc.example/boolean"
MERGE (n4)-[e3:`Double`]->(n6)
  SET  e3.`label`="Double"
  SET  e3.`definition`="https://voc.example/number"
MERGE (n4)-[e4:`Object`]->(n0)
  SET  e4.`label`="Object"
  SET  e4.`definition`="https://voc.example/object"
MERGE (n4)-[e5:`String`]->(n7)
  SET  e5.`label`="String"
  SET  e5.`definition`="https://voc.example/string"
MERGE (n8)-[e6:`Protected Claim Set`]->(n4)
  SET  e6.`label`="Protected Claim Set"
  SET  e6.`definition`="https://voc.example/protectedClaimSet"
MERGE (n8)-[e7:`Protected Header`]->(n2)
  SET  e7.`label`="Protected Header"
  SET  e7.`definition`="https://voc.example/protectedHeader"
RETURN n0,n1,n2,n3,n4,n5,n6,n7,n8
