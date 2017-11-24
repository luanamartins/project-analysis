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

function extractMetricsForFilepath(projectPath, filepath) {

    let repoObject = utils.createRepoObject(projectPath);

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
    console.log(filepath);
    getMetrics(ast, filepath, repoObject);

    return repoObject;
}

function handleMetrics(files, projectPath) {

    let metrics = [];
    if (files) {
        files.forEach(function (filepath) {
            try {
                metrics.push(extractMetricsForFilepath(projectPath, filepath));
            } catch (err) {
                console.log(err);
                errorOnFiles.push(filepath);
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