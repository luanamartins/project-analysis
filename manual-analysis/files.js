const fs = require('fs');

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

function writeCsvFile(filename, fields, data) {
    var json2csv = require('json2csv');
    const extension = '.csv';
    // var fields = ['field1', 'field2', 'field3'];
    //
    // var myData = [
    //     {
    //         "field1": "t",
    //         "field2": "t",
    //         "field3": "t"
    //     }
    // ];

    var filepath = path.join(filename, extension);
    var csv = json2csv({ data: data, fields: fields });
    fs.writeFile(filepath, csv, function(err) {
        if (err) throw err;
        console.log('file saved');
    });

}

module.exports = {
    copyFile: copyFile,
    readFileSync: readFileSync,
    writeCsvFile: writeCsvFile
}