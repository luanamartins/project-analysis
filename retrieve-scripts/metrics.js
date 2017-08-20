const esprima = require('esprima');
const fileModule = require('./files.js');
const tryCatchModule = require('./metrics-try-catch.js');
const promiseModule = require('./metrics-promise.js');

function traverse(obj, fn) {
    for (var key in obj) {
        if (obj[key] !== null && fn(obj[key]) === false) {
            return false;
        }
        if (typeof obj[key] == 'object' && obj[key] !== null) {
            if (traverse(obj[key], fn) === false) {
                return false;
            }
        }
    }
}


function getMetrics(filepath) {
    var contents = fileModule.readFileSync(filepath);
    var syntax = esprima.parse(contents);

    var repoObject = {
        totalOfJSFiles: 0,
        totalOfJSFilesEHM: 0,
        numberOfTries: 0,
        numberOfCatches: 0,
        numberOfThrows: 0,
        numberOfPromises: 0
    }

    traverse(syntax, function (obj) {

        tryCatchModule.handleAnalysis(obj, repoObject);
        promiseModule.handleAnalysis(obj, repoObject);

    });

    console.log(repoObject);

}

module.exports = {
    getMetrics: getMetrics
};