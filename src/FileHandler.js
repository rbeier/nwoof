'use strict';

const path = require('path'),
      fs   = require('fs');

class FileHandler {

    constructor(file) {

        this.filepath = path.resolve(file);
        this.filename = path.basename(this.filepath);

        try {

            this.filesize = fs.statSync(this.filepath);

        } catch( e ) {
            console.error('No such file');
            process.exit();
        }

    }

    getFilepath() {
        return this.filepath;
    }

    getFileName() {
        return this.filename;
    }

    getFilesize() {
        return this.filesize;
    }

    createFileStream() {
        return fs.createReadStream(this.getFilepath());
    }

}

module.exports = FileHandler;