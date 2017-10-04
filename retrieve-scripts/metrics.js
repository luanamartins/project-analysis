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

function handleMetrics(outputDirectory, files) {

    let repoObject = {
        totalOfJSFiles: files.length,
        totalOfJSLines: 0,
        totalOfJSFilesErrorHandler: 0,

        tryCatch: {
            numberOfTries: 0,
            numberOfCatches: 0,
            numberOfEmptyCatches: 0,
            numberOfThrows: 0,
            numberOfUniqueConsole: 0
        },

        promise: {
            numberOfPromises: 0,
            numberOfResolves: 0,
            numberOfRejects: 0,
            numberOfPromiseThens: 0,
            numberOfPromiseCatches: 0,
            numberOfPromiseRaces: 0,
            numberOfPromiseAll: 0,
        },

        asyncAwait: {
            numberOfAsyncs: 0,
            numberOfAwaits: 0,
        },


        events: {
            numberOfEventMethodsOn: 0,
            numberOfEventMethodsOnce: 0,
            numberOfEventMethodsEmit: 0,
            numberOfEventUncaughtException: 0,
            numberOfEventUnhandledRejection: 0
        },

        callbacks: {
            numberOfCallbackAcceptingFunctions: 0,
            numberOfCallbackErrorFunctions: 0,
            numberOfEmptyCallbacks: 0
        }
    };

    let eventEmitterObject = {
        totalOfStringEvents: 0,
        totalOfEventTypes: 0
    };

    if (files) {
        files.forEach(function (file) {
            let fullFilepath = path.join(outputDirectory, file);
            try {

                repoObject.totalOfJSLines += fileModule.countLinesOnFile(fullFilepath);

                let contents = fileModule.readFileSync(fullFilepath, 'utf-8');
                let ast = esprima.parseScript(contents, {tolerant: true});

                checkEventsTypes(ast, eventEmitterObject);
                getMetrics(ast, fullFilepath, repoObject);
                getJSFilesEHM(ast, repoObject);
            } catch (err) {
                console.log(fullFilepath);
            }
        });
    }

    console.log(repoObject);
    console.log(eventEmitterObject);
}

//test();

function test() {
    let contents = fileModule.readFileSync('');
    let ast = esprima.parse(contents);
    let eventEmitterObject = {
        totalOfStringEvents: 0,
        totalOfEventTypes: 0
    };

    checkEventsTypes(ast, eventEmitterObject);
}

function checkEventsTypes(ast, eventEmitterObject) {

    let eventListeningMethods = ['on', 'once'];
    let eventRaisingMethods = ['emit'];

    traverse(ast, function (node) {

        if (node.type === 'CallExpression') {

            if (node.callee.property) {
                let methodName = node.callee.property.name;
                if (eventListeningMethods.includes(methodName) || eventRaisingMethods.includes(methodName)) {
                    const firstArgFromMethod = node.arguments[0];
                    if (firstArgFromMethod.type === 'Literal') {
                        let raw = node.arguments[0].raw;

                        // the method is an event listener or emitter and is listing/raising a string as event
                        if (raw.startsWith("'") && raw.endsWith("'")) {
                            eventEmitterObject.totalOfStringEvents++;
                        }
                    }
                    eventEmitterObject.totalOfEventTypes++;
                }
            }
        }
    });

    console.log(eventEmitterObject);
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
    handleMetrics: handleMetrics,
    checkEventsTypes: checkEventsTypes
};