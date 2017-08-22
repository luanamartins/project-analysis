const esprima = require('esprima');
const path = require('path');

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

function handleMetrics(outputDirectory, files) {

    var repoObject = {
        totalOfJSFiles: files.length,
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

    console.log(eventEmitterObject);
}


function getMetrics(ast, filepath, repoObject) {

    try {
        console.log(filepath);

        traverse(ast, function (obj) {
            tryCatchModule.handleAnalysis(obj, repoObject);
            promiseModule.handleAnalysis(obj, repoObject);
        });
    }catch (err){
        console.log(filepath, ' ', err);
    }
}

function getJSFilesEHM(ast, repoObject){

}

module.exports = {
    handleMetrics: handleMetrics
};