require('dotenv').load();
var testCase = require('nodeunit').testCase;

function startTest() {
    const metricsModule = require('../retrieve-scripts/metrics');
    let filename = './test/data/promise/promise1.js';
    const reportJsonFile = './retrieve-scripts/report-object.json';

    return metricsModule.handleMetrics([filename], reportJsonFile);
}

module.exports = testCase({
    "TC01": function (test) {
        const metrics = startTest();
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
    }
});