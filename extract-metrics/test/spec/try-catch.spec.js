const assert = require("assert");
const CONFIG = require("../../config");

const projectPath = CONFIG["projectPath"];
const suiteCasePath = CONFIG["dataTestPath"] + "try-catch/";
const metricsModule = require(CONFIG["srcPath"] + "metrics/metrics");

describe("Try-catch tests", function() {
    it("assert01", function() {
        const filename = suiteCasePath + 'try-catch1.js';
        const data = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.tryCatchNumberOfTries, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyTries, 1);
        assert.equal(metricsObject.tryCatchNumberOfTriesLines, 0);
        assert.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesLines, 4);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfContinuesOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrows, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        assert.equal(metricsObject.tryCatchNumberOfFinallies, 1);
        assert.equal(metricsObject.tryCatchNumberOfFinalliesLines, 4);

        assert.equal(metricsObject.numberOfWindowOnError, 1);
    });

    it("assert02", function() {
        const filename = suiteCasePath + 'try-catch2.js';
        const data = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.tryCatchNumberOfTries, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        assert.equal(metricsObject.tryCatchNumberOfTriesLines, 2);
        assert.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfCatchesLines, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfContinuesOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrows, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        assert.equal(metricsObject.tryCatchNumberOfFinallies, 1);
        assert.equal(metricsObject.tryCatchNumberOfFinalliesLines, 6);
    });

    it("assert03", function() {
        const filename = suiteCasePath + 'try-catch3.js';

        const data = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.tryCatchNumberOfTries, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyTries, 1);
        assert.equal(metricsObject.tryCatchNumberOfTriesLines, 0);
        assert.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesLines, 4);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfContinuesOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrows, 1);
        assert.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 1);

        assert.equal(metricsObject.tryCatchNumberOfFinallies, 1);
        assert.equal(metricsObject.tryCatchNumberOfFinalliesLines, 4);
    });

    it("assert04", function() {
        const filename = suiteCasePath + 'try-catch4.js';
        const data = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.tryCatchNumberOfTries, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        assert.equal(metricsObject.tryCatchNumberOfTriesLines, 1);
        assert.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 1);

        assert.equal(metricsObject.tryCatchNumberOfCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesLines, 1);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 1);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 1);

        assert.equal(metricsObject.tryCatchNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfContinuesOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrows, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        assert.equal(metricsObject.tryCatchNumberOfFinallies, 1);
        assert.equal(metricsObject.tryCatchNumberOfFinalliesLines, 3);
    });

    it("TCObjectModel", function() {
        const filename = suiteCasePath + 'ObjectModel.js';
        const data = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.tryCatchNumberOfTries, 0);
        assert.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        assert.equal(metricsObject.tryCatchNumberOfTriesLines, 0);
        assert.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesLines, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfContinuesOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrows, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        assert.equal(metricsObject.tryCatchNumberOfFinallies, 0);
        assert.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);

    });

    it("TCTransformationOff", function() {
        const filename = suiteCasePath + 'TransformationOff.js';
        const data = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.tryCatchNumberOfTries, 0);
        assert.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        assert.equal(metricsObject.tryCatchNumberOfTriesLines, 0);
        assert.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesLines, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfContinuesOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrows, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        assert.equal(metricsObject.tryCatchNumberOfFinallies, 0);
        assert.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);
    });

    it("TCObject", function() {
        const filename = suiteCasePath + 'Object.js';
        const data = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.tryCatchNumberOfTries, 0);
        assert.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        assert.equal(metricsObject.tryCatchNumberOfTriesLines, 0);
        assert.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesLines, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfContinuesOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrows, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        assert.equal(metricsObject.tryCatchNumberOfFinallies, 0);
        assert.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);
    });

    it("TCStatementTestGenerator", function() {
        const filename = suiteCasePath + 'StatementTestGenerator.js';
        const data = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.tryCatchNumberOfTries, 2);
        assert.equal(metricsObject.tryCatchNumberOfEmptyTries, 2);
        assert.equal(metricsObject.tryCatchNumberOfTriesLines, 0);
        assert.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfCatchesLines, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfContinuesOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrows, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        assert.equal(metricsObject.tryCatchNumberOfFinallies, 1);
        assert.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);
    });

    it("assert05", function() {
        const filename = suiteCasePath + 'try-catch5.js';
        const data = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.tryCatchNumberOfTries, 2);
        assert.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        assert.equal(metricsObject.tryCatchNumberOfTriesLines, 10);
        assert.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfCatches, 2);
        assert.equal(metricsObject.tryCatchNumberOfEmptyCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfCatchesLines, 2);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 1);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 1);

        assert.equal(metricsObject.tryCatchNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfContinuesOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrows, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        assert.equal(metricsObject.tryCatchNumberOfFinallies, 0);
        assert.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);
    });

    it("assert06", function() {
        const filename = suiteCasePath + 'try-catch6.js';
        const data = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.tryCatchNumberOfTries, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyTries, 1);
        assert.equal(metricsObject.tryCatchNumberOfTriesLines, 0);
        assert.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesLines, 1);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 1);

        assert.equal(metricsObject.tryCatchNumberOfThrowErrorsOnCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfContinuesOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrows, 1);
        assert.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 1);
        assert.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        assert.equal(metricsObject.tryCatchNumberOfFinallies, 1);
        assert.equal(metricsObject.tryCatchNumberOfFinalliesLines, 4);
    });

    it("assert07", function() {
        const filename = suiteCasePath + 'try-catch7.js';
        const data = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.tryCatchNumberOfTries, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        assert.equal(metricsObject.tryCatchNumberOfTriesLines, 2);
        assert.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesLines, 1);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 1);

        assert.equal(metricsObject.tryCatchNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfContinuesOnCatches, 1);

        assert.equal(metricsObject.tryCatchNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrows, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        assert.equal(metricsObject.tryCatchNumberOfFinallies, 0);
        assert.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);
    });

    it("assert08", function() {
        const filename = suiteCasePath + 'try-catch8.js';
        const data = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.tryCatchNumberOfTries, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        assert.equal(metricsObject.tryCatchNumberOfTriesLines, 2);
        assert.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesLines, 3);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 1);

        assert.equal(metricsObject.tryCatchNumberOfThrowErrorsOnCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfContinuesOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrows, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        assert.equal(metricsObject.tryCatchNumberOfFinallies, 0);
        assert.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);
    });

    it("assert09", function() {
        const filename = suiteCasePath + 'try-catch9.js';
        const data = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.tryCatchNumberOfTries, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        assert.equal(metricsObject.tryCatchNumberOfTriesLines, 2);
        assert.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesLines, 3);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 1);

        assert.equal(metricsObject.tryCatchNumberOfThrowErrorsOnCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfRethrowsOnCatches, 1);

        assert.equal(metricsObject.tryCatchNumberOfContinuesOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrows, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        assert.equal(metricsObject.tryCatchNumberOfFinallies, 0);
        assert.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);
    });

    it("assert10", function() {
        const filename = suiteCasePath + 'try-catch10.js';
        const data = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.tryCatchNumberOfTries, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        assert.equal(metricsObject.tryCatchNumberOfTriesLines, 2);
        assert.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesLines, 3);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 1);

        assert.equal(metricsObject.tryCatchNumberOfThrowErrorsOnCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfRethrowsOnCatches, 1);

        assert.equal(metricsObject.tryCatchNumberOfContinuesOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrows, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        assert.equal(metricsObject.tryCatchNumberOfFinallies, 0);
        assert.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);
    });

    it("assert11", function() {
        const filename = suiteCasePath + 'try-catch11.js';
        const data = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.tryCatchNumberOfTries, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        assert.equal(metricsObject.tryCatchNumberOfTriesLines, 2);
        assert.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesLines, 3);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 1);

        assert.equal(metricsObject.tryCatchNumberOfThrowErrorsOnCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfContinuesOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrows, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        assert.equal(metricsObject.tryCatchNumberOfFinallies, 0);
        assert.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);
    });

    it("assert12", function() {
        const filename = suiteCasePath + 'try-catch12.js';
        const data = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.tryCatchNumberOfTries, 2);
        assert.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        assert.equal(metricsObject.tryCatchNumberOfTriesLines, 6);
        assert.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfCatches, 2);
        assert.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesLines, 4);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 2);

        assert.equal(metricsObject.tryCatchNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfContinuesOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfReturnsOnCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfBreaksOnCatches, 1);

        assert.equal(metricsObject.tryCatchNumberOfThrows, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        assert.equal(metricsObject.tryCatchNumberOfFinallies, 0);
        assert.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);
    });

    it("assert13", function() {
        const filename = suiteCasePath + 'try-catch13.js';
        const data = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.tryCatchNumberOfTries, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        assert.equal(metricsObject.tryCatchNumberOfTriesLines, 2);
        assert.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesLines, 1);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 1);

        assert.equal(metricsObject.tryCatchNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfContinuesOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfBreaksOnCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfBreaksOnCatchesUniqueStatement, 1);

        assert.equal(metricsObject.tryCatchNumberOfThrows, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        assert.equal(metricsObject.tryCatchNumberOfFinallies, 0);
        assert.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);
    });

    it("assert14", function() {
        const filename = suiteCasePath + 'try-catch14.js';
        const data = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.tryCatchNumberOfTries, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyTries, 0);
        assert.equal(metricsObject.tryCatchNumberOfTriesLines, 2);
        assert.equal(metricsObject.tryCatchNumberOfTriesWithUniqueStatement, 0);

        assert.equal(metricsObject.tryCatchNumberOfCatches, 1);
        assert.equal(metricsObject.tryCatchNumberOfEmptyCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesLines, 5);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueConsole, 0);
        assert.equal(metricsObject.tryCatchNumberOfCatchesWithUniqueStatement, 1);

        assert.equal(metricsObject.tryCatchNumberOfThrowErrorsOnCatches, 2);
        assert.equal(metricsObject.tryCatchNumberOfRethrowsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowPrimitiveTypesOnCatches, 2);

        assert.equal(metricsObject.tryCatchNumberOfContinuesOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.tryCatchNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.tryCatchNumberOfThrows, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsLiteral, 0);
        assert.equal(metricsObject.tryCatchNumberOfThrowsErrorObjects, 0);

        assert.equal(metricsObject.tryCatchNumberOfFinallies, 0);
        assert.equal(metricsObject.tryCatchNumberOfFinalliesLines, 0);
    });

    it("assert15", function() {
        const filename = suiteCasePath + 'try-catch15.js';
        const data = metricsModule.handleMetrics([filename], projectPath);
        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.tryCatchNumberOfCatchesNoUsageOfErrorArgument, 1);
        assert.equal(metricsObject.tryCatchNumberOfCatchesThatThrows, 3);
        assert.equal(metricsObject.tryCatchNumberOfCatchesThatRethrows, 2);
    });

});