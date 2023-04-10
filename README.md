# JSON-LD to Cypher

Compile JSON-LD (Decentralized Identifiers and Verifiable Credentials) to Cypher.

[![CI](https://github.com/transmute-industries/jsonld-to-cypher/actions/workflows/ci.yml/badge.svg)](https://github.com/transmute-industries/jsonld-to-cypher/actions/workflows/ci.yml)
![Branches](./badges/coverage-branches.svg)
![Functions](./badges/coverage-functions.svg)
![Lines](./badges/coverage-lines.svg)
![Statements](./badges/coverage-statements.svg)
![Jest coverage](./badges/coverage-jest%20coverage.svg)
[![NPM](https://nodei.co/npm/@transmute/jsonld-to-cypher.png?mini=true)](https://npmjs.org/package/@transmute/jsonld-to-cypher)

<img src="./transmute-banner.png" />

#### [Questions? Contact Transmute](https://transmute.typeform.com/to/RshfIw?typeform-source=jsonld-to-cypher)

#### 🚧 Warning Experimental 🔥

<img src="./example.png" />

## Usage

### Command Line

```
npm i -g @transmute/jsonld-to-cypher@latest
```

```
jsonld-to-cypher convert ./examples/minimal-vc/minimal-vc.json
jsonld-to-cypher convert ./examples/v1-vc-jwt/v1-vc-jwt.jwt -- --type jwt
```

### Library

```
npm i @transmute/jsonld-to-cypher@latest --save
```

#### Transforming Verifiable Credentials

See [minimal-vc](./examples/minimal-vc/).

```js
const { cypher, graph } = await Cypher.fromDocument({
  '@context': ['https://www.w3.org/2018/credentials/v1'],
  type: ['VerifiableCredential'],
  issuer: 'https://example.edu/issuers/565049',
  issuanceDate: '2010-01-01T19:23:24Z',
  credentialSubject: {
    id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
  },
})
```

### Action

```yml
name: Demo
on: [workflow_dispatch]
jobs:
  merge:
    runs-on: ubuntu-latest
    name: Merge
    steps:
      - name: Merge Query from Document
        uses: transmute-industries/jsonld-to-cypher@v0.2.1
        id: merge
        with:
          neo4j-uri: ${{ secrets.NEO4J_URI }}
          neo4j-user: ${{ secrets.NEO4J_USERNAME }}
          neo4j-password: ${{ secrets.NEO4J_PASSWORD }}
          operation: merge
          document: |
            {
              "@context": ["https://www.w3.org/2018/credentials/v1"],
              "type": ["VerifiableCredential"],
              "issuer": "https://example.edu/issuers/565049",
              "issuanceDate": "2010-01-01T19:23:24Z",
              "credentialSubject": {
                "id": "did:example:ebfeb1f712ebc6f1c276e12ec21"
              }
            }
```

### Development

```
npm i
npm t
```

#### Testing CLI

```
npm run jsonld-to-cypher convert ./examples/minimal-vc/minimal-vc.json

jq -r '.jws' ./examples/v1-vc-jwt/v1-vc-jwt.json > ./examples/v1-vc-jwt/v1-vc-jwt.jwt

npm run jsonld-to-cypher convert ./examples/v1-vc-jwt/v1-vc-jwt.jwt -- --type jwt
```

#### Testing GitHub Action with Act

```
act -j neo4j-merge-documents-local --secret-file .env
```

### Installing Neo4j Desktop

See [https://neo4j.com](https://neo4j.com/).
