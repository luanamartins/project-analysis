require('dotenv').load();
var testCase = require('nodeunit').testCase;
const metricsModule = require('../../retrieve-scripts/metrics');


module.exports = testCase({

    "TC01": function (test) {
        let filename = './test/data/event/event1.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.eventsNumberOfEventMethodsOn, 1);
        test.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        test.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);
        test.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        test.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);
        test.equal(metricsObject.eventsTotalOfStringEvents, 1);
        test.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);

        test.done();
    },

    "TC02": function (test) {
        let filename = './test/data/event/event2.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.eventsNumberOfEventMethodsOn, 2);
        test.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        test.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);
        test.equal(metricsObject.eventsNumberOfEventUncaughtException, 0);
        test.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);
        test.equal(metricsObject.eventsTotalOfStringEvents, 3);
        test.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);

        test.done();
    },

    "TC03": function (test) {
        let filename = './test/data/event/event3.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.eventsNumberOfEventMethodsOn, 2);
        test.equal(metricsObject.eventsNumberOfEventMethodsOnce, 0);
        test.equal(metricsObject.eventsNumberOfEventMethodsEmit, 0);
        test.equal(metricsObject.eventsNumberOfEventUncaughtException, 1);
        test.equal(metricsObject.eventsNumberOfEventUnhandledRejection, 0);
        test.equal(metricsObject.eventsTotalOfStringEvents, 4);
        test.equal(metricsObject.eventsTotalOfEventsExceptStringType, 0);

        test.done();
    }
});