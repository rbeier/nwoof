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
            console.error("\x1b[31mPort must be a Number!");
            process.exit();
        }

        if( this.port < 1024 ) {
            console.info("\x1b[33m\nYou should not use a well-known port. This may cause errors!")
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

        let downloadUrl = `http://${ip.address()}:${this.port}/${this.file.filename}`;

        console.log("\x1b[0m\nNow serving on " + downloadUrl + "\n");

    }

}

module.exports = Woofer;