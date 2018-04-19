'use strict';

const Zipper = require('./Zipper'),
      path    = require('path'),
      fs      = require('fs');

class File {

    constructor(file) {

        this.filepath = path.resolve(file);
        this.filename = path.basename(this.filepath);

        if( ! fs.existsSync(this.filepath) ) {
            throw "No such file or directory!";
        }

        if( this.isDirectory() ) {
            this.zipFolder();
        }

    }

    getFilepath() {
        return this.filepath;
    }

    getFileName() {
        return this.filename;
    }

    getFilesize() {
        return fs.statSync(this.filepath).size;
    }

    isDirectory() {
        return fs.statSync(this.filepath).isDirectory();
    }

    createFileStream() {
        return fs.createReadStream(this.getFilepath())
    }

    zipFolder() {

        let zipper  = new Zipper(this.filepath);
        let zipPath = zipper.createZipFile();

        this.filepath = zipPath;
        this.filename = path.basename(this.filepath);

    }
}

module.exports = File;