'use strict';

const fs       = require('fs'),
      os       = require('os'),
      path     = require('path'),
      archiver = require('archiver');

class Zipper {

    constructor(filepath) {

        this.filepath = filepath;
        this.filename = path.basename(this.filepath);
        this.tmpPath  = os.tmpdir() + path.sep + this.filename + '.zip';

        if( fs.existsSync(this.tmpPath) ) {
            fs.unlinkSync(this.tmpPath);
        }

    }

    createZipFile() {

        let output  = fs.createWriteStream(this.tmpPath);
        let archive = archiver('zip');

        archive.on('error', err => { throw err; });

        archive.pipe(output);
        archive.directory(this.filepath, this.filename);
        archive.finalize();

        return this.tmpPath;

    }

}

module.exports = Zipper;