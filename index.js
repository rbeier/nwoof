#!/usr/bin/env node
'use strict';

const program = require('commander');
const Woofer  = require('./src/Woofer');

program
    .version('0.0.1')
    .usage('nwoof <file>')
    .description(Woofer.showDescription())
    .option('-p, --port <port>', 'choose a custom port', 1337)
    .action( file => {

        new Woofer(file, program.port);

    });


if ( ! process.argv.slice(2).length ) {
    program.outputHelp();
}

program.parse(process.argv);