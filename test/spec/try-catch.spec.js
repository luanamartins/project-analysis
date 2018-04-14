require('dotenv').load();
const testCase = require('nodeunit').testCase;
const projectPath = process.env.RETRIEVE_SCRIPTS_ROOT_PATH;
const suiteCasePath = process.env.PROJECT_PATH + '/test/data/try-catch/';
const metricsModule = require(projectPath + '/metrics');


module.exports = testCase({

    "TC01": function (test) {
        const filename = suiteCasePath + 'try-catch1.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatchNumberOfTries, 1);
        test.equal(metricsObject.tryCatchNumberOfEmptyTries, 1);
        test.equal(metricsObject.tryCatchNumberOfTriesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfCatches, 1);
        test.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesLines, 4);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfThrows, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        test.equal(metricsObject.tryCatchNumberOfFinallies, 1);
        test.equal(metricsObject.tryCatchNumberOfFinalliesLines, 4);

        test.done();
    },

    "TC02": function (test) {
        const filename = suiteCasePath + 'try-catch2.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatchNumberOfTries, 1);
        test.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesLines, 2);
        test.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfCatches, 1);
        test.equal(metricsObject.tryCatchNumberOfEmptyCatches, 1);
        test.equal(metricsObject.tryCatchNumberOfCatchesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfThrows, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        test.equal(metricsObject.tryCatchNumberOfFinallies, 1);
        test.equal(metricsObject.tryCatchNumberOfFinalliesLines, 6);

        test.done();
    },

    "TC03": function (test) {
        const filename = suiteCasePath + 'try-catch3.js';

        const metrics = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatchNumberOfTries, 1);
        test.equal(metricsObject.tryCatchNumberOfEmptyTries, 1);
        test.equal(metricsObject.tryCatchNumberOfTriesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfCatches, 1);
        test.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesLines, 4);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfThrows, 1);
        test.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 1);

        test.equal(metricsObject.tryCatchNumberOfFinallies, 1);
        test.equal(metricsObject.tryCatchNumberOfFinalliesLines, 4);

        test.done();
    },

    "TC04": function (test) {
        const filename = suiteCasePath + 'try-catch4.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatchNumberOfTries, 1);
        test.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesLines, 1);
        test.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 1);

        test.equal(metricsObject.tryCatchNumberOfCatches, 1);
        test.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesLines, 1);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 1);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 1);

        test.equal(metricsObject.tryCatchNumberOfThrows, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        test.equal(metricsObject.tryCatchNumberOfFinallies, 1);
        test.equal(metricsObject.tryCatchNumberOfFinalliesLines, 3);

        test.done();
    },

    "TCObjectModel": function (test) {
        const filename = suiteCasePath + 'ObjectModel.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatchNumberOfTries, 0);
        test.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfCatches, 0);
        test.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfThrows, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        test.equal(metricsObject.tryCatchNumberOfFinallies, 0);
        test.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);

        test.done();
    },

    "TCTransformationOff": function (test) {
        const filename = suiteCasePath + 'TransformationOff.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatchNumberOfTries, 0);
        test.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfCatches, 0);
        test.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfThrows, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        test.equal(metricsObject.tryCatchNumberOfFinallies, 0);
        test.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);

        test.done();
    },

    "TCObject": function (test) {
        const filename = suiteCasePath + 'Object.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatchNumberOfTries, 0);
        test.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfCatches, 0);
        test.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfThrows, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        test.equal(metricsObject.tryCatchNumberOfFinallies, 0);
        test.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);

        test.done();
    },

    "TCStatementTestGenerator": function (test) {
        const filename = suiteCasePath + 'StatementTestGenerator.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatchNumberOfTries, 2);
        test.equal(metricsObject.tryCatchNumberOfEmptyTries, 2);
        test.equal(metricsObject.tryCatchNumberOfTriesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfCatches, 1);
        test.equal(metricsObject.tryCatchNumberOfEmptyCatches, 1);
        test.equal(metricsObject.tryCatchNumberOfCatchesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfThrows, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        test.equal(metricsObject.tryCatchNumberOfFinallies, 1);
        test.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);

        test.done();
    },

    "TC05": function (test) {
        const filename = suiteCasePath + 'try-catch5.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatchNumberOfTries, 2);
        test.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesLines, 10);
        test.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfCatches, 2);
        test.equal(metricsObject.tryCatchNumberOfEmptyCatches, 1);
        test.equal(metricsObject.tryCatchNumberOfCatchesLines, 2);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 1);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 1);

        test.equal(metricsObject.tryCatchNumberOfThrows, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        test.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        test.equal(metricsObject.tryCatchNumberOfFinallies, 0);
        test.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);

        test.done();
    },

    "TC06": function (test) {
        const filename = suiteCasePath + 'try-catch6.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = metrics[0];

        test.equal(metricsObject.tryCatchNumberOfTries, 1);
        test.equal(metricsObject.tryCatchNumberOfEmptyTries, 1);
        test.equal(metricsObject.tryCatchNumberOfTriesLines, 0);
        test.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        test.equal(metricsObject.tryCatchNumberOfCatches, 1);
        test.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesLines, 1);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        test.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 1);
        test.equal(metricsObject.tryCatchNumberOfCatchesThrowError, 1);

        test.equal(metricsObject.tryCatchNumberOfThrows, 1);
        test.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 1);
        test.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        test.equal(metricsObject.tryCatchNumberOfFinallies, 1);
        test.equal(metricsObject.tryCatchNumberOfFinalliesLines, 4);

        test.done();
    }

});