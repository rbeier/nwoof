'use strict';

const path = require('path');

class FileHandler {

    constructor(file) {
        this.filepath = path.resolve(file);
        this.filename = path.basename(this.filepath);
    }

    getFilepath() {
        return this.filepath;
    }

    getFileName() {
        return this.filename;
    }

}

module.exports = FileHandler;