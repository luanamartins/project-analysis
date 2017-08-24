const esprima = require('esprima');
const path = require('path');

const fileModule = require('./files.js');
const tryCatchModule = require('./metrics-try-catch.js');
const promiseModule = require('./metrics-promise.js');
const asyncAwaitModule = require('./metrics-async-await.js');
const callbackModule = require('./metrics-callback.js');
const eventModule = require('./metrics-event.js');

function traverse(obj, fn) {
    for (var key in obj) {
        if (obj[key] !== null && fn(obj[key]) === false) {
            return false;
        }
        if (typeof obj[key] == 'object' && obj[key] !== null) {
            if (traverse(obj[key], fn) === false) {
                return false;
            }
        }
    }
}

function handleMetrics(outputDirectory, files) {

    var repoObject = {
        totalOfJSFiles: files.length,
        totalOfJSFilesEHM: 0,

        numberOfTries: 0,
        numberOfCatches: 0,
        numberOfThrows: 0,

        numberOfPromises: 0,
        numberOfResolves: 0,
        numberOfRejects: 0,
        numberOfPromiseThens: 0,
        numberOfPromiseCatches: 0,
        numberOfPromiseRaces: 0,
        numberOfPromiseAll: 0,

        numberOfAsyncs: 0,
        numberOfAwaits: 0,

        numberOfEventMethodsOn: 0,
        numberOfEventMethodsOnce: 0,
        numberOfEventMethodsEmit: 0,

        numberOfCallbackAcceptingFunctions: 0,
        numberOfCallbackErrorFunctions: 0
    };

    var eventEmitterObject = {
        totalOfStringEvents: 0,
        totalOfEventTypes: 0
    };

    if (files) {
        files.forEach(function (item) {
            var fullFilepath = path.join(outputDirectory, item);

            var contents = fileModule.readFileSync(fullFilepath);
            var ast = esprima.parse(contents);

            checkEventsTypes(ast, eventEmitterObject);
            getMetrics(ast, fullFilepath, repoObject);
            getJSFilesEHM(ast, repoObject);

            console.log(item, ' ', repoObject);
        });
    }
}

//test();

function test() {
    var contents = fileModule.readFileSync('');
    var ast = esprima.parse(contents);
    var eventEmitterObject = {
        totalOfStringEvents: 0,
        totalOfEventTypes: 0
    };

    checkEventsTypes(ast, eventEmitterObject);
}

function checkEventsTypes(ast, eventEmitterObject){

    var eventListeningMethods = ['on', 'once'];
    var eventRaisingMethods = ['emit'];

    traverse(ast, function (node) {

        if(node.type == 'CallExpression'){

            var methodName = node.callee.property.name;
            if(eventListeningMethods.includes(methodName) || eventRaisingMethods.includes(methodName)){
                const firstArgFromMethod = node.arguments[0];
                if(firstArgFromMethod.type == 'Literal') {
                    var raw = node.arguments[0].raw;

                    // the method is an event listener or emitter and is listing/raising a string as event
                    if (raw.startsWith("'") && raw.endsWith("'")) {
                        eventEmitterObject.totalOfStringEvents++;
                    }
                }
                eventEmitterObject.totalOfEventTypes++;
            }
        }
    });

    console.log(eventEmitterObject);
}


function getMetrics(ast, filepath, repoObject) {

    try {
        console.log(filepath);

        traverse(ast, function (obj) {
            tryCatchModule.handleAnalysis(obj, repoObject);
            promiseModule.handleAnalysis(obj, repoObject);
            asyncAwaitModule.handleAnalysis(obj, repoObject);
            callbackModule.handleAnalysis(obj, repoObject);
            eventModule.handleAnalysis(obj, repoObject);
        });
    }catch (err){
        console.log(filepath, ' ', err);
    }
}

function getJSFilesEHM(ast, repoObject){
    // Calculate how many files are there on using EHM

}

module.exports = {
    handleMetrics: handleMetrics,
    checkEventsTypes: checkEventsTypes
};