'use strict';

const http = require('http'),
      fs   = require('fs'),
      path = require('path'),
      ip   = require('ip'),
      mime = require('mime-types');

class Woofer {

    constructor(file, port) {

        this.file = file;
        this.port = port;

        this.checkIfPortIsInteger();

        this.resolveFile();

        this.createServer();

    }

    checkIfPortIsInteger() {

        if( parseInt(this.port) != this.port ) {
            console.error("Port must be a Number!");
            process.exit();
        }

    }

    resolveFile() {

        this.filepath = path.resolve(this.file);

        this.filename = path.basename(this.filepath);

        this.checkIfFileExists();

    }

    checkIfFileExists() {

        fs.access(this.filepath, (err) => {
            if (err) {
                console.error('No such file');
                process.exit();
            }
        });

    }

    createServer() {

        http.createServer((request, response) => {

            this.setHeader(response);

            this.pipeStreamToResponse(response);

            this.logDownloads(request);

        }).listen(this.port);

        this.showServerStatus();

    }

    setHeader(response) {

        fs.statSync(this.filepath, (error, stat) => {

            response.setHeader('Content-disposition', 'attachment; filename='+ this.filename);
            response.setHeader('Content-Type', mime.lookup(this.filepath))
            response.setHeader('Content-Length', stat.size)

        });

    }

    pipeStreamToResponse(response) {

        let stream = fs.createReadStream(this.filepath);

        stream.pipe(response);

    }

    logDownloads(request) {

        try {

            let ip = request.connection.remoteAddress.split(':').slice(-1).toString();

            console.log( 'Serving request from: ' + ip );

        } catch(e) {

            console.log('unknown IP address');

        }

    }

    showServerStatus() {

        let downloadUrl = 'http://' + ip.address() + ':' + this.port + '/';

        console.log("\nServer running at " + downloadUrl + "\n");

    }

    static showDescription() {

        if( this.descriptionWanted() ) {

            console.log('                                 __');
            console.log('                                / _|');
            console.log('       _ ____      _____   ___ | |_');
            console.log('      | \'_ \\ \\ /\\ / / _ \\ / _ \\|  _|');
            console.log('      | | | \\ V  V / (_) | (_) | |');
            console.log('      |_| |_|\\_/\\_/ \\___/ \\___/|_|');

            console.log('\n----------------------------------------------\n')

            console.log('  nwoof creates a small and simple webserver');
            console.log('  that can be used to share files or folders');
            console.log('  easily with people on the same network.');

        }

    }

    static descriptionWanted() {

        let params = process.argv.slice(2);

        return params.length == 0 || params.includes('--help', '-h') || params.includes('-h');

    }

}

module.exports = Woofer;