const esprima = require('esprima');
const path = require('path');
var jsonfile = require('jsonfile');

const fileModule = require('./files.js');
const tryCatchModule = require('./metrics-try-catch.js');
const promiseModule = require('./metrics-promise.js');
const asyncAwaitModule = require('./metrics-async-await.js');
const callbackModule = require('./metrics-callback.js');
const eventModule = require('./metrics-event.js');

function traverse(obj, fn) {
    for (let key in obj) {
        if (obj[key] !== null && fn(obj[key]) === false) {
            return false;
        }
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            if (traverse(obj[key], fn) === false) {
                return false;
            }
        }
    }
}

function handleMetrics(files, jsonFilepath) {

    let metrics = [];
    if (files) {
        files.forEach(function (fullFilepath) {
            try {
                let repoObject = jsonfile.readFileSync(jsonFilepath);
                //repoObject.totalOfJSLines += files.length;
                //repoObject.totalOfJSLines += fileModule.countLinesOnFile(fullFilepath);

                // "totalOfJSFiles": 0,
                // "totalOfJSLines": 0,
                // "totalOfJSFilesErrorHandler": 0

                let contents = fileModule.readFileSync(fullFilepath, 'utf-8');
                const options = {
                    loc: true,
                    tolerant: true,
                    comments: false
                };

                let ast = esprima.parseScript(contents, options);
                getMetrics(ast, fullFilepath, repoObject);
                console.log(fullFilepath);

                metrics.push(repoObject);
            } catch (err) {
                console.log(err);
            }
        });
    }
    return metrics;
}

function getMetrics(ast, filepath, reportObject) {

    try {
        traverse(ast, function (node) {
            tryCatchModule.handleAnalysis(node, reportObject);
            promiseModule.handleAnalysis(node, reportObject);
            asyncAwaitModule.handleAnalysis(node, reportObject);
            callbackModule.handleAnalysis(node, reportObject);
            eventModule.handleAnalysis(node, reportObject);
        });
    } catch (err) {
        console.log(filepath, ' ', err);
    }
}

module.exports = {
    handleMetrics: handleMetrics
};