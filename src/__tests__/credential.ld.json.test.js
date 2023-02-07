const neo4j = require('neo4j-driver');

const {Cypher} = require('..');
const fixtures = require('../__fixtures__');

jest.setTimeout(10 * 1000);

const dropTables = `
MATCH (n)
DETACH DELETE n
`;

// const fullTableScan = `
// MATCH (n)
// RETURN n
// `;

it('application/credential+ld+json', async () => {
  const driver = neo4j.driver(
      process.env.NEO4J_URI,
      neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD),
  );
  const session = driver.session();
  await session.run(dropTables);
  const query = await Cypher.fromDocument({
    "type": [
      "VerifiableCredential",
      "CTPATCertificate"
    ],
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://w3id.org/traceability/v1",
      "https://w3id.org/vc/status-list/2021/v1"
    ],
    "id": "did:key:z6LSpdSReUHCjYcQb1243aF1vS7sd9ArK585Mm4ktARQxatd",
    "name": "CTPAT Certificate",
    "description": "In recognition of your commitment to partnership, and in appreciation for joining with us to secure the international supply chain and protect our country's security, the U.S. Customs Service is pleased to certify your membership in the Customs - Trade Partnership Against Terrorism.",
    "issuer": {
      "type": [
        "Organization"
      ],
      "id": "did:key:z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U",
      "name": "CTPAT"
    },
    "issuanceDate": "2022-01-13T09:16:46Z",
    "expirationDate": "2122-01-13T09:16:46Z",
    "credentialSubject": {
      "type": [
        "CTPAT"
      ],
      "ctpatMember": {
        "type": [
          "Organization"
        ],
        "id": "did:key:z6MkhfZ7sNYEJ8vFSpwJaeyN7zNUaTxS4TBxW3y6R9ZKRaQ4",
        "name": "Trans-Atlantic Shipping Co. Ltd.",
        "location": {
          "type": [
            "Place"
          ],
          "address": {
            "type": [
              "PostalAddress"
            ],
            "name": "Trans-Atlantic Shipping Co. Ltd.",
            "streetAddress": "82 Whitchurch Road",
            "addressLocality": "Elsworth",
            "postalCode": "CB3 8NW",
            "addressCountry": "UK"
          }
        }
      },
      "sviNumber": "57118961",
      "ctpatAccountNumber": "12008",
      "tradeSector": "Sea Carrier",
      "dateOfLastValidation": "2022-01-06T11:50:00Z",
      "issuingCountry": "US"
    },
    "credentialStatus": {
      "id": "https://api.did.actor/revocation-lists/1.json#0",
      "type": "RevocationList2020Status",
      "revocationListIndex": 0,
      "revocationListCredential": "https://api.did.actor/revocation-lists/1.json"
    },
    "proof": {
      "type": "Ed25519Signature2018",
      "created": "2022-11-22T17:31:32Z",
      "verificationMethod": "did:key:z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U#z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U",
      "proofPurpose": "assertionMethod",
      "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..kSgKBKawfsh3qCPoTWfEyNhjJK4-LQEdyyL0zI9bdq7Hrbds1lPIkG8OWsCTTR-rYcXzLnTZkYTYbTnH5L-rCQ"
    }
  });
  console.log(query);
  await session.run(query, {
    // No params => injection vulnerable...
    // nameParam: 'Alice',
  });
  await session.close();
  await driver.close();
});

afterAll((done) => {
  setTimeout(done, 0);
});
