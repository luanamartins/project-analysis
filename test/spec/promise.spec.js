require('dotenv').load();
var testCase = require('nodeunit').testCase;
const metricsModule = require('../../retrieve-scripts/metrics');


module.exports = testCase({

    "TC01": function (test) {
        const filename = './test/data/promise/promise1.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

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

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC02": function (test) {
        const filename = './test/data/promise/promise2.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 2);

        test.equal(metricsObject.promiseNumberOfResolves, 0);
        test.equal(metricsObject.promiseNumberOfRejects, 1);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 2);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC03": function (test) {
        const filename = './test/data/promise/promise3.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 3);

        test.equal(metricsObject.promiseNumberOfResolves, 1);
        test.equal(metricsObject.promiseNumberOfRejects, 1);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 0);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC04": function (test) {
        const filename = './test/data/promise/promise4.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 2);

        test.equal(metricsObject.promiseNumberOfResolves, 1);
        test.equal(metricsObject.promiseNumberOfRejects, 0);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 2);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 0);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC05": function (test) {
        const filename = './test/data/promise/promise5.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 6);

        test.equal(metricsObject.promiseNumberOfResolves, 2);
        test.equal(metricsObject.promiseNumberOfRejects, 1);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 2);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 0);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 1);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC06": function (test) {
        const filename = './test/data/promise/promise6.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 2);

        test.equal(metricsObject.promiseNumberOfResolves, 0);
        test.equal(metricsObject.promiseNumberOfRejects, 1);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 2);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 5);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC07": function (test) {
        const filename = './test/data/promise/promise7.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 2);

        test.equal(metricsObject.promiseNumberOfResolves, 0);
        test.equal(metricsObject.promiseNumberOfRejects, 1);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 3);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 5);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC08": function (test) {
        const filename = './test/data/promise/promise8.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 2);

        test.equal(metricsObject.promiseNumberOfResolves, 0);
        test.equal(metricsObject.promiseNumberOfRejects, 1);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 3);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 8);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 0);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 0);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC09": function (test) {
        const filename = './test/data/promise/promise9.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 2);

        test.equal(metricsObject.promiseNumberOfResolves, 0);
        test.equal(metricsObject.promiseNumberOfRejects, 1);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 3);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 1);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    },

    "TC10": function (test) {
        const filename = './test/data/promise/promise10.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promiseNumberOfPromises, 2);

        test.equal(metricsObject.promiseNumberOfResolves, 0);
        test.equal(metricsObject.promiseNumberOfRejects, 1);

        test.equal(metricsObject.promiseNumberOfPromiseThens, 1);
        test.equal(metricsObject.promiseNumberOfPromiseThenFulfilledLines, 3);
        test.equal(metricsObject.promiseNumberOfPromiseThenRejectedLines, 0);

        test.equal(metricsObject.promiseNumberOfPromiseCatches, 1);
        test.equal(metricsObject.promiseNumberOfPromiseCatchesLines, 0);
        test.equal(metricsObject.promiseNumberOfEmptyFunctionsOnPromiseCatches, 1);

        test.equal(metricsObject.promiseNumberOfPromiseRaces, 0);
        test.equal(metricsObject.promiseNumberOfPromiseAll, 0);

        test.done();
    }
});