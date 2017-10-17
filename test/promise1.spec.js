require('dotenv').load();
var testCase = require('nodeunit').testCase;

function startTest() {
    const metricsModule = require('../retrieve-scripts/metrics');
    let filename = './test/data/promise/promise1.js';
    const reportJsonFile = './retrieve-scripts/report-object.json';

    return metricsModule.handleMetrics([filename], reportJsonFile);
}

module.exports = testCase({
    "One promise only": function (test) {
        const metrics = startTest();
        const metricsObject = metrics[0];
        test.equal(metricsObject.promise.numberOfPromises, 0);

        test.done();
    },

    "Resolves": function (test) {
        const metrics = startTest();
        const metricsObject = metrics[0];
        test.equal(metricsObject.promise.numberOfResolves, 1);

        test.done();
    }
});