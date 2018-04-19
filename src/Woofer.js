'use strict';

const File = require('./File'),
      http = require('http'),
      ip   = require('ip');

class Woofer {

    constructor(file, port) {

        this.port = port;
        this.file = new File(file);

        this.checkPort();
        this.createServer();
        this.printDownloadUrl();

    }

    checkPort() {
        if( parseInt(this.port) != this.port ) {
            console.error("Port must be a Number!");
            process.exit();
        }
    }

    createServer() {

        http.createServer(async (request, response) => {

            this.setHeader(response);

            await this.file.createFileStream().pipe(response);

            this.logRequests(request);

        }).listen(this.port);

    }

    setHeader(response) {
        response.setHeader('content-disposition', 'attachment; filename='+ this.file.getFileName());
        response.setHeader('content-Type', 'application/octet-stream');
        response.setHeader('content-Length', this.file.getFilesize());
    }

    logRequests(request) {

        try {

            let address = request.connection.remoteAddress.split(':').slice(-1).toString();

            console.log( 'Serving request from: ' + address );

        } catch(e) { }

    }

    printDownloadUrl() {

        let downloadUrl = 'http://' + ip.address() + ':' + this.port + '/';

        console.log("\nServer running at " + downloadUrl + "\n");

    }

}

module.exports = Woofer;