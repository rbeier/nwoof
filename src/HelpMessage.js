'use strict';

class HelpMessage {

    constructor() {

        let params = process.argv.slice(2);

        if( params.length == 0 || params.includes('--help') || params.includes('-h') ) {
            this.outputLogo();
            this.outputDescription();
        }

    }

    outputLogo() {
        console.log('                                 __');
        console.log('                                / _|');
        console.log('       _ ____      _____   ___ | |_');
        console.log('      | \'_ \\ \\ /\\ / / _ \\ / _ \\|  _|');
        console.log('      | | | \\ V  V / (_) | (_) | |');
        console.log('      |_| |_|\\_/\\_/ \\___/ \\___/|_|');
        console.log('\n----------------------------------------------\n');
    }

    outputDescription() {
        console.log('  nwoof creates a small and simple webserver');
        console.log('  that can be used to share files or folders');
        console.log('  easily with people on the same network.');
    }

}

module.exports = HelpMessage;