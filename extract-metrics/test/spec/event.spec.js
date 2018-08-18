const assert = require("assert");
const CONFIG = require("../../config");

const projectPath = CONFIG["projectPath"];
const suiteCasePath = CONFIG["dataTestPath"] + "event/";
const metricsModule = require(CONFIG["srcPath"] + "metrics/metrics");
const utilsModule = require(CONFIG["srcPath"] + "utils");

describe("Events tests", function () {
    it("assert01", function () {
        const filename = suiteCasePath + 'event1.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 0);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersRethrows, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersReturns, 0);
        assert.equal(metricsObject.eventsNumberOfHandlersReturnsErrorObject, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 1);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });

    it("assert02", function () {
        const filename = suiteCasePath + 'event2.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 1);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 1);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 0);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersRethrows, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersReturns, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersReturnsErrorObject, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 3);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });

    it("assert03", function () {
        const filename = suiteCasePath + 'event3.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 2);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 4);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 0);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersRethrows, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersReturns, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersReturnsErrorObject, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 1);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 4);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });

    it("assert04", function () {
        const filename = suiteCasePath + 'event4.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 2);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 1);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 4);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 0);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnceWithUniqueStatement, 0);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersRethrows, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersReturns, 2);
        assert.equal(metricsObject.eventsNumberOfHandlersReturnsErrorObject, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 3);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });

    it("assert05", function () {
        const filename = suiteCasePath + 'event5.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 2);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 1);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 9);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 4);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 0);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersRethrows, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersReturns, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersReturnsErrorObject, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 3);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });

    it("assert06", function () {
        const filename = suiteCasePath + 'event5.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 2);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 1);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 9);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 4);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 0);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersRethrows, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersReturns, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersReturnsErrorObject, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 3);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });

    it("assert07", function () {
        const filename = suiteCasePath + 'event7.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 1);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 2);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 6);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 7);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 0);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersRethrows, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersReturns, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersReturnsErrorObject, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 3);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 2);
    });

    it("assert08", function () {
        const filename = suiteCasePath + 'event8.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 2);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 2);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 9);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 7);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 0);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersRethrows, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersReturns, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersReturnsErrorObject, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 1);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 4);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 2);
    });

    it("assert09", function () {
        const filename = suiteCasePath + 'event9.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 1);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 1);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 0);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersRethrows, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersReturns, 0);
        assert.equal(metricsObject.eventsNumberOfHandlersReturnsErrorObject, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 1);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });

    it("assert10", function () {
        const filename = suiteCasePath + 'event10.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 1);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 1);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 0);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersRethrows, 1);

        assert.equal(metricsObject.eventsNumberOfHandlersReturns, 0);
        assert.equal(metricsObject.eventsNumberOfHandlersReturnsErrorObject, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 1);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });

    it("assert11", function () {
        const filename = suiteCasePath + 'event11.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 1);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 1);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 0);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersRethrows, 1);

        assert.equal(metricsObject.eventsNumberOfHandlersReturns, 0);
        assert.equal(metricsObject.eventsNumberOfHandlersReturnsErrorObject, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 1);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });

    it("assert12", function () {
        const filename = suiteCasePath + 'event12.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 3);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 11);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 0);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersRethrows, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersReturns, 2);
        assert.equal(metricsObject.eventsNumberOfHandlersReturnsErrorObject, 1);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 3);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });

    it("assert13", function () {
        const filename = suiteCasePath + 'event13.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventMethodsOn, 3);
        assert.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        assert.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnLines, 11);
        assert.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        assert.equal(metricsObject.eventsNumberOfEventEmitLines, 0);

        assert.equal(metricsObject.eventsNumberOfEventOnEmptyFunctions, 0);
        assert.equal(metricsObject.eventsNumberOfEventOnceEmptyFunctions, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersRethrows, 0);

        assert.equal(metricsObject.eventsNumberOfHandlersReturns, 0);
        assert.equal(metricsObject.eventsNumberOfHandlersReturnsErrorObject, 0);

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        assert.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);

        assert.equal(metricsObject.eventsTotalOfStringEvents, 3);
        assert.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);
    });

    it("assert14", function () {
        const filename = suiteCasePath + 'event14.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventUncaughtException, 5);
        assert.equal(metricsObject.eventsNumberOfUncaughtExceptionEmpty, 1);
        assert.equal(metricsObject.eventsNumberOfUncaughtExceptionWithUniqueStatement, 3);
        assert.equal(metricsObject.eventsNumberOfUncaughtExceptionWithUniqueConsole, 1);
        assert.equal(metricsObject.eventsNumberOfUncaughtExceptionReturns, 1);
        assert.equal(metricsObject.eventsNumberOfUncaughtExceptionThrows, 2);
    });

    it("assert15", function () {
        const filename = suiteCasePath + 'event15.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfEventOnNoUsageOfErrorArgument, 2);
        assert.equal(metricsObject.eventsNumberOfEventOnceNoUsageOfErrorArgument, 1);
        assert.equal(metricsObject.eventsNumberOfUncaughtExceptionNoUsageOfErrorArgument, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersThatThrows, 4);
        assert.equal(metricsObject.eventsNumberOfHandlersThatRethrows, 2);

    });

    it("assert16", function () {
        const filename = suiteCasePath + "event16.js";
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfCatchesAlertOnly, 1);
        assert.equal(metricsObject.eventsNumberOfErrorReassigning, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersThrows, 6);
        assert.equal(metricsObject.eventsNumberOfHandlersThrowsLiteral, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersThrowsErrorObject, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersThatThrows, 6);
        assert.equal(metricsObject.eventsNumberOfHandlersThatThrowsLiteral, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersThatThrowsLiteralOnly, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersThatThrowsUndefined, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersThatThrowsUndefinedOnly, 0);
        assert.equal(metricsObject.eventsNumberOfHandlersThatThrowsNull, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersThatThrowsNullOnly, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersThatThrowsErrorObject, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersRethrows, 2);
        assert.equal(metricsObject.eventsNumberOfHandlersThatRethrows, 2);
    });

    it("assert17", function () {
        const filename = suiteCasePath + "event17.js";
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfHandlersReturns, 6);
        assert.equal(metricsObject.eventsNumberOfHandlersReturnsLiteral, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersReturnsErrorObject, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersThatReturns, 6);
        assert.equal(metricsObject.eventsNumberOfHandlersThatReturnsLiteral, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersThatReturnsUndefined, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersThatReturnsNull, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersThatReturnsErrorObject, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersThatRereturns, 2);

    });

    it("assert18", function () {
        const filename = suiteCasePath + "event18.js";
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfHandlersContinues, 2);
        assert.equal(metricsObject.eventsNumberOfHandlersThatContinues, 2);
        assert.equal(metricsObject.eventsNumberOfHandlersBreaks, 2);
        assert.equal(metricsObject.eventsNumberOfHandlersThatBreaks, 2);
        assert.equal(metricsObject.eventsNumberOfHandlersBreaksOnly, 0);
    });

    it("assert19", function () {
        const filename = suiteCasePath + "event19.js";
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.eventsNumberOfHandlersThatReturnsLiteralOnly, 2);
        assert.equal(metricsObject.eventsNumberOfHandlersThatReturnsUndefinedOnly, 1);
        assert.equal(metricsObject.eventsNumberOfHandlersThatReturnsNullOnly, 1);
        assert.equal(metricsObject.eventsNumberOfUncaughtExceptionReassignment, 2);
    });

});
