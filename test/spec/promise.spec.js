require('dotenv').load();
const testCase = require('nodeunit').testCase;
const projectPath = process.env.RETRIEVE_SCRIPTS_ROOT_PATH;
const suiteCasePath = process.env.PROJECT_PATH + '/test/data/promise/';
const metricsModule = require(projectPath + '/metrics');


module.exports = testCase({

    "TC01": function (test) {
        const filename = suiteCasePath + 'promise1.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 1);

        test.equal(metricsObject.promiseNumberOfResolves, 1);
        test.equal(metricsObject.promiseNumberOfRejects, 0);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 0);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 0);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 0);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC02": function (test) {
        const filename = suiteCasePath + 'promise2.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 1);

        test.equal(metricsObject.promiseNumberOfResolves, 0);
        test.equal(metricsObject.promiseNumberOfRejects, 1);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC03": function (test) {
        const filename = suiteCasePath + 'promise3.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 2);

        test.equal(metricsObject.promiseNumberOfResolves, 1);
        test.equal(metricsObject.promiseNumberOfRejects, 1);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 0);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC04": function (test) {
        const filename = suiteCasePath + 'promise4.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 1);

        test.equal(metricsObject.promiseNumberOfResolves, 1);
        test.equal(metricsObject.promiseNumberOfRejects, 0);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 0);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC05": function (test) {
        const filename = suiteCasePath + 'promise5.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 5);

        test.equal(metricsObject.promiseNumberOfResolves, 2);
        test.equal(metricsObject.promiseNumberOfRejects, 1);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 0);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 1);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC06": function (test) {
        const filename = suiteCasePath + 'promise6.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 1);

        test.equal(metricsObject.promiseNumberOfResolves, 0);
        test.equal(metricsObject.promiseNumberOfRejects, 1);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 4);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC07": function (test) {
        const filename = suiteCasePath + 'promise7.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 1);

        test.equal(metricsObject.promiseNumberOfResolves, 0);
        test.equal(metricsObject.promiseNumberOfRejects, 1);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 2);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 4);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC08": function (test) {
        const filename = suiteCasePath + 'promise8.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 1);

        test.equal(metricsObject.promiseNumberOfResolves, 0);
        test.equal(metricsObject.promiseNumberOfRejects, 1);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 2);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 7);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 0);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC09": function (test) {
        const filename = suiteCasePath + 'promise9.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 1);

        test.equal(metricsObject.promiseNumberOfResolves, 0);
        test.equal(metricsObject.promiseNumberOfRejects, 1);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 2);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC10": function (test) {
        const filename = suiteCasePath + 'promise10.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 1);

        test.equal(metricsObject.promiseNumberOfResolves, 0);
        test.equal(metricsObject.promiseNumberOfRejects, 1);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 2);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC11": function (test) {
        const filename = suiteCasePath + 'promise11.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 2);

        test.equal(metricsObject.promiseNumberOfResolves, 2);
        test.equal(metricsObject.promiseNumberOfRejects, 0);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 2);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 2);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 2);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 1);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 1);

        test.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC12": function (test) {
        const filename = suiteCasePath + 'promise12.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 2);

        test.equal(metricsObject.promiseNumberOfResolves, 2);
        test.equal(metricsObject.promiseNumberOfRejects, 0);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 3);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 2);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 4);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 2);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 2);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 2);

        test.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC13": function (test) {
        const filename = suiteCasePath + 'promise13.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 1);

        test.equal(metricsObject.promiseNumberOfResolves, 0);
        test.equal(metricsObject.promiseNumberOfRejects, 1);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 1);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 1);

        test.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 1);
        test.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC14": function (test) {
        const filename = suiteCasePath + 'promise14.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 1);

        test.equal(metricsObject.promiseNumberOfResolves, 0);
        test.equal(metricsObject.promiseNumberOfRejects, 1);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 1);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 1);

        test.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 1);
        test.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 1);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);
        test.done();
    },

    "TC15": function (test) {
        const filename = suiteCasePath + 'promise15.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 1);

        test.equal(metricsObject.promiseNumberOfResolves, 0);
        test.equal(metricsObject.promiseNumberOfRejects, 1);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 1);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 1);

        test.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 1);
        test.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 1);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC16": function (test) {
        const filename = suiteCasePath + 'promise16.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 1);

        test.equal(metricsObject.promiseNumberOfResolves, 0);
        test.equal(metricsObject.promiseNumberOfRejects, 1);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 1);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 1);

        test.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 1);
        test.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC17": function (test) {
        const filename = suiteCasePath + 'promise17.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 1);

        test.equal(metricsObject.promiseNumberOfResolves, 0);
        test.equal(metricsObject.promiseNumberOfRejects, 1);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 2);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 8);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 1);

        test.equal(metricsObject.promiseNumberOfReturnsOnCatches, 1);
        test.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 1);
        test.equal(metricsObject.promiseNumberOfBreaksOnCatches, 1);

        test.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        test.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    }

});
