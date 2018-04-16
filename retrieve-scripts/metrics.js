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

    fixStrictMode(repoObject);

    return repoObject;
}

function fixStrictMode(repoObject) {
    if(repoObject.numberOfStrictModeGlobal > 0) {
        repoObject.numberOfStrictModeLocal -= 1;
    }
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

        if (ast.body) {
            const firstStatement = ast.body[0];
            if (utils.isStrictMode(firstStatement)) {
                reportObject.numberOfStrictModeGlobal++;
            }
        }

        utils.traverse(ast, function (node) {

            if (utils.isStrictMode(node)) {
                reportObject.numberOfStrictModeLocal++;
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