require('dotenv').load();
var testCase = require('nodeunit').testCase;

function startTest() {
    const metricsModule = require('../retrieve-scripts/metrics');
    let filename = './test/data/try-catch/try-catch1.js';
    const reportJsonFile = './retrieve-scripts/report-object.json';

    return metricsModule.handleMetrics([filename], reportJsonFile);
}

module.exports = testCase({
    "Empty tries": function (test) {
        const metrics = startTest();
        const metricsObject = metrics[0];
        const metric = metricsObject.tryCatch.numberOfEmptyTries;
        test.equal(metric, 1);

        test.done();
    },

    "Catch lines": function (test) {
        const metrics = startTest();
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatch.numberOfCatches, 1);
        test.equal(metricsObject.tryCatch.numberOfCatchesLines, 4);

        test.done();
    },

    "Finally lines": function (test) {
        const metrics = startTest();
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatch.numberOfFinallies, 1);
        test.equal(metricsObject.tryCatch.numberOfFinalliesLines, 4);

        test.done();
    },

});