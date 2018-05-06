require('dotenv').load();
const testCase = require('nodeunit').testCase;
const projectPath = process.env.RETRIEVE_SCRIPTS_ROOT_PATH;
const suiteCasePath = process.env.PROJECT_PATH + '/test/data/globaleventhandler/';
const metricsModule = require(projectPath + '/metrics');


module.exports = testCase({
    "TC01": function (test) {
        const filename = suiteCasePath + 'globaleventhandler1.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.numberOfWindowOnError, 0);
        test.equal(metricsObject.numberOfWindowOnErrorEmptyHandler, 0);
        test.equal(metricsObject.numberOfWindowOnErrorUniqueStatement, 0);
        test.equal(metricsObject.numberOfWindowOnErrorUniqueConsole, 0);

        test.equal(metricsObject.numberOfElementOnError, 0);
        test.equal(metricsObject.numberOfElementOnErrorEmptyHandler, 0);
        test.equal(metricsObject.numberOfElementOnErrorUniqueStatement, 0);
        test.equal(metricsObject.numberOfElementOnErrorUniqueConsole, 0);

        test.equal(metricsObject.numberOfWindowAddEventListener, 1);
        test.equal(metricsObject.numberOfWindowAddEventListenerEmptyHandler, 0);
        test.equal(metricsObject.numberOfWindowAddEventListenerUniqueStatement, 1);
        test.equal(metricsObject.numberOfWindowAddEventListenerUniqueConsole, 1);

        test.done();
    },

    "TC02": function (test) {
        const filename = suiteCasePath + 'globaleventhandler2.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.numberOfWindowOnError, 1);
        test.equal(metricsObject.numberOfWindowOnErrorLines, 1);
        test.equal(metricsObject.numberOfWindowOnErrorEmptyHandler, 0);
        test.equal(metricsObject.numberOfWindowOnErrorUniqueStatement, 1);
        test.equal(metricsObject.numberOfWindowOnErrorUniqueConsole, 1);

        test.equal(metricsObject.numberOfElementOnError, 0);
        test.equal(metricsObject.numberOfElementOnErrorLines, 0);
        test.equal(metricsObject.numberOfElementOnErrorEmptyHandler, 0);
        test.equal(metricsObject.numberOfElementOnErrorUniqueStatement, 0);
        test.equal(metricsObject.numberOfElementOnErrorUniqueConsole, 0);

        test.equal(metricsObject.numberOfWindowAddEventListener, 0);
        test.equal(metricsObject.numberOfWindowAddEventListenerLines, 0);
        test.equal(metricsObject.numberOfWindowAddEventListenerEmptyHandler, 0);
        test.equal(metricsObject.numberOfWindowAddEventListenerUniqueStatement, 0);
        test.equal(metricsObject.numberOfWindowAddEventListenerUniqueConsole, 0);

        test.done();
    },

    "TC03": function (test) {
        const filename = suiteCasePath + 'globaleventhandler3.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.numberOfWindowOnError, 1);
        test.equal(metricsObject.numberOfWindowOnErrorLines, 8);
        test.equal(metricsObject.numberOfWindowOnErrorEmptyHandler, 1);
        test.equal(metricsObject.numberOfWindowOnErrorUniqueStatement, 0);
        test.equal(metricsObject.numberOfWindowOnErrorUniqueConsole, 0);

        test.equal(metricsObject.numberOfElementOnError, 1);
        test.equal(metricsObject.numberOfElementOnErrorLines, 1);
        test.equal(metricsObject.numberOfElementOnErrorEmptyHandler, 0);
        test.equal(metricsObject.numberOfElementOnErrorUniqueStatement, 1);
        test.equal(metricsObject.numberOfElementOnErrorUniqueConsole, 1);

        test.equal(metricsObject.numberOfWindowAddEventListener, 0);
        test.equal(metricsObject.numberOfWindowAddEventListenerLines, 0);
        test.equal(metricsObject.numberOfWindowAddEventListenerEmptyHandler, 0);
        test.equal(metricsObject.numberOfWindowAddEventListenerUniqueStatement, 0);
        test.equal(metricsObject.numberOfWindowAddEventListenerUniqueConsole, 0);

        test.done();
    }
});