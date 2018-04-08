require('dotenv').load();
var testCase = require('nodeunit').testCase;
const metricsModule = require('../../retrieve-scripts/metrics');
const suiteCasePath = process.env.PROJECT_PATH + '/test/data/event/';


module.exports = testCase({

    "TC01": function (test) {
        const filename = suiteCasePath + 'event1.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.eventsNumberOfEventMethodsOn, 1);
        test.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        test.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);
        test.equal(metricsObject.eventsNumberOfEventOnLines, 0);
        test.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        test.equal(metricsObject.eventsNumberOfEventEmitLines, 0);
        test.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        test.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);
        test.equal(metricsObject.eventsTotalOfStringEvents, 1);
        test.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);

        test.done();
    },

    "TC02": function (test) {
        const filename = './test/data/event/event2.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.eventsNumberOfEventMethodsOn, 2);
        test.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        test.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);
        test.equal(metricsObject.eventsNumberOfEventOnLines, 2);
        test.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        test.equal(metricsObject.eventsNumberOfEventEmitLines, 0);
        test.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        test.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);
        test.equal(metricsObject.eventsTotalOfStringEvents, 3);
        test.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);

        test.done();
    },

    "TC03": function (test) {
        const filename = './test/data/event/event3.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.eventsNumberOfEventMethodsOn, 3);
        test.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        test.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);
        test.equal(metricsObject.eventsNumberOfEventOnLines, 4);
        test.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        test.equal(metricsObject.eventsNumberOfEventEmitLines, 0);
        test.equal(metricsObject.eventsNumberOfEventUncaughtException, 1);
        test.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);
        test.equal(metricsObject.eventsTotalOfStringEvents, 4);
        test.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);

        test.done();
    },

    "TC04": function (test) {
        const filename = './test/data/event/event4.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.eventsNumberOfEventMethodsOn, 2);
        test.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        test.equal(metricsObject.eventsNumberOfEventMethodsEmit, 1);
        test.equal(metricsObject.eventsNumberOfEventOnLines, 4);
        test.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        test.equal(metricsObject.eventsNumberOfEventEmitLines, 0);
        test.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        test.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);
        test.equal(metricsObject.eventsTotalOfStringEvents, 3);
        test.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);

        test.done();
    },

    "TC05": function (test) {
        const filename = './test/data/event/event5.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.eventsNumberOfEventMethodsOn, 2);
        test.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        test.equal(metricsObject.eventsNumberOfEventMethodsEmit, 1);
        test.equal(metricsObject.eventsNumberOfEventOnLines, 9);
        test.equal(metricsObject.eventsNumberOfEventOnceLines, 0);
        test.equal(metricsObject.eventsNumberOfEventEmitLines, 5);
        test.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        test.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);
        test.equal(metricsObject.eventsTotalOfStringEvents, 3);
        test.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);

        test.done();
    },


    "TC07": function (test) {
        const filename = './test/data/event/event7.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.eventsNumberOfEventMethodsOn, 1);
        test.equal(metricsObject.eventsNumberOfEventMethodsOnce, 2);
        test.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);
        test.equal(metricsObject.eventsNumberOfEventOnLines, 7);
        test.equal(metricsObject.eventsNumberOfEventOnceLines, 7);
        test.equal(metricsObject.eventsNumberOfEventEmitLines, 0);
        test.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        test.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);
        test.equal(metricsObject.eventsTotalOfStringEvents, 3);
        test.equal(metricsObject.eventsTotalOfEventsExceptStringType, 2);

        test.done();
    },

    "TC08": function (test) {
        const filename = './test/data/event/event8.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.eventsNumberOfEventMethodsOn, 2);
        test.equal(metricsObject.eventsNumberOfEventMethodsOnce, 2);
        test.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);
        test.equal(metricsObject.eventsNumberOfEventOnLines, 9);
        test.equal(metricsObject.eventsNumberOfEventOnceLines, 7);
        test.equal(metricsObject.eventsNumberOfEventEmitLines, 0);
        test.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        test.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 1);
        test.equal(metricsObject.eventsTotalOfStringEvents, 4);
        test.equal(metricsObject.eventsTotalOfEventsExceptStringType, 2);

        test.done();
    }

});