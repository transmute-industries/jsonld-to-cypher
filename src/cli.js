#!/usr/bin/env node

// const fs = require('fs');
// const path = require('path');
const yargs = require('yargs');
const {hideBin} = require('yargs/helpers');

// const readJsonFromPath = (argv, argName) => {
//   let value;
//   if (argv[argName]) {
//     try {
//       const file = fs
//           .readFileSync(path.resolve(process.cwd(), argv[argName]))
//           .toString();
//       value = JSON.parse(file);
//     } catch (e) {
//       console.error('Cannot read from file: ' + argv[argName]);
//       process.exit(1);
//     }
//   }
//   return value;
// };

yargs(hideBin(process.argv))
    .scriptName('jsonld-to-cypher')
    .command(
        'convert',
        'transform jsonld into cypher query',
        () => {},
        async (argv) => {
          console.log('echo ', JSON.stringify(argv, null, 2));
        },
    )
    .demandCommand(1)
    .parse();
