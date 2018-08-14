const fs = require('fs');
const csv = require('csvtojson');
const json2csv = require('json2csv').parse;
const fileModule = require('./files');
const config = require('./config.json');

const folder = config['resultsPath'] + 'server/';
const headerFile = config['retrieveStatsPath'] + 'headers.json';
const writeResultFilepath = config['resultsPath'] + 'result.csv';
const writeClassResultFilepath = config['resultsPath'] + 'result-server.csv';

const files = fs.readdirSync(folder);
const headers = getHeaders();

run();

async function run() {
    const repositoriesData = [];
    const classData = getEmptyData();
    classData['Type class'] = 'Server';
    classData['numberOfFiles'] = 0;

    for (let file of files) {
        const filepath = folder + file;
        
        const rows = await csv().fromFile(filepath);
        const rowOnCsv = {
            'repository': file.slice(0, -4),
            'numberOfFiles': rows.length
        };
        classData['numberOfFiles'] += rows.length;

        let metric = 0;
        for (let head of headers) {
            metric = 0;
            for (let row of rows) {
                metric += parseInt(row[head]);
            }
            rowOnCsv[head] = metric;
            classData[head] += metric;
        }

        repositoriesData.push(rowOnCsv);
    }

    let fields = ['repository', 'numberOfFiles'];
    fields = fields.concat(headers);

    const opts = { fields };
    const repositoriesDataToCsv = json2csv(repositoriesData, opts);
    fs.writeFileSync(writeResultFilepath, repositoriesDataToCsv);

    const classDataToCsv = json2csv(classData, opts);
    fs.writeFileSync(writeClassResultFilepath, classDataToCsv);
}

function getHeaders() {
    let headers = require(headerFile);
    return Object.keys(headers).filter(header => !header.endsWith('Start') && !header.endsWith('End') );
}

function getEmptyData() {
    let headers = require(headerFile);
      
    const allowed = (head => !head.endsWith('Start') && !head.endsWith('End'));
    
    const filtered = Object.keys(headers)
    .filter(key => allowed(key))
    .reduce((obj, key) => {
        obj[key] = headers[key];
        return obj;
    }, {});

    return filtered;
}
