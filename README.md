# JSON-LD to Cypher

<img src="./transmute-banner.png" />

#### [Questions? Contact Transmute](https://transmute.typeform.com/to/RshfIw?typeform-source=did-eqt)

#### 🚧 Warning Experimental 🔥

## Usage

```
npm i -g @transmute/jsonld-to-cypher@latest
```

```
jsonld-to-cypher convert ./docs/vc.jwt  --type jwt
```

### Testing Library

```
npm t
```

### Testing CLI

#### Convert a JSON File

```
npm run --silent jsonld-to-cypher convert ./docs/advanced-types.json --  --type json > ./docs/advanced-types.cypher
```

#### Convert a VC-JWT

```
npm run --silent jsonld-to-cypher convert ./docs/vc.jwt --  --type jwt > ./docs/vc.jwt.cypher
```

#### Convert a Data Integrity Proof

```
npm run --silent jsonld-to-cypher convert ./docs/example-vc-ld-proof.json --  --type json > ./docs/example-vc-ld-proof.cypher
```

### Installing Neo4j Desktop

See [https://neo4j.com](https://neo4j.com/).
