var dotenv = require('dotenv');

var testCase = require('nodeunit').testCase;

function startTest() {
    const metricsModule = require('../retrieve-scripts/metrics');
    let filename = './test/data/try-catch/try-catch2.js';
    const reportJsonFile = './retrieve-scripts/report-object.json';

    return metricsModule.handleMetrics([filename], reportJsonFile);
}

module.exports = testCase({
    "Empty tries": function (test) {
        const array = startTest();
        const metricsObject = array[0];

        test.equal(metricsObject.tryCatch.numberOfEmptyTries, 0);

        const metric = metricsObject.tryCatch.numberOfTriesLines;
        test.equal(metric, 2);

        test.done();
    },

    "Catch lines": function (test) {

        const array = startTest();
        const metricsObject = array[0];

        test.equal(metricsObject.tryCatch.numberOfCatches, 1);
        test.equal(metricsObject.tryCatch.numberOfCatchesLines, 0);

        test.done();
    },

    "Finally lines": function (test) {

        const array = startTest();
        const metricsObject = array[0];

        test.equal(metricsObject.tryCatch.numberOfFinallies, 1);
        test.equal(metricsObject.tryCatch.numberOfFinalliesLines, 5);

        test.done();
    },

});