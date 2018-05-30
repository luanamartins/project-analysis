const json2csv = require('json2csv');
const fs = require('fs');

function writeCsvFile(filepath, headers, data) {
    const extension = '.csv';

    const csv = json2csv({data: data, fields: headers});
    try {
        fs.writeFileSync(filepath, csv, 'utf8');
        console.log('file saved');
    } catch (error) {
        console.log(error);
    }
}

function transpose(jsonArray) {
    let counter = 0;
    const oldKeys = Object.keys(jsonArray[0]);
    const first = oldKeys[0];
    let newKeys = jsonArray.map(j => j[first]);
    newKeys = [first].concat(newKeys.map(k => String(k)));

    console.log('oldKeys: ', oldKeys);
    console.log('newKeys: ', newKeys);

    const fromMatrix = [oldKeys].concat(jsonArray.map(j => Object.values(j).map(i => String(i))));
    const toMatrix = fromMatrix[0].map((col, i) => fromMatrix.map(row => row[i]));

    const result = [];
    for (let i = 1; i < toMatrix.length; i++) {
        result.push(zip(newKeys, toMatrix[i]));
    }

    return result;
    // console.log(result);
}

function zip(keys, values) {
    let result = {};
    for(let i = 0; i < keys.length; i++) {
        result[String(keys[i])] = values[i];
    }
    return result;
}

// const matrix = [{'a': 1, 'b': 2, 'c': 3}, {'a': 4, 'b': 5, 'c': 6}];
// transpose(matrix);

module.exports = {
    writeCsvFile,
    transpose
};