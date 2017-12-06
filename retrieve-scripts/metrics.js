const esprima = require('esprima');
const exec = require('sync-exec');

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

function extractMetricsForFilepath(repoObject, filepath) {
    // let contents = fileModule.readFileSync(filepath, 'utf-8');
    let fileContents = exec('uglifyjs ' + filepath + ' -b').stdout;

    const stats = utils.getGeneralStats(fileContents);

    repoObject.numberOfLogicalLines = stats.source;
    repoObject.numberOfPhysicalLines = stats.total;

    const options = {
        loc: true,
        tolerant: true,
        comments: false
    };

    let ast = esprima.parseScript(fileContents, options);

    getMetrics(ast, filepath, repoObject);

    return repoObject;
}

function handleMetrics(files, projectPath) {

    let metrics = [];
    if (files) {
        let i = 0;
        files.forEach(function (filepath) {

            try {
                console.log(i + ': ' + filepath);
                const repoObject = utils.createRepoObject(projectPath);
                metrics.push(extractMetricsForFilepath(repoObject, filepath));
                i += 1;
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