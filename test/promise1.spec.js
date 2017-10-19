require('dotenv').load();
var testCase = require('nodeunit').testCase;
const metricsModule = require('../retrieve-scripts/metrics');


module.exports = testCase({
    "TC01": function (test) {

        let filename = './test/data/promise/promise1.js';
        const reportJsonFile = './retrieve-scripts/report-object.json';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promise.numberOfPromises, 0);
        test.equal(metricsObject.promise.numberOfResolves, 1);
        test.equal(metricsObject.promise.numberOfRejects, 0);
        test.equal(metricsObject.promise.numberOfPromiseThens, 0);
        test.equal(metricsObject.promise.numberOfPromiseThenLines, 0);
        test.equal(metricsObject.promise.numberOfPromiseCatches, 0);
        test.equal(metricsObject.promise.numberOfPromiseCatchesLines, 0);
        test.equal(metricsObject.promise.numberOfEmptyFunctionsOnPromiseCatches, 0);
        test.equal(metricsObject.promise.numberOfPromiseRaces, 0);
        test.equal(metricsObject.promise.numberOfPromiseAll, 0);

        test.done();
    },

    "TC02": function (test) {

        let filename = './test/data/promise/promise2.js';
        const reportJsonFile = './retrieve-scripts/report-object.json';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promise.numberOfPromises, 1);
        test.equal(metricsObject.promise.numberOfResolves, 0);
        test.equal(metricsObject.promise.numberOfRejects, 1);
        test.equal(metricsObject.promise.numberOfPromiseThens, 1);
        test.equal(metricsObject.promise.numberOfPromiseThenLines, 1);
        test.equal(metricsObject.promise.numberOfPromiseCatches, 1);
        test.equal(metricsObject.promise.numberOfPromiseCatchesLines, 1);
        test.equal(metricsObject.promise.numberOfEmptyFunctionsOnPromiseCatches, 0);
        test.equal(metricsObject.promise.numberOfPromiseRaces, 0);
        test.equal(metricsObject.promise.numberOfPromiseAll, 0);

        test.done();
    },

    "TC03": function (test) {

        let filename = './test/data/promise/promise3.js';
        const reportJsonFile = './retrieve-scripts/report-object.json';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.promise.numberOfPromises, 2);
        test.equal(metricsObject.promise.numberOfResolves, 1);
        test.equal(metricsObject.promise.numberOfRejects, 1);
        test.equal(metricsObject.promise.numberOfPromiseThens, 1);
        test.equal(metricsObject.promise.numberOfPromiseThenLines, 1);
        test.equal(metricsObject.promise.numberOfPromiseCatches, 1);
        test.equal(metricsObject.promise.numberOfPromiseCatchesLines, 1);
        test.equal(metricsObject.promise.numberOfEmptyFunctionsOnPromiseCatches, 0);
        test.equal(metricsObject.promise.numberOfPromiseRaces, 0);
        test.equal(metricsObject.promise.numberOfPromiseAll, 0);

        test.done();
    }
});