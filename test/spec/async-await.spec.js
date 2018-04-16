require('dotenv').load();
const testCase = require('nodeunit').testCase;
const projectPath = process.env.RETRIEVE_SCRIPTS_ROOT_PATH;
const suiteCasePath = process.env.PROJECT_PATH + '/test/data/async-await/';
const metricsModule = require(projectPath + '/metrics');

module.exports = testCase({

    "TC01": function (test) {
        const filename = suiteCasePath + 'async-await1.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.numberOfStrictModeGlobal, 0);
        test.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
        test.equal(metricsObject.asyncAwaitNumberOfAwaits, 1);

        test.equal(metricsObject.asyncAwaitNumberOfTries, 1);
        test.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

        test.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
        test.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 1);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 0);
        test.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 0);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement, 0);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 0);

        test.equal(metricsObject.asyncAwaitNumberOfFinallies, 0);
        test.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 0);

        test.done();
    },


    "TC02": function (test) {
        const filename = suiteCasePath + 'async-await2.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.numberOfStrictModeGlobal, 0);
        test.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
        test.equal(metricsObject.asyncAwaitNumberOfAwaits, 1);

        test.equal(metricsObject.asyncAwaitNumberOfTries, 1);
        test.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

        test.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
        test.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 0);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 1);
        test.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 0);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement, 1);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 1);

        test.equal(metricsObject.asyncAwaitNumberOfFinallies, 0);
        test.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 0);

        test.done();
    },

    "TC03": function (test) {
        const filename = suiteCasePath + 'async-await3.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.numberOfStrictModeGlobal, 0);
        test.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
        test.equal(metricsObject.asyncAwaitNumberOfAwaits, 1);

        test.equal(metricsObject.asyncAwaitNumberOfTries, 1);
        test.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

        test.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
        test.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 0);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 1);
        test.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 0);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement, 1);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 1);

        test.equal(metricsObject.asyncAwaitNumberOfFinallies, 1);
        test.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 1);

        test.done();
    },

    "TC04": function (test) {
        const filename = suiteCasePath + 'async-await4.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.numberOfStrictModeGlobal, 0);
        test.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
        test.equal(metricsObject.asyncAwaitNumberOfAwaits, 1);

        test.equal(metricsObject.asyncAwaitNumberOfTries, 1);
        test.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

        test.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
        test.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 0);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 1);
        test.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 0);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement, 1);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 1);

        test.equal(metricsObject.asyncAwaitNumberOfFinallies, 1);
        test.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 3);

        test.done();
    },

    "TC05": function (test) {
        const filename = suiteCasePath + 'async-await5.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.numberOfStrictModeGlobal, 0);
        test.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
        test.equal(metricsObject.asyncAwaitNumberOfAwaits, 2);

        test.equal(metricsObject.asyncAwaitNumberOfTries, 1);
        test.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

        test.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
        test.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 0);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 2);
        test.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 1);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement, 0);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 0);

        test.equal(metricsObject.asyncAwaitNumberOfFinallies, 1);
        test.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 3);

        test.done();
    },

    "TC06": function (test) {
        const filename = suiteCasePath + 'async-await6.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.numberOfStrictModeGlobal, 1);
        test.equal(metricsObject.numberOfStrictModeLocal, 0);
        test.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
        test.equal(metricsObject.asyncAwaitNumberOfAwaits, 2);

        test.equal(metricsObject.asyncAwaitNumberOfTries, 1);
        test.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

        test.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
        test.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 0);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 2);
        test.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 1);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement, 0);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 0);

        test.equal(metricsObject.asyncAwaitNumberOfFinallies, 1);
        test.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 3);

        test.done();
    },

    "TC07": function (test) {
        const filename = suiteCasePath + 'async-await7.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.numberOfStrictModeGlobal, 0);
        test.equal(metricsObject.numberOfStrictModeLocal, 1);
        test.equal(metricsObject.asyncAwaitNumberOfAsyncs, 1);
        test.equal(metricsObject.asyncAwaitNumberOfAwaits, 2);

        test.equal(metricsObject.asyncAwaitNumberOfTries, 1);
        test.equal(metricsObject.asyncAwaitNumberOfTriesLines, 2);

        test.equal(metricsObject.asyncAwaitNumberOfCatches, 1);
        test.equal(metricsObject.asyncAwaitNumberOfEmptyCatches, 0);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesLines, 2);
        test.equal(metricsObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches, 1);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueStatement, 0);
        test.equal(metricsObject.asyncAwaitNumberOfCatchesWithUniqueConsole, 0);

        test.equal(metricsObject.asyncAwaitNumberOfFinallies, 1);
        test.equal(metricsObject.asyncAwaitNumberOfFinalliesLines, 3);

        test.done();
    }
});