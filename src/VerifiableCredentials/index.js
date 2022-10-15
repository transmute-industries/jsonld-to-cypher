const base64url = require('base64url');
const Graph = require('../Graph');

const jwsToCypher = (jws) => {
  const [encodedHeader, encodedPayload] = jws.split('.');
  const header = JSON.parse(base64url.decode(encodedHeader));
  const payload = JSON.parse(base64url.decode(encodedPayload));
  let query = `CREATE ( jws:JsonWebSignature { jws: "${jws}" } )\n`;
  const headerProps = Object.entries(header)
      .map(([key, value]) => {
        return `${key}: "${value}"`;
      })
      .join(', ');
  query += `MERGE ( header:Header { ${headerProps} } )\n`;
  const payloadProps = Object.entries(payload)
      .map(([key, value]) => {
        if (typeof value === 'object') {
          return undefined;
        }
        return `${key}: "${value}"`;
      })
      .filter((v) => !!v)
      .join(', ');
  query += `MERGE ( payload:Payload { ${payloadProps} } )\n`;
  query += `CREATE (jws)-[r1: protects ]->(header)\n`;
  query += `CREATE (jws)-[r2: protects ]->(payload)\n`;
  return query;
};

const toCypher = async (jws, {documentLoader}) => {
  let parsed = JSON.parse(Buffer.from(jws.split('.')[1], 'base64').toString());
  // handle support for future proofing VCDM security formats.
  if (parsed.vc) {
    parsed = parsed.vc;
  }
  if (parsed.vp) {
    parsed = parsed.vp;
  }
  const vcIntermediate = await Graph.documentToGraph(parsed, {
    documentLoader,
  });
  const jwsCypher = jwsToCypher(jws);
  const bridge = `CREATE (payload)-[b1: protects ]->(g)\n`;
  const vcCypher = await Graph.graphToCypher(vcIntermediate);
  const lines = vcCypher.split('\n');
  let returnStatement = lines[lines.length - 2];
  returnStatement =
    bridge + returnStatement.replace('RETURN ', `RETURN jws,header,payload,`);

  lines[lines.length - 2] = returnStatement;
  const final = jwsCypher + lines.join('\n');
  return final;
};

module.exports = {toCypher};
