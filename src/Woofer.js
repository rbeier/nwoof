'use strict';

const http = require('http'),
      fs   = require('fs'),
      path = require('path'),
      ip   = require('ip');

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
            console.log("Port must be a Number!");
            process.exit();
        }

    }

    resolveFile() {

        this.filepath = path.resolve(this.file);

        this.filename = path.basename(this.filepath);

    }

    createServer() {

        http.createServer((request, response) => {

            this.serveFile(response);

            this.logDownloads(request);

        }).listen(this.port);

        this.showServerStatus();

    }

    serveFile(response) {

        fs.readFile(this.filepath, (error, content) => {

            console.log(error);

            if (error) {
                response.writeHead(400, {'Content-type':'text/html'})
                response.end("No such file or directory");
            } else {
                response.setHeader('Content-disposition', 'attachment; filename='+ this.filename);
                response.end(content);
            }

        });

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