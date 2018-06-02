const esprima = require('esprima');
const exec = require('sync-exec');
const fs = require('fs');
const path = require('path');
const temp = require('fs-temp');
const estraverse = require('estraverse');
const UglifyJS = require('uglify-es');
const removeEmptyLines = require('remove-blank-lines');

const CONFIG = require("../../config");

const tryCatchModule = require(CONFIG["srcPath"] + 'metrics/metrics-try-catch.js');
const promiseModule = require(CONFIG["srcPath"] + 'metrics/metrics-promise.js');
const asyncAwaitModule = require(CONFIG["srcPath"] + 'metrics/metrics-async-await.js');
const callbackModule = require(CONFIG["srcPath"] + 'metrics/metrics-callback.js');
const eventModule = require(CONFIG["srcPath"] + 'metrics/metrics-event.js');
const strictModeModule = require(CONFIG["srcPath"] + 'metrics/metrics-strictmode');
const globalEventHandlerModule = require(CONFIG["srcPath"] + 'metrics/metrics-globaleventhandler');
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

    const babelPath = path.join(__dirname , '..', '..', 'node_modules', '.bin', 'babel');
    const babelCmd = babelPath + ' --plugins transform-es2015-arrow-functions --no-comments ' + filepath;
    let fileContents = exec(babelCmd).stdout;

    const tempFilepath = temp.writeFileSync(fileContents);

    const code = fs.readFileSync(tempFilepath, 'utf-8');
    const options = {
        // to prevent changes to your variable and function names
        mangle: false,
        output: { 
            // whether to actually beautify the output. 
            // Passing -b will set this to true, but you might need to 
            // pass -b even when you want to generate minified code, 
            // in order to specify additional arguments, 
            // so you can use -b beautify=false to override it.
            beautify: true, 
            // always insert brackets in if, for, do, while or with statements, 
            // even if their body is a single statement.
            bracketize: true 
        },
        compress: false
    };

    const result = UglifyJS.minify(code, options);

    if (result.error) {
        throw result.error;
    }
    
    return removeEmptyLines(result.code);
}

function handleMetrics(files) {
    let metrics = [];
    const failedFiles = [];
    if (files) {
        let i = 1;
        files.forEach(function (filepath) {
            try {
                console.log(i++ + ': ' + filepath);
                const repoObject = utils.getEmptyRepoObject();
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