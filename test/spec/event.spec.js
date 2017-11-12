require('dotenv').load();
var testCase = require('nodeunit').testCase;
const metricsModule = require('../../retrieve-scripts/metrics');


module.exports = testCase({

    "TC01": function (test) {
        let filename = './test/data/event/event1.js';
        const reportJsonFile = './retrieve-scripts/report-object.json';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.events.numberOfEventMethodsOn, 1);
        test.equal(metricsObject.events.numberOfEventMethodsOnce, 0);
        test.equal(metricsObject.events.numberOfEventMethodsEmit, 0);
        test.equal(metricsObject.events.numberOfEventUncaughtException, 0);
        test.equal(metricsObject.events.numberOfEventUnhandledRejection, 0);
        test.equal(metricsObject.events.totalOfStringEvents, 1);
        test.equal(metricsObject.events.totalOfEventTypes, 0);

        test.done();
    },

    "TC03": function (test) {
        let filename = './test/data/event/event3.js';
        const reportJsonFile = './retrieve-scripts/report-object.json';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.events.numberOfEventMethodsOn, 2);
        test.equal(metricsObject.events.numberOfEventMethodsOnce, 0);
        test.equal(metricsObject.events.numberOfEventMethodsEmit, 0);
        test.equal(metricsObject.events.numberOfEventUncaughtException, 1);
        test.equal(metricsObject.events.numberOfEventUnhandledRejection, 0);
        test.equal(metricsObject.events.totalOfStringEvents, 4);
        test.equal(metricsObject.events.totalOfEventTypes, 0);

        test.done();
    }
});