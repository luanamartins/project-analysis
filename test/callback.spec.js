var testCase = require('nodeunit').testCase;
const metricsModule = require('../retrieve-scripts/metrics');


module.exports = testCase({
    "TC01": function (test) {
        let filename = './test/data/callback/callback1.js';
        const reportJsonFile = './retrieve-scripts/report-object.json';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacks.numberOfCallbackAcceptingFunctions, 0);
        test.equal(metricsObject.callbacks.numberOfCallbackErrorFunctions, 1);
        test.equal(metricsObject.callbacks.numberOfEmptyCallbacks, 0);

        test.done();
    },

    "TC02": function (test) {
        let filename = './test/data/callback/callback2.js';
        const reportJsonFile = './retrieve-scripts/report-object.json';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacks.numberOfCallbackAcceptingFunctions, 0);
        test.equal(metricsObject.callbacks.numberOfCallbackErrorFunctions, 1);
        test.equal(metricsObject.callbacks.numberOfEmptyCallbacks, 1);

        test.done();
    }
});