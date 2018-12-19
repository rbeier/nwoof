'use strict';

class Help {

    static message() {

        let params = process.argv.slice(2);

        if( params.length == 0 || params.includes('--help') || params.includes('-h') ) {
            Help.outputLogo();
            Help.outputDescription();
        }

    }

    static outputLogo() {
        console.log('                                 __');
        console.log('                                / _|');
        console.log('       _ ____      _____   ___ | |_');
        console.log('      | \'_ \\ \\ /\\ / / _ \\ / _ \\|  _|');
        console.log('      | | | \\ V  V / (_) | (_) | |');
        console.log('      |_| |_|\\_/\\_/ \\___/ \\___/|_|');
        console.log('\n----------------------------------------------\n');
    }

    static outputDescription() {
        console.log('  nwoof creates a small and simple webserver');
        console.log('  that can be used to share files or folders');
        console.log('  easily with people on the same network.\n');
    }

}

module.exports = Help;