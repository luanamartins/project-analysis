const esprima = require('esprima');
const path = require('path');

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

let repoObject = {
    totalOfJSFiles: 0,
    totalOfJSLines: 0,
    totalOfJSFilesErrorHandler: 0, // TODO

    tryCatch: {
        numberOfTries: 0,
        numberOfEmptyTries: 0, // TODO test
        numberOfTriesLines: 0, // TODO test
        numberOfTriesWithUniqueStatement: 0, // TODO test

        numberOfCatches: 0,
        numberOfEmptyCatches: 0,
        numberOfCatchesLines: 0, // TODO test
        numberOfUniqueConsole: 0,
        numberOfCatchesWithUniqueStatement: 0, // TODO test

        numberOfThrows: 0,
        numberOfThrowsLiteral: 0,
        numberOfThrowsErrorObjects: 0,

        numberOfFinallies: 0, // TODO
        numberOfFinalliesLines: 0, // TODO
    },

    promise: {
        numberOfPromises: 0,
        numberOfResolves: 0,
        numberOfRejects: 0,

        numberOfPromiseThens: 0,
        numberOfPromiseThenLines: 0, // TODO
        numberOfPromiseCatches: 0,
        numberOfPromiseCatchesLines: 0, // TODO
        numberOfEmptyFunctionsOnPromiseCatches: 0, // TODO

        numberOfPromiseRaces: 0,
        numberOfPromiseAll: 0,
    },

    asyncAwait: {
        numberOfAsyncs: 0,
        numberOfAwaits: 0,

        numberOfTries: 0, // TODO
        numberOfTriesLines: 0, // TODO

        numberOfCatches: 0,
        numberOfEmptyCatches: 0,
        numberOfCatchesLines: 0,
        numberOfUniqueConsole: 0,

        numberOfFinallies: 0, // TODO
        numberOfFinalliesLines: 0, // TODO
    },


    events: {
        numberOfEventMethodsOn: 0,
        numberOfEventMethodsOnce: 0,
        numberOfEventMethodsEmit: 0,

        numberOfEventUncaughtException: 0,
        numberOfEventUnhandledRejection: 0,

        totalOfStringEvents: 0,
        totalOfEventTypes: 0
    },

    callbacks: {
        numberOfCallbackAcceptingFunctions: 0,
        numberOfCallbackErrorFunctions: 0,
        numberOfEmptyCallbacks: 0
    }
};

function handleMetrics(files) {

    if (files) {
        files.forEach(function (fullFilepath) {
            try {
                repoObject.totalOfJSLines += files.length;
                repoObject.totalOfJSLines += fileModule.countLinesOnFile(fullFilepath);

                let contents = fileModule.readFileSync(fullFilepath, 'utf-8');
                const options = {
                    loc: true,
                    tolerant: true,
                    comments: false
                };
                let ast = esprima.parseScript(contents, options);

                // checkEventsTypes(ast, eventEmitterObject);
                getMetrics(ast, fullFilepath, repoObject);
                // getJSFilesEHM(ast, repoObject);
            } catch (err) {
                console.log(fullFilepath);
            }
        });
    }

    return repoObject;
}

function getMetrics(ast, filepath, reportObject) {

    try {
        console.log(filepath);

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

function getJSFilesEHM(ast, repoObject) {
    // Calculate how many files are there on using EHM

}

module.exports = {
    handleMetrics: handleMetrics
};