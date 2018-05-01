require('dotenv').load();
const testCase = require('nodeunit').testCase;
const projectPath = process.env.RETRIEVE_SCRIPTS_ROOT_PATH;
const suiteCasePath = process.env.PROJECT_PATH + '/test/data/event/';
const metricsModule = require(projectPath + '/metrics');


module.exports = testCase({

    "TC01": function (test) {
        const filename = suiteCasePath + 'event1.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.eventsNumberOfEventMethodsOn, 0);
        test.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        test.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        test.equal(metricsObject.eventsNumberOfEventOnLines, 0);
        test.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        test.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        test.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 0);
        test.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        test.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 0);
        test.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.eventsNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.eventsNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        test.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        test.equal(metricsObject.eventsTotalOfStringEvents, 1);
        test.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);

        test.done();
    },

    "TC02": function (test) {
        const filename = suiteCasePath + 'event2.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.eventsNumberOfEventMethodsOn, 1);
        test.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        test.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        test.equal(metricsObject.eventsNumberOfEventOnLines, 1);
        test.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        test.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        test.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 0);
        test.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        test.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 0);
        test.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.eventsNumberOfReturnsOnCatches, 1);
        test.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 1);
        test.equal(metricsObject.eventsNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        test.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        test.equal(metricsObject.eventsTotalOfStringEvents, 3);
        test.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);

        test.done();
    },

    "TC03": function (test) {
        const filename = suiteCasePath + 'event3.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.eventsNumberOfEventMethodsOn, 2);
        test.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        test.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        test.equal(metricsObject.eventsNumberOfEventOnLines, 4);
        test.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        test.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        test.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 1);
        test.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        test.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 0);
        test.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.eventsNumberOfReturnsOnCatches, 1);
        test.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 1);
        test.equal(metricsObject.eventsNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.eventsNumberOfEventUncaughtException, 1);
        test.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        test.equal(metricsObject.eventsTotalOfStringEvents, 4);
        test.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);

        test.done();
    },

    "TC04": function (test) {
        const filename = suiteCasePath + 'event4.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.eventsNumberOfEventMethodsOn, 2);
        test.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        test.equal(metricsObject.eventsNumberOfEventMethodsEmit, 1);

        test.equal(metricsObject.eventsNumberOfEventOnLines, 4);
        test.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        test.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        test.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 2);
        test.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        test.equal(metricsObject.eventsNumberOfEventOnceWithUniqueStatement, 0);
        test.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        test.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 0);
        test.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.eventsNumberOfReturnsOnCatches, 2);
        test.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.eventsNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        test.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        test.equal(metricsObject.eventsTotalOfStringEvents, 3);
        test.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);

        test.done();
    },

    "TC05": function (test) {
        const filename = suiteCasePath + 'event5.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.eventsNumberOfEventMethodsOn, 2);
        test.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        test.equal(metricsObject.eventsNumberOfEventMethodsEmit, 1);

        test.equal(metricsObject.eventsNumberOfEventOnLines, 9);
        test.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        test.equal(metricsObject.eventsNumberOfEventEmitLines, 4);

        test.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 2);
        test.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        test.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 0);
        test.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.eventsNumberOfReturnsOnCatches, 1);
        test.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.eventsNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        test.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        test.equal(metricsObject.eventsTotalOfStringEvents, 3);
        test.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);

        test.done();
    },


    "TC07": function (test) {
        const filename = suiteCasePath + 'event7.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.eventsNumberOfEventMethodsOn, 1);
        test.equal(metricsObject.eventsNumberOfEventMethodsOnce, 2);
        test.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        test.equal(metricsObject.eventsNumberOfEventOnLines, 6);
        test.equal(metricsObject.eventsNumberOfEventOnceLines, 7);
        test.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        test.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 1);
        test.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 2);

        test.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 0);
        test.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.eventsNumberOfReturnsOnCatches, 1);
        test.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.eventsNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        test.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        test.equal(metricsObject.eventsTotalOfStringEvents, 3);
        test.equal(metricsObject.eventsTotalOfEventsExceptStringType, 2);

        test.done();
    },

    "TC08": function (test) {
        const filename = suiteCasePath + 'event8.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.eventsNumberOfEventMethodsOn, 2);
        test.equal(metricsObject.eventsNumberOfEventMethodsOnce, 2);
        test.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        test.equal(metricsObject.eventsNumberOfEventOnLines, 9);
        test.equal(metricsObject.eventsNumberOfEventOnceLines, 7);
        test.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        test.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 2);
        test.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 2);

        test.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 0);
        test.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.eventsNumberOfReturnsOnCatches, 1);
        test.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.eventsNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        test.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 1);

        test.equal(metricsObject.eventsTotalOfStringEvents, 4);
        test.equal(metricsObject.eventsTotalOfEventsExceptStringType, 2);

        test.done();
    },

    "TC09": function (test) {
        const filename = suiteCasePath + 'event9.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.eventsNumberOfEventMethodsOn, 1);
        test.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        test.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        test.equal(metricsObject.eventsNumberOfEventOnLines, 1);
        test.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        test.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        test.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 1);
        test.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        test.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 1);
        test.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.eventsNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.eventsNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        test.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        test.equal(metricsObject.eventsTotalOfStringEvents, 1);
        test.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);

        test.done();
    },

    "TC10": function (test) {
        const filename = suiteCasePath + 'event10.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.eventsNumberOfEventMethodsOn, 1);
        test.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        test.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        test.equal(metricsObject.eventsNumberOfEventOnLines, 1);
        test.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        test.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        test.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 0);
        test.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        test.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 1);
        test.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 1);

        test.equal(metricsObject.eventsNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.eventsNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        test.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        test.equal(metricsObject.eventsTotalOfStringEvents, 1);
        test.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);

        test.done();
    },

    "TC11": function (test) {
        const filename = suiteCasePath + 'event11.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.eventsNumberOfEventMethodsOn, 1);
        test.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        test.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        test.equal(metricsObject.eventsNumberOfEventOnLines, 1);
        test.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        test.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        test.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 0);
        test.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        test.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 1);
        test.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 1);

        test.equal(metricsObject.eventsNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.eventsNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        test.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        test.equal(metricsObject.eventsTotalOfStringEvents, 1);
        test.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);

        test.done();
    },

    "TC12": function (test) {
        const filename = suiteCasePath + 'event12.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.eventsNumberOfEventMethodsOn, 3);
        test.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        test.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        test.equal(metricsObject.eventsNumberOfEventOnLines, 11);
        test.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        test.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        test.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 2);
        test.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        test.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 0);
        test.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 0);

        test.equal(metricsObject.eventsNumberOfReturnsOnCatches, 2);
        test.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 1);
        test.equal(metricsObject.eventsNumberOfBreaksOnCatches, 1);

        test.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        test.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        test.equal(metricsObject.eventsTotalOfStringEvents, 3);
        test.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);

        test.done();
    }

});