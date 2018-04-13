#!/usr/bin/env node
'use strict';

const program     = require('commander'),
      Woofer      = require('./src/Woofer'),
      HelpMessage = require('./src/HelpMessage');

program
    .version('0.0.5')
    .usage('nwoof <file>')
    .description(new HelpMessage)
    .option('-p, --port <port>', 'choose a custom port', 1337)
    .action( file => {
        new Woofer(file, program.port);
    });

if ( ! process.argv.slice(2).length ) {
    program.outputHelp();
}

program.parse(process.argv);