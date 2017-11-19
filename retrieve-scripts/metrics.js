const esprima = require('esprima');
const path = require('path');
const jsonfile = require('jsonfile');

const fileModule = require('./files.js');
const tryCatchModule = require('./metrics-try-catch.js');
const promiseModule = require('./metrics-promise.js');
const asyncAwaitModule = require('./metrics-async-await.js');
const callbackModule = require('./metrics-callback.js');
const eventModule = require('./metrics-event.js');
const utils = require('./utils.js');

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

function handleMetrics(files, projectPath) {

    let metrics = [];
    if (files) {
        files.forEach(function (filepath) {
            try {
                const jsonFilepath = path.join(projectPath, 'report-object.json');
                let repoObject = jsonfile.readFileSync(jsonFilepath);

                let contents = fileModule.readFileSync(filepath, 'utf-8');
                const stats = utils.getGeneralStats(contents);

                repoObject.numberOfLogicalLines = stats.source;
                repoObject.numberOfPhysicalLines = stats.total;

                const options = {
                    loc: true,
                    tolerant: true,
                    comments: false
                };

                let ast = esprima.parseScript(contents, options);
                console.log('total:', utils.getNumberOfLines(ast));

                getMetrics(ast, filepath, repoObject);
                console.log(filepath);

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