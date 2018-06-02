const assert = require("assert");
const CONFIG = require("../../config");

const projectPath = CONFIG["projectPath"];
const suiteCasePath = CONFIG["dataTestPath"] + "async-await/";
const metricsModule = require(CONFIG["srcPath"] + "metrics/metrics");

describe("Async-await", function() {

  describe("Async-await tests", function() {
    it("assert01", function() {
      const filename = suiteCasePath + "async-await1.js";
      const data = metricsModule.handleMetrics([filename],projectPath);

      const metricsObject = data.metrics[0];

      assert.equal(metricsObject.numberOfStrictModeGlobal, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaits, 1);

      assert.equal(metricsObject.asyncAwaitNumberOfTries, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 0);
      assert.equal(
        metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement,
        0
      );
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfThrowErrorsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfRethrowsOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfReturnsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfReturnsAnErrorOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfBreaksOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfFinallies, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 0);
    });

    it("assert02", function() {
      const filename = suiteCasePath + "async-await2.js";
      const data = metricsModule.handleMetrics([filename], projectPath);

      const metricsObject = data.metrics[0];

      assert.equal(metricsObject.numberOfStrictModeGlobal, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaits, 1);

      assert.equal(metricsObject.asyncAwaitNumberOfTries, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 0);
      assert.equal(
        metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement,
        1
      );
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 1);

      assert.equal(metricsObject.asyncAwaitNumberOfThrowErrorsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfRethrowsOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfReturnsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfReturnsAnErrorOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfBreaksOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfFinallies, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 0);
    });

    it("assert03", function() {
      const filename = suiteCasePath + "async-await3.js";
      const data = metricsModule.handleMetrics([filename], projectPath);

      const metricsObject = data.metrics[0];

      assert.equal(metricsObject.numberOfStrictModeGlobal, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaits, 1);

      assert.equal(metricsObject.asyncAwaitNumberOfTries, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 1);

      assert.equal(metricsObject.asyncAwaitNumberOfThrowErrorsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfRethrowsOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfReturnsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfReturnsAnErrorOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfBreaksOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfFinallies, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 1);
    });

    it("assert04", function() {
      const filename = suiteCasePath + "async-await4.js";
      const data = metricsModule.handleMetrics([filename], projectPath);

      const metricsObject = data.metrics[0];

      assert.equal(metricsObject.numberOfStrictModeGlobal, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaits, 1);

      assert.equal(metricsObject.asyncAwaitNumberOfTries, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 1);

      assert.equal(metricsObject.asyncAwaitNumberOfThrowErrorsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfRethrowsOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfReturnsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfReturnsAnErrorOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfBreaksOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfFinallies, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 3);
    });

    it("assert05", function() {
      const filename = suiteCasePath + "async-await5.js";
      const data = metricsModule.handleMetrics([filename], projectPath);

      const metricsObject = data.metrics[0];

      assert.equal(metricsObject.numberOfStrictModeGlobal, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaits, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfTries, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 2);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfThrowErrorsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfRethrowsOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfReturnsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfReturnsAnErrorOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfBreaksOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfFinallies, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 3);

    });

    it("assert06", function() {
      const filename = suiteCasePath + "async-await6.js";
      const data = metricsModule.handleMetrics([filename], projectPath);

      const metricsObject = data.metrics[0];

      assert.equal(metricsObject.numberOfStrictModeGlobal, 1);
      assert.equal(metricsObject.numberOfStrictModeLocal, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaits, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfTries, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 2);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfThrowErrorsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfRethrowsOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfReturnsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfReturnsAnErrorOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfBreaksOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfFinallies, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 3);
    });

    it("assert07", function() {
      const filename = suiteCasePath + "async-await7.js";
      const data = metricsModule.handleMetrics([filename], projectPath);

      const metricsObject = data.metrics[0];

      assert.equal(metricsObject.numberOfStrictModeGlobal, 0);
      assert.equal(metricsObject.numberOfStrictModeLocal, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaits, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfTries, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 2);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfThrowErrorsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfRethrowsOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfReturnsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfReturnsAnErrorOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfBreaksOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfFinallies, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 3);
    });

    it("assert08", function() {
      const filename = suiteCasePath + "async-await8.js";
      const data = metricsModule.handleMetrics([filename], projectPath);

      const metricsObject = data.metrics[0];

      assert.equal(metricsObject.numberOfStrictModeGlobal, 0);
      assert.equal(metricsObject.numberOfStrictModeLocal, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaits, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfTries, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 4);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfThrowErrorsOnCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfRethrowsOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfReturnsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfReturnsAnErrorOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfBreaksOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfFinallies, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 3);
    });

    it("assert09", function() {
      const filename = suiteCasePath + "async-await9.js";
      const data = metricsModule.handleMetrics([filename], projectPath);

      const metricsObject = data.metrics[0];

      assert.equal(metricsObject.numberOfStrictModeGlobal, 0);
      assert.equal(metricsObject.numberOfStrictModeLocal, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaits, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfTries, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 4);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfThrowErrorsOnCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfRethrowsOnCatches, 1);

      assert.equal(metricsObject.asyncAwaitNumberOfReturnsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfReturnsAnErrorOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfBreaksOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfFinallies, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 3);
    });

    it("assert10", function() {
      const filename = suiteCasePath + "async-await10.js";
      const data = metricsModule.handleMetrics([filename], projectPath);

      const metricsObject = data.metrics[0];

      assert.equal(metricsObject.numberOfStrictModeGlobal, 0);
      assert.equal(metricsObject.numberOfStrictModeLocal, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaits, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfTries, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 4);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfThrowErrorsOnCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfRethrowsOnCatches, 1);

      assert.equal(metricsObject.asyncAwaitNumberOfReturnsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfReturnsAnErrorOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfBreaksOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfFinallies, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 3);
    });

    it("assert11", function() {
      const filename = suiteCasePath + "async-await11.js";
      const data = metricsModule.handleMetrics([filename], projectPath);

      const metricsObject = data.metrics[0];

      assert.equal(metricsObject.numberOfStrictModeGlobal, 0);
      assert.equal(metricsObject.numberOfStrictModeLocal, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaits, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfTries, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 6);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfThrowErrorsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfRethrowsOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfReturnsOnCatches, 2);
      assert.equal(metricsObject.asyncAwaitNumberOfReturnsAnErrorOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfBreaksOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfFinallies, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 3);
    });

    it("assert12", function() {
      const filename = suiteCasePath + "async-await12.js";
      const data = metricsModule.handleMetrics([filename], projectPath);

      const metricsObject = data.metrics[0];

      assert.equal(metricsObject.numberOfStrictModeGlobal, 0);
      assert.equal(metricsObject.numberOfStrictModeLocal, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaits, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfTries, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 6);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfThrowErrorsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfRethrowsOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfReturnsOnCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfReturnsAnErrorOnCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfBreaksOnCatches, 1);

      assert.equal(metricsObject.asyncAwaitNumberOfFinallies, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 3);
    });

    it("assert13", function() {
      const filename = suiteCasePath + "async-await13.js";
      const data = metricsModule.handleMetrics([filename], projectPath);

      const metricsObject = data.metrics[0];

      assert.equal(metricsObject.numberOfStrictModeGlobal, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaits, 1);

      assert.equal(metricsObject.asyncAwaitNumberOfTries, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 1);

      assert.equal(metricsObject.asyncAwaitNumberOfThrowErrorsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfRethrowsOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfReturnsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfReturnsAnErrorOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfBreaksOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfFinallies, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 1);
    });

    it("assert14", function() {
      const filename = suiteCasePath + "async-await14.js";
      const data = metricsModule.handleMetrics([filename], projectPath);

      const metricsObject = data.metrics[0];

      assert.equal(metricsObject.numberOfStrictModeGlobal, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaits, 1);

      assert.equal(metricsObject.asyncAwaitNumberOfTries, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfTriesLines, 1);

      assert.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfThrowErrorsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfRethrowsOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfReturnsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfReturnsAnErrorOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfBreaksOnCatches, 1);
      assert.equal(
        metricsObject.asyncAwaitNumberOfBreaksOnCatchesUniqueStatement,
        1
      );

      assert.equal(metricsObject.asyncAwaitNumberOfFinallies, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 0);
    });

    it("assert15", function() {
      const filename = suiteCasePath + "async-await15.js";
      const data = metricsModule.handleMetrics([filename], projectPath);

      const metricsObject = data.metrics[0];

      assert.equal(metricsObject.numberOfStrictModeGlobal, 0);
      assert.equal(metricsObject.numberOfStrictModeLocal, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaits, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfTries, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

      assert.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 6);
      assert.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfThrowErrorsOnCatches, 2);
      assert.equal(metricsObject.asyncAwaitNumberOfRethrowsOnCatches, 0);
      assert.equal(
        metricsObject.asyncAwaitNumberOfThrowPrimitiveTypesOnCatches,
        2
      );

      assert.equal(metricsObject.asyncAwaitNumberOfReturnsOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfReturnsAnErrorOnCatches, 0);
      assert.equal(metricsObject.asyncAwaitNumberOfBreaksOnCatches, 0);

      assert.equal(metricsObject.asyncAwaitNumberOfFinallies, 1);
      assert.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 3);
    });
  });
});
