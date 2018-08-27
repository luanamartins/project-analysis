const fs = require('fs');
const path = require('path');
const json2csv = require('json2csv').parse;

function readFileSync(filepath) {
    return fs.readFileSync(filepath, 'utf8');
}

function countLinesOnFile(filepath) {
    return fs.readFileSync(filepath, 'utf-8').split('\n').length;
}

function appendDataToFile(filepath, data) {
    fs.appendFileSync(filepath, data);
}

function writeCsvFile(filepath, headers, data) {
    try {
        const opts = { headers };
        const csv = json2csv(data, opts);
        fs.writeFileSync(filepath, csv, 'utf8');
        console.log('file saved');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    readFileSync,
    writeCsvFile,
    countLinesOnFile,
    appendDataToFile
};
