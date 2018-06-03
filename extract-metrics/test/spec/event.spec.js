const assert = require("assert");
const CONFIG = require("../../config");

const projectPath = CONFIG["projectPath"];
const suiteCasePath = CONFIG["dataTestPath"] + "event/";
const metricsModule = require(CONFIG["srcPath"] + "metrics/metrics");

describe("Events tests", function() {
    it("assert01", function() {
        const filename = suiteCasePath + 'event1.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 0);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.eventsNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 1);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });

    it("assert02", function() {
        const filename = suiteCasePath + 'event2.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 1);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 1);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 0);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.eventsNumberOfReturnsOnCatches, 1);
        assert.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 1);
        assert.equal(metricsObject.eventsNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 3);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });

    it("assert03", function() {
        const filename = suiteCasePath + 'event3.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 2);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 4);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 1);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.eventsNumberOfReturnsOnCatches, 1);
        assert.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 1);
        assert.equal(metricsObject.eventsNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 1);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 4);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });

    it("assert04", function() {
        const filename = suiteCasePath + 'event4.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 2);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 1);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 4);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 2);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnceWithUniqueStatement, 0);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.eventsNumberOfReturnsOnCatches, 2);
        assert.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 3);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });

    it("assert05", function() {
        const filename = suiteCasePath + 'event5.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 2);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 1);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 9);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 4);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 2);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.eventsNumberOfReturnsOnCatches, 1);
        assert.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 3);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });

    it("assert06", function() {
        const filename = suiteCasePath + 'event5.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 2);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 1);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 9);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 4);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 2);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.eventsNumberOfReturnsOnCatches, 1);
        assert.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 3);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });

    it("assert07", function() {
        const filename = suiteCasePath + 'event7.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 1);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 2);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 6);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 7);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 1);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 2);

        assert.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.eventsNumberOfReturnsOnCatches, 1);
        assert.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 3);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 2);
    });

    it("assert08", function() {
        const filename = suiteCasePath + 'event8.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 2);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 2);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 9);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 7);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 2);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 2);

        assert.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.eventsNumberOfReturnsOnCatches, 1);
        assert.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 1);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 4);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 2);
    });

    it("assert09", function() {
        const filename = suiteCasePath + 'event9.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 1);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 1);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 1);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 1);
        assert.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.eventsNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 1);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });

    it("assert10", function() {
        const filename = suiteCasePath + 'event10.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 1);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 1);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 0);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 1);
        assert.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 1);

        assert.equal(metricsObject.eventsNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 1);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });

    it("assert11", function() {
        const filename = suiteCasePath + 'event11.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 1);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 1);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 0);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 1);
        assert.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 1);

        assert.equal(metricsObject.eventsNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 1);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });

    it("assert12", function() {
        const filename = suiteCasePath + 'event12.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 3);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 11);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 2);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 0);

        assert.equal(metricsObject.eventsNumberOfReturnsOnCatches, 2);
        assert.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 1);
        assert.equal(metricsObject.eventsNumberOfBreaksOnCatches, 1);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 3);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });
    
    it("assert13", function() {
        const filename = suiteCasePath + 'event13.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 3);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 11);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 3);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfThrowErrorsOnCatches, 2);
        assert.equal(metricsObject.eventsNumberOfRethrowsOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfThrowPrimitiveTypesOnCatches, 2);

        assert.equal(metricsObject.eventsNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.eventsNumberOfBreaksOnCatches, 1);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 3);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });

    it("assert14", function() {
        const filename = suiteCasePath + 'event14.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 5);
        assert.equal(metricsObject.eventsNumberOfUncaughtExceptionEmpty, 3);
        assert.equal(metricsObject.eventsNumberOfUncaughtExceptionWithUniqueStatement, 3);
        assert.equal(metricsObject.eventsNumberOfUncaughtExceptionWithUniqueConsole, 1);
        assert.equal(metricsObject.eventsNumberOfUncaughtExceptionReturns, 1);
        assert.equal(metricsObject.eventsNumberOfUncaughtExceptionThrows, 2);
    });
    
});
