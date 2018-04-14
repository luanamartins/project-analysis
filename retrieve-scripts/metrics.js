const esprima = require('esprima');
const exec = require('sync-exec');
const fs = require('fs');
const temp = require('fs-temp');

const tryCatchModule = require('./metrics-try-catch.js');
const promiseModule = require('./metrics-promise.js');
const asyncAwaitModule = require('./metrics-async-await.js');
const callbackModule = require('./metrics-callback.js');
const eventModule = require('./metrics-event.js');
const utils = require('./utils.js');

function calculateArrayLines(repoObject) {

    repoObject.tryCatchNumberOfTriesLines = utils.calculate(repoObject.tryCatchNumberOfTriesLinesStart, repoObject.tryCatchNumberOfTriesLinesEnd);
    delete repoObject.tryCatchNumberOfTriesLinesStart;
    delete repoObject.tryCatchNumberOfTriesLinesEnd;

    repoObject.tryCatchNumberOfCatchesLines = utils.calculate(repoObject.tryCatchNumberOfCatchesLinesStart, repoObject.tryCatchNumberOfCatchesLinesEnd);
    delete repoObject.tryCatchNumberOfCatchesLinesStart;
    delete repoObject.tryCatchNumberOfCatchesLinesEnd;

    repoObject.tryCatchNumberOfFinalliesLines = utils.calculate(repoObject.tryCatchNumberOfFinalliesLinesStart, repoObject.tryCatchNumberOfFinalliesLinesEnd);
    delete repoObject.tryCatchNumberOfFinalliesLinesStart;
    delete repoObject.tryCatchNumberOfFinalliesLinesEnd;

    repoObject.promiseNumberOfPromiseThenFulfilledLines = utils.calculate(repoObject.promiseNumberOfPromiseThenFulfilledLinesStart, repoObject.promiseNumberOfPromiseThenFulfilledLinesEnd);
    delete repoObject.promiseNumberOfPromiseThenFulfilledLinesStart;
    delete repoObject.promiseNumberOfPromiseThenFulfilledLinesEnd;

    repoObject.promiseNumberOfPromiseThenRejectedLines = utils.calculate(repoObject.promiseNumberOfPromiseThenRejectedLinesStart, repoObject.promiseNumberOfPromiseThenRejectedLinesEnd);
    delete repoObject.promiseNumberOfPromiseThenRejectedLinesStart;
    delete repoObject.promiseNumberOfPromiseThenRejectedLinesEnd;

    repoObject.promiseNumberOfPromiseCatchesLines = utils.calculate(repoObject.promiseNumberOfPromiseCatchesLinesStart, repoObject.promiseNumberOfPromiseCatchesLinesEnd);
    delete repoObject.promiseNumberOfPromiseCatchesLinesStart;
    delete repoObject.promiseNumberOfPromiseCatchesLinesEnd;

    repoObject.asyncAwaitNumberOfTriesLines = utils.calculate(repoObject.asyncAwaitNumberOfTriesLinesStart, repoObject.asyncAwaitNumberOfTriesLinesEnd);
    delete repoObject.asyncAwaitNumberOfTriesLinesStart;
    delete repoObject.asyncAwaitNumberOfTriesLinesEnd;

    repoObject.asyncAwaitNumberOfCatchesLines = utils.calculate(repoObject.asyncAwaitNumberOfCatchesLinesStart, repoObject.asyncAwaitNumberOfCatchesLinesEnd);
    delete repoObject.asyncAwaitNumberOfCatchesLinesStart;
    delete repoObject.asyncAwaitNumberOfCatchesLinesEnd;

    repoObject.asyncAwaitNumberOfFinalliesLines = utils.calculate(repoObject.asyncAwaitNumberOfFinalliesLinesStart, repoObject.asyncAwaitNumberOfFinalliesLinesEnd);
    delete repoObject.asyncAwaitNumberOfFinalliesLinesStart;
    delete repoObject.asyncAwaitNumberOfFinalliesLinesEnd;

    repoObject.eventsNumberOfEventOnLines = utils.calculate(repoObject.eventsNumberOfEventOnLinesStart, repoObject.eventsNumberOfEventOnLinesEnd);
    delete repoObject.eventsNumberOfEventOnLinesStart;
    delete repoObject.eventsNumberOfEventOnLinesEnd;

    repoObject.eventsNumberOfEventOnceLines = utils.calculate(repoObject.eventsNumberOfEventOnceLinesStart, repoObject.eventsNumberOfEventOnceLinesEnd);
    delete repoObject.eventsNumberOfEventOnceLinesStart;
    delete repoObject.eventsNumberOfEventOnceLinesEnd;

    repoObject.eventsNumberOfEventEmitLines = utils.calculate(repoObject.eventsNumberOfEventEmitLinesStart, repoObject.eventsNumberOfEventEmitLinesEnd);
    delete repoObject.eventsNumberOfEventEmitLinesStart;
    delete repoObject.eventsNumberOfEventEmitLinesEnd;

    repoObject.callbacksNumberOfLines = utils.calculate(repoObject.callbacksNumberOfLinesStart, repoObject.callbacksNumberOfLinesEnd);
    delete repoObject.callbacksNumberOfLinesStart;
    delete repoObject.callbacksNumberOfLinesEnd;
}

function extractMetricsForFilepath(repoObject, filepath) {
    // let contents = fileModule.readFileSync(filepath, 'utf-8');

    let fileContents = exec('babel --plugins transform-es2015-arrow-functions ' + filepath).stdout;

    const tempFilepath = temp.writeFileSync(fileContents);

    fileContents = exec('uglifyjs --beautify bracketize=true ' + tempFilepath).stdout;
    fs.unlinkSync(tempFilepath);

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

    return repoObject;
}

function handleMetrics(files, projectPath) {
    let metrics = [];
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
            }
        });
    }
    return metrics;
}

function getMetrics(ast, filepath, reportObject) {

    try {
        utils.traverse(ast, function (node) {
            if (node.type === 'ExpressionStatement' && node.directive && node.directive === 'use strict') {
                reportObject.numberOfStrictModeGlobal++;
            }
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
    handleMetrics
};