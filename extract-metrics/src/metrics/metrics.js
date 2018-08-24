const esprima = require('esprima');
const exec = require('sync-exec');
const fs = require('fs');
const path = require('path');
const temp = require('fs-temp');
const estraverse = require('estraverse');
const uglify_es = require('uglify-es');
const remove_empty_lines = require('remove-blank-lines');

const config = require("../../config");
const constants = require('../constants');

const try_catch_module = require(config["srcPath"] + 'metrics/metrics-try-catch.js');
const promise_module = require(config["srcPath"] + 'metrics/metrics-promise.js');
const async_await_module = require(config["srcPath"] + 'metrics/metrics-async-await.js');
const callback_module = require(config["srcPath"] + 'metrics/metrics-callback.js');
const event_module = require(config["srcPath"] + 'metrics/metrics-event.js');
const strict_mode_module = require(config["srcPath"] + 'metrics/metrics-strictmode');
const global_event_handler_module = require(config["srcPath"] + 'metrics/metrics-globaleventhandler');
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

    const metric_handlers_size = getMetrics(ast, filepath, repoObject);
    metric_handlers_size.map((handler_size) => {
        handler_size.file = filepath
    });

    calculateArrayLines(repoObject);

    strict_mode_module.fixStrictMode(repoObject);

    return {
        'repoObject': repoObject,
        'metric_handlers_size': metric_handlers_size
    };
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

    const result = uglify_es.minify(code, options);

    if (result.error) {
        throw result.error;
    }
    
    return remove_empty_lines(result.code);
}

function handleMetrics(files, saveObject) {
    const metrics = [];
    const failedFiles = [];
    let metrics_handlers = [];
    if (files) {
        let file_counter = 1;
        files.forEach(function (filepath) {
            try {
                let handler_object = { 'file': filepath };
                console.log(file_counter++ + ': ' + filepath);

                const repoObject = utils.getEmptyRepoObject();
                const data = extractMetricsForFilepath(repoObject, filepath);

                metrics.push(data.repoObject);

                const metrics_handlers_recounting = handleRecountingMech(data.metric_handlers_size);
                metrics_handlers = metrics_handlers.concat(metrics_handlers_recounting);

                saveMetricsOnArray(repoObject, saveObject, filepath);
            } catch (err) {
                console.log(err);
                failedFiles.push(filepath);
            }
        });
    }
    return {
        'metrics': metrics,
        'failedFiles': failedFiles,
        'metrics_handlers': metrics_handlers
    };
}

function handleRecountingMech(handlers) {

    const try_catch_handlers = handlers.filter((handler) => {return handler.mech === constants.TRY_CATCH});
    const async_await_handlers = handlers.filter((handler) => {return handler.mech === constants.ASYNC_AWAIT});


    let try_catch_without_async = remove(try_catch_handlers, async_await_handlers);
    try_catch_without_async = try_catch_without_async[0].concat(try_catch_without_async[1]);

    const callback_handlers = handlers.filter((handler) => {return handler.mech === constants.CALLBACK});
    const promise_handlers = handlers.filter((handler) => {return handler.mech === constants.PROMISE});
    const events_handlers = handlers.filter((handler) => {return handler.mech === constants.EVENT});

    const callback_handlers_without_promises = remove(callback_handlers, promise_handlers);
    const callback_handlers_without_events = remove(callback_handlers_without_promises[0], events_handlers);

    const callbacks = callback_handlers_without_events[0];
    const promises = callback_handlers_without_promises[1];
    const events = callback_handlers_without_events[1];

    const result_4 = callbacks.concat(promises.concat(events));


    let result = try_catch_without_async.concat(result_4);
    console.log(result);
    result = result.map((handler) => {
        if(handler.hasOwnProperty(constants.HAS_ERROR_ARGUMENTS)) {
            delete handler[constants.HAS_ERROR_ARGUMENTS];
        }
        return handler;
    });

    return result;

}

function remove(handlers, handlersToRemove) {
    let handlersToRemoveResult = [];
    let handlersResult = [];
    for (let handler of handlers) {
        const match = handlersToRemove.find(function(element) {
            // For promises and events that has no error arguments
            if (element.has_error_arguments === false) {
                return false;
            } else {
                return element.lines === handler.lines &&
                    element.stmts === handler.stmts;
            }
        });

        if (match) {
            handlersToRemove = removeFirstOccurrence(handlersToRemove, match);
            handlersToRemoveResult.push(match);
        } else {
            handlersResult.push(handler);
        }
    }

    if(handlersToRemove.length > 0) {
        handlersToRemoveResult = handlersToRemoveResult.concat(handlersToRemove);
    }

    return [handlersResult, handlersToRemoveResult];
}

function removeFirstOccurrence(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
    return array;
}


function saveMetricsOnArray(repoObject, saveObject, filepath) {
    const metrics = utils.listPropertiesOf(repoObject);
    metrics.forEach((metric) => {
        if(repoObject[metric] > 0) {
            saveObject[metric].push(filepath);
        }
    });
}

function getMetrics(ast, filepath, reportObject) {
    try {

        const metric_size_array = [];

        strict_mode_module.isGlobalStrictMode(ast, reportObject);

        estraverse.traverse(ast, {
            enter: function (node) {
                strict_mode_module.handleAnalysis(node, reportObject);
                global_event_handler_module.handleAnalysis(node, reportObject);
                try_catch_module.handleAnalysis(node, reportObject, metric_size_array);
                promise_module.handleAnalysis(node, reportObject, metric_size_array);
                async_await_module.handleAnalysis(node, reportObject, metric_size_array);
                callback_module.handleAnalysis(node, reportObject, metric_size_array);
                event_module.handleAnalysis(node, reportObject, metric_size_array);
            }
        });

        return metric_size_array;

    } catch (err) {
        console.log(filepath, ' ', err);
    }
}

module.exports = {
    handleMetrics
};