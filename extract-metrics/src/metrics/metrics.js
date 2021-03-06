const esprima = require('esprima');
const exec = require('sync-exec');
const fs = require('fs');
const path = require('path');
const temp = require('fs-temp');
const estraverse = require('estraverse');
const uglify = require('uglify-es');
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

    const result = uglify.minify(code, options);

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
    const try_catches = try_catch_without_async[0];
    const async_await_catches = try_catch_without_async[1];
    const result_1 = try_catches.concat(async_await_catches);

    const callback_handlers = handlers.filter((handler) => {return handler.mech === constants.CALLBACK});
    const promise_handlers = handlers.filter((handler) => {return handler.mech === constants.PROMISE});
    const events_handlers = handlers.filter((handler) => {return handler.mech === constants.EVENT});
    const global_events_handlers = handlers.filter((handler) => {
        return  handler.mech === constants.WINDOW_ON_ERROR ||
                handler.mech === constants.ELEMENT_ON_ERROR ||
                handler.mech === constants.WINDOW_ADDEVENTLISTENER;

    });

    const callback_handlers_without_promises = removeCallbacks(promise_handlers, callback_handlers);
    const callback_handlers_without_events = removeCallbacks(events_handlers, callback_handlers_without_promises[1]);
    const callbacks_handlers_without_global = removeCallbacks(global_events_handlers, callback_handlers_without_events[1]);

    const callbacks = callbacks_handlers_without_global[1];
    const promises = callback_handlers_without_promises[0];
    const events = callback_handlers_without_events[0];
    const global = callbacks_handlers_without_global[0];

    const result_2 = callbacks.concat(promises.concat(events.concat(global)));

    let result = result_1.concat(result_2);
    return result;

}

function removeCallbacks(handlers, callbackHandlers) {
    let callbacksWithErrorParams = callbackHandlers.filter(x => x.has_error_arguments);

    for (let handler of handlers) {
        const match = callbacksWithErrorParams.find((callbackHandler) => {
            const omitProperties = [constants.MECH, constants.HAS_ERROR_ARGUMENTS];
            return utils.isEqual(callbackHandler, handler, omitProperties);
        });

        if (match) {
            callbacksWithErrorParams = removeFirstOccurrence(callbacksWithErrorParams, match);
        }
    }

    const callbacksWithoutErrorParams = callbackHandlers.filter(x => x.has_error_arguments === false);
    
    // Add all callbacks that has no error args and it is not in promise or event mech
    const result = callbacksWithoutErrorParams.concat(callbacksWithErrorParams);

    return [handlers, result];
}

function remove(handlers, handlersToRemove) {
    let handlersToRemoveResult = [];
    let handlersResult = [];
    for (let handler of handlers) {
        const isPromiseOrEvent = handler.mech  == constants.PROMISE ||
            handler.mech  == constants.EVENT;

        const match = handlersToRemove.find(function(handlerToRemove) {
            // For promises and events that has no error arguments
            if (isPromiseOrEvent && !handlerToRemove.has_error_arguments) {
                return false;
            } else {
                // Async-await or promises (and events) with error param
                const omitProperties = [constants.MECH, constants.HAS_ERROR_ARGUMENTS];
                return utils.isEqual(handlerToRemove, handler, omitProperties);
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
                global_event_handler_module.handleAnalysis(node, reportObject, metric_size_array);
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