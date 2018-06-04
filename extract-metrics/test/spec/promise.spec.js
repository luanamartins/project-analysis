const assert = require("assert");
const CONFIG = require("../../config");

const projectPath = CONFIG["projectPath"];
const suiteCasePath = CONFIG["dataTestPath"] + "promise/";
const metricsModule = require(CONFIG["srcPath"] + "metrics/metrics");

describe("Promises tests", function() {
    it("assert01", function() {
        const filename = suiteCasePath + 'promise1.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 1);

        assert.equal(metricsObject.promiseNumberOfResolves, 1);
        assert.equal(metricsObject.promiseNumberOfRejects, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert02", function() {
        const filename = suiteCasePath + 'promise2.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 1);

        assert.equal(metricsObject.promiseNumberOfResolves, 0);
        assert.equal(metricsObject.promiseNumberOfRejects, 1);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert03", function() {
        const filename = suiteCasePath + 'promise3.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 2);

        assert.equal(metricsObject.promiseNumberOfResolves, 1);
        assert.equal(metricsObject.promiseNumberOfRejects, 1);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert04", function() {
        const filename = suiteCasePath + 'promise4.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 1);

        assert.equal(metricsObject.promiseNumberOfResolves, 1);
        assert.equal(metricsObject.promiseNumberOfRejects, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert05", function() {
        const filename = suiteCasePath + 'promise5.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 5);

        assert.equal(metricsObject.promiseNumberOfResolves, 2);
        assert.equal(metricsObject.promiseNumberOfRejects, 1);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);

    });

    it("assert06", function() {
        const filename = suiteCasePath + 'promise6.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 1);

        assert.equal(metricsObject.promiseNumberOfResolves, 0);
        assert.equal(metricsObject.promiseNumberOfRejects, 1);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 4);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert07", function() {
        const filename = suiteCasePath + 'promise7.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 1);

        assert.equal(metricsObject.promiseNumberOfResolves, 0);
        assert.equal(metricsObject.promiseNumberOfRejects, 1);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 2);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 4);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert08", function() {
        const filename = suiteCasePath + 'promise8.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 1);

        assert.equal(metricsObject.promiseNumberOfResolves, 0);
        assert.equal(metricsObject.promiseNumberOfRejects, 1);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 2);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 7);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);

    });

    it("assert09", function() {
        const filename = suiteCasePath + 'promise9.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 1);

        assert.equal(metricsObject.promiseNumberOfResolves, 0);
        assert.equal(metricsObject.promiseNumberOfRejects, 1);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 2);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert10", function() {
        const filename = suiteCasePath + 'promise10.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 1);

        assert.equal(metricsObject.promiseNumberOfResolves, 0);
        assert.equal(metricsObject.promiseNumberOfRejects, 1);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 2);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert11", function() {
        const filename = suiteCasePath + 'promise11.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 2);

        assert.equal(metricsObject.promiseNumberOfResolves, 2);
        assert.equal(metricsObject.promiseNumberOfRejects, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 2);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 2);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 2);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 1);

        assert.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert12", function() {
        const filename = suiteCasePath + 'promise12.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 2);

        assert.equal(metricsObject.promiseNumberOfResolves, 2);
        assert.equal(metricsObject.promiseNumberOfRejects, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 3);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 2);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 4);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 2);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 2);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 2);

        assert.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert13", function() {
        const filename = suiteCasePath + 'promise13.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 1);

        assert.equal(metricsObject.promiseNumberOfResolves, 0);
        assert.equal(metricsObject.promiseNumberOfRejects, 1);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 1);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 1);

        assert.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 1);
        assert.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert14", function() {
        const filename = suiteCasePath + 'promise14.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 1);

        assert.equal(metricsObject.promiseNumberOfResolves, 0);
        assert.equal(metricsObject.promiseNumberOfRejects, 1);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 1);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 1);

        assert.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 1);
        assert.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 1);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert15", function() {
        const filename = suiteCasePath + 'promise15.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 1);

        assert.equal(metricsObject.promiseNumberOfResolves, 0);
        assert.equal(metricsObject.promiseNumberOfRejects, 1);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 1);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 1);

        assert.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 1);
        assert.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 1);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert16", function() {
        const filename = suiteCasePath + 'promise16.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 1);

        assert.equal(metricsObject.promiseNumberOfResolves, 0);
        assert.equal(metricsObject.promiseNumberOfRejects, 1);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 1);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 1);

        assert.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 1);
        assert.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);

    });

    it("assert17", function() {
        const filename = suiteCasePath + 'promise17.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 1);

        assert.equal(metricsObject.promiseNumberOfResolves, 0);
        assert.equal(metricsObject.promiseNumberOfRejects, 1);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 2);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 8);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 1);

        assert.equal(metricsObject.promiseNumberOfReturnsOnCatches, 1);
        assert.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 1);
        assert.equal(metricsObject.promiseNumberOfBreaksOnCatches, 1);

        assert.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert18", function() {
        const filename = suiteCasePath + 'promise18.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 0);

        assert.equal(metricsObject.promiseNumberOfResolves, 0);
        assert.equal(metricsObject.promiseNumberOfRejects, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 2);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 1);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert19", function() {
        const filename = suiteCasePath + 'promise19.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 0);

        assert.equal(metricsObject.promiseNumberOfResolves, 0);
        assert.equal(metricsObject.promiseNumberOfRejects, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 2);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 2);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 2);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 1);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert20", function() {
        const filename = suiteCasePath + 'promise20.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 0);

        assert.equal(metricsObject.promiseNumberOfResolves, 0);
        assert.equal(metricsObject.promiseNumberOfRejects, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 3);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 2);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 1);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 1);

        assert.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);

    });

    it("assert21", function() {
        const filename = suiteCasePath + 'promise21.js';
        const data = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 2);
        assert.equal(metricsObject.promiseNumberOfNonCaughtPromises, 1);

    });

    it("assert22", function() {
        const filename = suiteCasePath + 'promise22.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 0);

        assert.equal(metricsObject.promiseNumberOfResolves, 0);
        assert.equal(metricsObject.promiseNumberOfRejects, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 2);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 2);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.promiseNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.promiseNumberOfThrowErrorsOnCatches, 2);
        assert.equal(metricsObject.promiseNumberOfRethrowsOnCatches, 0);
        assert.equal(metricsObject.promiseNumberOfThrowPrimitiveTypesOnCatches, 2);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 1);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

});