const assert = require("assert");
const CONFIG = require("../../config");

const projectPath = CONFIG["projectPath"];
const suiteCasePath = CONFIG["dataTestPath"] + "promise/";
const metricsModule = require(CONFIG["srcPath"] + "metrics/metrics");
const utilsModule = require(CONFIG["srcPath"] + "utils");

describe("Promises tests", function() {
    it("assert01", function() {
        const filename = suiteCasePath + 'promise1.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

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

        assert.equal(metricsObject.promiseNumberOfCatchesReturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesThrows, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesRethrows, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert02", function() {
        const filename = suiteCasePath + 'promise2.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

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

        assert.equal(metricsObject.promiseNumberOfCatchesReturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesThrows, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesRethrows, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert03", function() {
        const filename = suiteCasePath + 'promise3.js';
        const saveObject = utilsModule.getMetricsOnFileObject();             const data = metricsModule.handleMetrics([filename], saveObject);

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

        assert.equal(metricsObject.promiseNumberOfCatchesReturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesThrows, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesRethrows, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert04", function() {
        const filename = suiteCasePath + 'promise4.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

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

        assert.equal(metricsObject.promiseNumberOfCatchesReturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesThrows, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesRethrows, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert05", function() {
        const filename = suiteCasePath + 'promise5.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

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

        assert.equal(metricsObject.promiseNumberOfCatchesReturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesThrows, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesRethrows, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);

    });

    it("assert06", function() {
        const filename = suiteCasePath + 'promise6.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

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

        assert.equal(metricsObject.promiseNumberOfCatchesReturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesThrows, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesRethrows, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert07", function() {
        const filename = suiteCasePath + 'promise7.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

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

        assert.equal(metricsObject.promiseNumberOfCatchesReturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesThrows, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesRethrows, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert08", function() {
        const filename = suiteCasePath + 'promise8.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

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

        assert.equal(metricsObject.promiseNumberOfCatchesReturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesThrows, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesRethrows, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);

    });

    it("assert09", function() {
        const filename = suiteCasePath + 'promise9.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 1);

        assert.equal(metricsObject.promiseNumberOfResolves, 0);
        assert.equal(metricsObject.promiseNumberOfRejects, 1);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 2);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesReturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesThrows, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesRethrows, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert10", function() {
        const filename = suiteCasePath + 'promise10.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

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

        assert.equal(metricsObject.promiseNumberOfCatchesReturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesThrows, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesRethrows, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert11", function() {
        const filename = suiteCasePath + 'promise11.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 2);

        assert.equal(metricsObject.promiseNumberOfResolves, 2);
        assert.equal(metricsObject.promiseNumberOfRejects, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 2);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 2);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 2);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 1);

        assert.equal(metricsObject.promiseNumberOfCatchesReturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesThrows, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesRethrows, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert12", function() {
        const filename = suiteCasePath + 'promise12.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 2);

        assert.equal(metricsObject.promiseNumberOfResolves, 2);
        assert.equal(metricsObject.promiseNumberOfRejects, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 3);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 2);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 4);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 2);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 2);

        assert.equal(metricsObject.promiseNumberOfCatchesReturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesThrows, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesRethrows, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert13", function() {
        const filename = suiteCasePath + 'promise13.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

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

        assert.equal(metricsObject.promiseNumberOfCatchesReturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesThrows, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesRethrows, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert14", function() {
        const filename = suiteCasePath + 'promise14.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

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

        assert.equal(metricsObject.promiseNumberOfCatchesReturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesThrows, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesRethrows, 1);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert15", function() {
        const filename = suiteCasePath + 'promise15.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

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

        assert.equal(metricsObject.promiseNumberOfCatchesReturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesThrows, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesRethrows, 1);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert16", function() {
        const filename = suiteCasePath + 'promise16.js';
        const saveObject = utilsModule.getMetricsOnFileObject();             const data = metricsModule.handleMetrics([filename], saveObject);

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

        assert.equal(metricsObject.promiseNumberOfCatchesReturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesThrows, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesRethrows, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);

    });

    it("assert17", function() {
        const filename = suiteCasePath + 'promise17.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 1);

        assert.equal(metricsObject.promiseNumberOfResolves, 0);
        assert.equal(metricsObject.promiseNumberOfRejects, 1);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 2);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 8);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 1);

        assert.equal(metricsObject.promiseNumberOfCatchesReturns, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 1);

        assert.equal(metricsObject.promiseNumberOfCatchesThrows, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesRethrows, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert18", function() {
        const filename = suiteCasePath + 'promise18.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

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

        assert.equal(metricsObject.promiseNumberOfCatchesReturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesThrows, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesRethrows, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 1);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert19", function() {
        const filename = suiteCasePath + 'promise19.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

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

        assert.equal(metricsObject.promiseNumberOfCatchesReturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesThrows, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesRethrows, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 1);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert20", function() {
        const filename = suiteCasePath + 'promise20.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

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

        assert.equal(metricsObject.promiseNumberOfCatchesReturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesThrows, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesRethrows, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);

    });

    it("assert21", function() {
        const filename = suiteCasePath + 'promise21.js';
        const saveObject = utilsModule.getMetricsOnFileObject();             const data = metricsModule.handleMetrics([filename], saveObject);
        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 2);
        assert.equal(metricsObject.promiseNumberOfNonCaughtPromises, 1);

    });

    it("assert22", function() {
        const filename = suiteCasePath + 'promise22.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfPromises, 0);

        assert.equal(metricsObject.promiseNumberOfResolves, 0);
        assert.equal(metricsObject.promiseNumberOfRejects, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseThens, 2);
        assert.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        assert.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        assert.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 2);
        assert.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesReturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 0);

        assert.equal(metricsObject.promiseNumberOfCatchesThrows, 2);
        assert.equal(metricsObject.promiseNumberOfCatchesRethrows, 0);

        assert.equal(metricsObject.promiseNumberOfChainingCatches, 1);

        assert.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        assert.equal(metricsObject.promiseNumberOfPromiseAll, 0);
    });

    it("assert23", function() {
        const filename = suiteCasePath + 'promise23.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfFunctionsOnCatchesNoUsageOfErrorArgument, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesWithNoArg, 2);
        assert.equal(metricsObject.promiseNumberOfCatchesFunctionWithNoArg, 3);
        assert.equal(metricsObject.promiseNumberOfCatchesThatThrows, 5);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRethrows, 1);
    });

    it("assert24", function() {
        const filename = suiteCasePath + 'promise24.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfCatchesAlertOnly, 1);
        assert.equal(metricsObject.promiseNumberOfErrorReassigning, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesThrowsLiteral, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesThrowsErrorObject, 1);

    });

    it("assert25", function() {
        const filename = suiteCasePath + 'promise25.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.promiseNumberOfCatchesReturnsLiteral, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesReturnsErrorObject, 2);
        assert.equal(metricsObject.promiseNumberOfCatchesThatReturns, 7);
        assert.equal(metricsObject.promiseNumberOfCatchesThatReturnsLiteral, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesThatReturnsLiteralOnly, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesThatReturnsUndefined, 2);
        assert.equal(metricsObject.promiseNumberOfCatchesThatReturnsUndefinedOnly, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesThatReturnsNull, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesThatReturnsNullOnly, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesThatReturnsErrorObject, 2);
        assert.equal(metricsObject.promiseNumberOfCatchesThatRereturns, 1);
        assert.equal(metricsObject.promiseNumberOfCatchesContinues, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatContinues, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesBreaks, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesThatBreaks, 0);
        assert.equal(metricsObject.promiseNumberOfCatchesNonAnErrorObject, 1);

    });


});