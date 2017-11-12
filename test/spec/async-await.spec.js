require('dotenv').load();
var testCase = require('nodeunit').testCase;
const metricsModule = require('../../retrieve-scripts/metrics');


module.exports = testCase({
    "TC01": function (test) {
        let filename = './test/data/async-await/async-await1.js';
        const reportJsonFile = './retrieve-scripts/report-object.json';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.asyncAwait.numberOfAsyncs, 1);
        test.equal(metricsObject.asyncAwait.numberOfAwaits, 1);
        test.equal(metricsObject.asyncAwait.numberOfTries, 1);
        test.equal(metricsObject.asyncAwait.numberOfTriesLines, 3);
        test.equal(metricsObject.asyncAwait.numberOfCatches, 1);
        test.equal(metricsObject.asyncAwait.numberOfEmptyCatches, 1);
        test.equal(metricsObject.asyncAwait.numberOfCatchesLines, 0);
        test.equal(metricsObject.asyncAwait.numberOfUniqueConsole, 0);
        test.equal(metricsObject.asyncAwait.numberOfFinalliesLines, 0);

        test.done();
    }
});