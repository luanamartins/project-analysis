const json2csv = require('json2csv');
const fs = require('fs');

function writeCsvFile(filepath, headers, data) {
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

    const csv = json2csv({data: data, fields: headers});
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
    writeCsvFile: writeCsvFile
};