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

    }

    checkPort() {

        if( parseInt(this.port) != this.port ) {

            console.log("Port must be a Number!");

            process.exit();

        }

    }

    createServer() {

        http.createServer((request, response) => {

            this.serveFile(response);

            this.logDownloads(request);

        }).listen(this.port);

        this.printDownloadUrl();

    }

    serveFile(response) {

        fs.readFile(this.fileHandler.getFilepath(), (error, content) => {

            console.log(error);

            if (error) {
                response.writeHead(400, {'Content-type':'text/html'})
                response.end("No such file or directory");
            } else {
                response.setHeader('Content-disposition', 'attachment; filename='+ this.fileHandler.getFileName());
                response.end(content);
            }

        });

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