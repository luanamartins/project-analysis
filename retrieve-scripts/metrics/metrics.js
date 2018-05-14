const esprima = require('esprima');
const exec = require('sync-exec');
const fs = require('fs');
const temp = require('fs-temp');
const estraverse = require('estraverse');

const tryCatchModule = require('./metrics-try-catch.js');
const promiseModule = require('./metrics-promise.js');
const asyncAwaitModule = require('./metrics-async-await.js');
const callbackModule = require('./metrics-callback.js');
const eventModule = require('./metrics-event.js');
const strictModeModule = require('./metrics-strictmode');
const globalEventHandlerModule = require('./metrics-globaleventhandler');
const utils = require('../utils.js');

function calculateArrayLines(repoObject) {

    repoObject.tryCatchNumberOfTriesLines = utils.calculateIntersections(repoObject.tryCatchNumberOfTriesLinesStart, repoObject.tryCatchNumberOfTriesLinesEnd);
    delete repoObject.tryCatchNumberOfTriesLinesStart;
    delete repoObject.tryCatchNumberOfTriesLinesEnd;

    repoObject.tryCatchNumberOfCatchesLines = utils.calculateIntersections(repoObject.tryCatchNumberOfCatchesLinesStart, repoObject.tryCatchNumberOfCatchesLinesEnd);
    delete repoObject.tryCatchNumberOfCatchesLinesStart;
    delete repoObject.tryCatchNumberOfCatchesLinesEnd;

    repoObject.tryCatchNumberOfFinalliesLines = utils.calculateIntersections(repoObject.tryCatchNumberOfFinalliesLinesStart, repoObject.tryCatchNumberOfFinalliesLinesEnd);
    delete repoObject.tryCatchNumberOfFinalliesLinesStart;
    delete repoObject.tryCatchNumberOfFinalliesLinesEnd;

    repoObject.promiseNumberOfPromiseThenFulfilledLines = utils.calculateIntersections(repoObject.promiseNumberOfPromiseThenFulfilledLinesStart, repoObject.promiseNumberOfPromiseThenFulfilledLinesEnd);
    delete repoObject.promiseNumberOfPromiseThenFulfilledLinesStart;
    delete repoObject.promiseNumberOfPromiseThenFulfilledLinesEnd;

    repoObject.promiseNumberOfPromiseThenRejectedLines = utils.calculateIntersections(repoObject.promiseNumberOfPromiseThenRejectedLinesStart, repoObject.promiseNumberOfPromiseThenRejectedLinesEnd);
    delete repoObject.promiseNumberOfPromiseThenRejectedLinesStart;
    delete repoObject.promiseNumberOfPromiseThenRejectedLinesEnd;

    repoObject.promiseNumberOfPromiseCatchesLines = utils.calculateIntersections(repoObject.promiseNumberOfPromiseCatchesLinesStart, repoObject.promiseNumberOfPromiseCatchesLinesEnd);
    delete repoObject.promiseNumberOfPromiseCatchesLinesStart;
    delete repoObject.promiseNumberOfPromiseCatchesLinesEnd;

    repoObject.asyncAwaitNumberOfTriesLines = utils.calculateIntersections(repoObject.asyncAwaitNumberOfTriesLinesStart, repoObject.asyncAwaitNumberOfTriesLinesEnd);
    delete repoObject.asyncAwaitNumberOfTriesLinesStart;
    delete repoObject.asyncAwaitNumberOfTriesLinesEnd;

    repoObject.asyncAwaitNumberOfCatchesLines = utils.calculateIntersections(repoObject.asyncAwaitNumberOfCatchesLinesStart, repoObject.asyncAwaitNumberOfCatchesLinesEnd);
    delete repoObject.asyncAwaitNumberOfCatchesLinesStart;
    delete repoObject.asyncAwaitNumberOfCatchesLinesEnd;

    repoObject.asyncAwaitNumberOfFinalliesLines = utils.calculateIntersections(repoObject.asyncAwaitNumberOfFinalliesLinesStart, repoObject.asyncAwaitNumberOfFinalliesLinesEnd);
    delete repoObject.asyncAwaitNumberOfFinalliesLinesStart;
    delete repoObject.asyncAwaitNumberOfFinalliesLinesEnd;

    repoObject.eventsNumberOfEventOnLines = utils.calculateIntersections(repoObject.eventsNumberOfEventOnLinesStart, repoObject.eventsNumberOfEventOnLinesEnd);
    delete repoObject.eventsNumberOfEventOnLinesStart;
    delete repoObject.eventsNumberOfEventOnLinesEnd;

    repoObject.eventsNumberOfEventOnceLines = utils.calculateIntersections(repoObject.eventsNumberOfEventOnceLinesStart, repoObject.eventsNumberOfEventOnceLinesEnd);
    delete repoObject.eventsNumberOfEventOnceLinesStart;
    delete repoObject.eventsNumberOfEventOnceLinesEnd;

    repoObject.eventsNumberOfEventEmitLines = utils.calculateIntersections(repoObject.eventsNumberOfEventEmitLinesStart, repoObject.eventsNumberOfEventEmitLinesEnd);
    delete repoObject.eventsNumberOfEventEmitLinesStart;
    delete repoObject.eventsNumberOfEventEmitLinesEnd;

    repoObject.callbacksNumberOfLines = utils.calculateIntersections(repoObject.callbacksNumberOfLinesStart, repoObject.callbacksNumberOfLinesEnd);
    delete repoObject.callbacksNumberOfLinesStart;
    delete repoObject.callbacksNumberOfLinesEnd;
}

function extractMetricsForFilepath(repoObject, filepath) {
    // let contents = fileModule.readFileSync(filepath, 'utf-8');

    const fileContents = executeBabelAndUglify(filepath);

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

    calculateArrayLines(repoObject);

    strictModeModule.fixStrictMode(repoObject);

    return repoObject;
}

function executeBabelAndUglify(filepath) {
    let fileContents = exec('babel --plugins transform-es2015-arrow-functions ' + filepath).stdout;

    const tempFilepath = temp.writeFileSync(fileContents);

    fileContents = exec('uglifyjs --beautify bracketize=true ' + tempFilepath).stdout;
    fs.unlinkSync(tempFilepath);

    return fileContents;
}

function handleMetrics(files, projectPath) {
    let metrics = [];
    const failedFiles = [];
    if (files) {
        let i = 0;
        files.forEach(function (filepath) {
            try {
                console.log(i + ': ' + filepath);
                i += 1;
                const repoObject = utils.createRepoObject(projectPath);
                metrics.push(extractMetricsForFilepath(repoObject, filepath));
            } catch (err) {
                console.log(err);
                failedFiles.push(filepath);
            }
        });
    }
    return {
        'metrics': metrics,
        'failedFiles': failedFiles
    };
}

function getMetrics(ast, filepath, reportObject) {
    try {

        strictModeModule.isGlobalStrictMode(ast, reportObject);

        estraverse.traverse(ast, {
            enter: function (node) {
                strictModeModule.handleAnalysis(node, reportObject);
                globalEventHandlerModule.handleAnalysis(node, reportObject);
                tryCatchModule.handleAnalysis(node, reportObject);
                promiseModule.handleAnalysis(node, reportObject);
                asyncAwaitModule.handleAnalysis(node, reportObject);
                callbackModule.handleAnalysis(node, reportObject);
                eventModule.handleAnalysis(node, reportObject);
            }
        });

    } catch (err) {
        console.log(filepath, ' ', err);
    }
}

module.exports = {
    handleMetrics
};