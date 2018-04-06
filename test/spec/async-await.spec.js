require('dotenv').load();
var testCase = require('nodeunit').testCase;
const metricsModule = require('../../retrieve-scripts/metrics');

module.exports = testCase({

    "TC01": function (test) {
        const filename = './test/data/async-await/async-await1.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
        test.equal(metricsObject.asyncAwaitNumberOfAwaits, 1);

        test.equal(metricsObject.asyncAwaitNumberOfTries, 1);
        test.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

        test.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
        test.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 1);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 0);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 0);

        test.equal(metricsObject.asyncAwaitNumberOfFinallies, 0);
        test.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 0);

        test.done();
    },


    "TC02": function (test) {
        const filename = './test/data/async-await/async-await2.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
        test.equal(metricsObject.asyncAwaitNumberOfAwaits, 1);

        test.equal(metricsObject.asyncAwaitNumberOfTries, 1);
        test.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

        test.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
        test.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 0);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 1);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 1);

        test.equal(metricsObject.asyncAwaitNumberOfFinallies, 0);
        test.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 0);

        test.done();
    },

    "TC03": function (test) {
        const filename = './test/data/async-await/async-await3.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
        test.equal(metricsObject.asyncAwaitNumberOfAwaits, 1);

        test.equal(metricsObject.asyncAwaitNumberOfTries, 1);
        test.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

        test.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
        test.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 0);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 1);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 1);

        test.equal(metricsObject.asyncAwaitNumberOfFinallies, 1);
        test.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 1);

        test.done();
    },

    "TC04": function (test) {
        const filename = './test/data/async-await/async-await4.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
        test.equal(metricsObject.asyncAwaitNumberOfAwaits, 1);

        test.equal(metricsObject.asyncAwaitNumberOfTries, 1);
        test.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

        test.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
        test.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 0);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 1);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 1);

        test.equal(metricsObject.asyncAwaitNumberOfFinallies, 1);
        test.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 3);

        test.done();
    }
});