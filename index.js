#!/usr/bin/env node
'use strict';

const program     = require('commander'),
      pkg         = require('./package.json'),
      Woofer      = require('./src/Woofer'),
      Help        = require('./src/Help'),
      Zipper      = require('./src/Zipper');

program
    .version(pkg.version)
    .usage('nwoof <file>')
    .description(Help.message())
    .option('-p, --port <port>', 'choose a custom port', 1337)
    .action( file => {
        new Woofer(file, program.port);
    });

if ( ! process.argv.slice(2).length ) {
    program.outputHelp();
}

program.parse(process.argv);