require('dotenv').load();
var testCase = require('nodeunit').testCase;
const metricsModule = require('../../retrieve-scripts/metrics');

module.exports = testCase({
    "TC01": function (test) {
        const filename = './test/data/try-catch/try-catch1.js';
        const reportJsonFile = './retrieve-scripts';

        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatch.numberOfTries, 1);
        test.equal(metricsObject.tryCatch.numberOfEmptyTries, 1);
        test.equal(metricsObject.tryCatch.numberOfTriesLines, 0);
        test.equal(metricsObject.tryCatch.numberOfTriesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatch.numberOfCatches, 1);
        test.equal(metricsObject.tryCatch.numberOfEmptyCatches, 0);
        test.equal(metricsObject.tryCatch.numberOfCatchesLines, 5);
        test.equal(metricsObject.tryCatch.numberOfUniqueConsole, 0);
        test.equal(metricsObject.tryCatch.numberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatch.numberOfThrows, 0);
        test.equal(metricsObject.tryCatch.numberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatch.numberOfThrowsErrorObjects, 0);

        test.equal(metricsObject.tryCatch.numberOfFinallies, 1);
        test.equal(metricsObject.tryCatch.numberOfFinalliesLines, 5);

        test.done();
    },

    "TC02": function (test) {
        const filename = './test/data/try-catch/try-catch2.js';
        const reportJsonFile = './retrieve-scripts';

        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatch.numberOfTries, 1);
        test.equal(metricsObject.tryCatch.numberOfEmptyTries, 0);
        test.equal(metricsObject.tryCatch.numberOfTriesLines, 3);
        test.equal(metricsObject.tryCatch.numberOfTriesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatch.numberOfCatches, 1);
        test.equal(metricsObject.tryCatch.numberOfEmptyCatches, 1);
        test.equal(metricsObject.tryCatch.numberOfCatchesLines, 0);
        test.equal(metricsObject.tryCatch.numberOfUniqueConsole, 0);
        test.equal(metricsObject.tryCatch.numberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatch.numberOfThrows, 0);
        test.equal(metricsObject.tryCatch.numberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatch.numberOfThrowsErrorObjects, 0);

        test.equal(metricsObject.tryCatch.numberOfFinallies, 1);
        test.equal(metricsObject.tryCatch.numberOfFinalliesLines, 7);

        test.done();
    },

    "TC03": function (test) {
        const filename = './test/data/try-catch/try-catch3.js';
        const reportJsonFile = './retrieve-scripts';

        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatch.numberOfTries, 1);
        test.equal(metricsObject.tryCatch.numberOfEmptyTries, 1);
        test.equal(metricsObject.tryCatch.numberOfTriesLines, 0);
        test.equal(metricsObject.tryCatch.numberOfTriesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatch.numberOfCatches, 1);
        test.equal(metricsObject.tryCatch.numberOfEmptyCatches, 0);
        test.equal(metricsObject.tryCatch.numberOfCatchesLines, 5);
        test.equal(metricsObject.tryCatch.numberOfUniqueConsole, 0);
        test.equal(metricsObject.tryCatch.numberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatch.numberOfThrows, 1);
        test.equal(metricsObject.tryCatch.numberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatch.numberOfThrowsErrorObjects, 1);

        test.equal(metricsObject.tryCatch.numberOfFinallies, 1);
        test.equal(metricsObject.tryCatch.numberOfFinalliesLines, 5);

        test.done();
    },

    "TC04": function (test) {
        const filename = './test/data/try-catch/try-catch4.js';
        const reportJsonFile = './retrieve-scripts';

        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatch.numberOfTries, 1);
        test.equal(metricsObject.tryCatch.numberOfEmptyTries, 0);
        test.equal(metricsObject.tryCatch.numberOfTriesLines, 2);
        test.equal(metricsObject.tryCatch.numberOfTriesWithUniqueStatement, 1);

        test.equal(metricsObject.tryCatch.numberOfCatches, 1);
        test.equal(metricsObject.tryCatch.numberOfEmptyCatches, 0);
        test.equal(metricsObject.tryCatch.numberOfCatchesLines, 2);
        test.equal(metricsObject.tryCatch.numberOfUniqueConsole, 1);
        test.equal(metricsObject.tryCatch.numberOfCatchesWithUniqueStatement, 1);

        test.equal(metricsObject.tryCatch.numberOfThrows, 0);
        test.equal(metricsObject.tryCatch.numberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatch.numberOfThrowsErrorObjects, 0);

        test.equal(metricsObject.tryCatch.numberOfFinallies, 1);
        test.equal(metricsObject.tryCatch.numberOfFinalliesLines, 4);

        test.done();
    }

});