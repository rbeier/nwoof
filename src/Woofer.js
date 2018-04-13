'use strict';

const http = require('http'),
      fs   = require('fs'),
      ip   = require('ip'),
      FileHandler = require('./FileHandler');

class Woofer {

    constructor(file, port) {

        this.port        = port;
        this.fileHandler = new FileHandler(file);

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

        http.createServer((request, response) => {

            this.setHeader(response);

            this.fileHandler.createFileStream.pipe(response)

            this.logRequests(request);

        }).listen(this.port);

    }

    setHeader(response) {
        response.setHeader('content-disposition', 'attachment; filename='+ this.fileHandler.getFileName());
        response.setHeader('content-Type', 'application/octet-stream');
        response.setHeader('content-Length', this.fileHandler.getFilesize());
    }

    logRequests(request) {

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