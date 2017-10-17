require('dotenv').load();
var testCase = require('nodeunit').testCase;

function startTest() {
    const metricsModule = require('../retrieve-scripts/metrics');
    let filename = './test/data/try-catch/try-catch1.js';
    const reportJsonFile = './retrieve-scripts/report-object.json';

    return metricsModule.handleMetrics([filename], reportJsonFile);
}

module.exports = testCase({
    "TC03:": function (test) {
        const metrics = startTest();
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatch.numberOfTries, 1);
        test.equal(metricsObject.tryCatch.numberOfEmptyTries, 1);
        test.equal(metricsObject.tryCatch.numberOfTriesLines, 0);
        test.equal(metricsObject.tryCatch.numberOfTriesWithUniqueStatement, 0);
        test.equal(metricsObject.tryCatch.numberOfCatches, 1);
        test.equal(metricsObject.tryCatch.numberOfEmptyCatches, 0);
        test.equal(metricsObject.tryCatch.numberOfCatchesLines, 3);
        test.equal(metricsObject.tryCatch.numberOfUniqueConsole, 0);
        test.equal(metricsObject.tryCatch.numberOfCatchesWithUniqueStatement, 0);
        test.equal(metricsObject.tryCatch.numberOfThrows, 1);
        test.equal(metricsObject.tryCatch.numberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatch.numberOfThrowsErrorObjects, 1);
        test.equal(metricsObject.tryCatch.numberOfFinallies, 1);
        test.equal(metricsObject.tryCatch.numberOfFinalliesLines, 4);

        test.done();
    }
});