'use strict';

const http = require('http'),
      fs   = require('fs'),
      ip   = require('ip'),
      FileHandler = require('./FileHandler'),
      mime = require('mime-types');

class Woofer {

    constructor(file, port) {

        this.port        = port;
        this.fileHandler = new FileHandler(file);

        this.checkPort();
        this.createServer();

    }

    checkPort() {

        if( parseInt(this.port) != this.port ) {

            console.error("Port must be a Number!");
            process.exit();

        }

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

        this.printDownloadUrl();

    }

    setHeader(response) {

        fs.statSync(this.fileHandler.getFilepath(), (error, stat) => {

            response.setHeader('Content-disposition', 'attachment; filename='+ this.fileHandler.getFileName());
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

        } catch(e) { }

    }

    printDownloadUrl() {

        let downloadUrl = 'http://' + ip.address() + ':' + this.port + '/';

        console.log("\nServer running at " + downloadUrl + "\n");

    }

}

module.exports = Woofer;