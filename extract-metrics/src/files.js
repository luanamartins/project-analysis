const fs = require('fs');
const path = require('path');

function copyFile(src, dest) {
    let readStream = fs.createReadStream(src);
    readStream.once('error', (err) => {
        console.log(err);
    });
    readStream.once('end', () => {
        console.log('done copying');
    });
    readStream.pipe(fs.createWriteStream(dest));
}

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
    var json2csv = require('json2csv').parse;
    const extension = '.csv';
    // var fields = ['field1', 'field2', 'field3'];
    //
    // var data = [
    //     {
    //         "field1": "t",
    //         "field2": "t",
    //         "field3": "t"
    //     }
    // ];

    const fields = headers;
    const opts = { fields };   
    var csv = json2csv(data, opts);
    try {
        fs.writeFileSync(filepath, csv, 'utf8');
        console.log('file saved');
    } catch (error) {
        console.log(error);
    }
    // fs.writeFileSync(filepath, csv, function (err) {
    //     if (err) throw err;
    //     console.log('file saved');
    // });
}

module.exports = {
    copyFile,
    readFileSync,
    writeCsvFile,
    countLinesOnFile,
    appendDataToFile
};
