require('dotenv').load();
var testCase = require('nodeunit').testCase;
const metricsModule = require('../../retrieve-scripts/metrics');

module.exports = testCase({
    "TC01": function (test) {
        const filename = './test/data/try-catch/try-catch1.js';
        const reportJsonFile = './retrieve-scripts';

        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatchNumberOfTries, 1);
        test.equal(metricsObject.tryCatchNumberOfEmptyTries, 1);
        test.equal(metricsObject.tryCatchNumberOfTriesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfCatches, 1);
        test.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesLines, 5);
        test.equal(metricsObject.tryCatchNumberOfUniqueConsole, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfThrows, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        test.equal(metricsObject.tryCatchNumberOfFinallies, 1);
        test.equal(metricsObject.tryCatchNumberOfFinalliesLines, 5);

        test.done();
    },

    "TC02": function (test) {
        const filename = './test/data/try-catch/try-catch2.js';
        const reportJsonFile = './retrieve-scripts';

        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatchNumberOfTries, 1);
        test.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesLines, 3);
        test.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfCatches, 1);
        test.equal(metricsObject.tryCatchNumberOfEmptyCatches, 1);
        test.equal(metricsObject.tryCatchNumberOfCatchesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfUniqueConsole, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfThrows, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        test.equal(metricsObject.tryCatchNumberOfFinallies, 1);
        test.equal(metricsObject.tryCatchNumberOfFinalliesLines, 7);

        test.done();
    },

    "TC03": function (test) {
        const filename = './test/data/try-catch/try-catch3.js';
        const reportJsonFile = './retrieve-scripts';

        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatchNumberOfTries, 1);
        test.equal(metricsObject.tryCatchNumberOfEmptyTries, 1);
        test.equal(metricsObject.tryCatchNumberOfTriesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfCatches, 1);
        test.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesLines, 5);
        test.equal(metricsObject.tryCatchNumberOfUniqueConsole, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfThrows, 1);
        test.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 1);

        test.equal(metricsObject.tryCatchNumberOfFinallies, 1);
        test.equal(metricsObject.tryCatchNumberOfFinalliesLines, 5);

        test.done();
    },

    "TC04": function (test) {
        const filename = './test/data/try-catch/try-catch4.js';
        const reportJsonFile = './retrieve-scripts';

        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatchNumberOfTries, 1);
        test.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesLines, 2);
        test.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 1);

        test.equal(metricsObject.tryCatchNumberOfCatches, 1);
        test.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesLines, 2);
        test.equal(metricsObject.tryCatchNumberOfUniqueConsole, 1);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 1);

        test.equal(metricsObject.tryCatchNumberOfThrows, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        test.equal(metricsObject.tryCatchNumberOfFinallies, 1);
        test.equal(metricsObject.tryCatchNumberOfFinalliesLines, 4);

        test.done();
    },

    "TC05": function (test) {
        const filename = './test/data/try-catch/ObjectModel.js';
        const reportJsonFile = './retrieve-scripts';

        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatchNumberOfTries, 0);
        test.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfCatches, 0);
        test.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfUniqueConsole, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfThrows, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        test.equal(metricsObject.tryCatchNumberOfFinallies, 0);
        test.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);

        test.done();
    },

    "TC06": function (test) {
        const filename = './test/data/try-catch/TransformationOff.js';
        const reportJsonFile = './retrieve-scripts';

        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatchNumberOfTries, 0);
        test.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfCatches, 0);
        test.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfUniqueConsole, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfThrows, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        test.equal(metricsObject.tryCatchNumberOfFinallies, 0);
        test.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);

        test.done();
    },

    "TC07": function (test) {
        const filename = './test/data/try-catch/Object.js';
        const reportJsonFile = './retrieve-scripts';

        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatchNumberOfTries, 0);
        test.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfCatches, 0);
        test.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfUniqueConsole, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfThrows, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        test.equal(metricsObject.tryCatchNumberOfFinallies, 0);
        test.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);

        test.done();
    },

    "TC08": function (test) {
        const filename = './test/data/try-catch/StatementTestGenerator.js';
        const reportJsonFile = './retrieve-scripts';

        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatchNumberOfTries, 2);
        test.equal(metricsObject.tryCatchNumberOfEmptyTries, 2);
        test.equal(metricsObject.tryCatchNumberOfTriesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfCatches, 1);
        test.equal(metricsObject.tryCatchNumberOfEmptyCatches, 1);
        test.equal(metricsObject.tryCatchNumberOfCatchesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfUniqueConsole, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfThrows, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        test.equal(metricsObject.tryCatchNumberOfFinallies, 1);
        test.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);

        test.done();
    }

});