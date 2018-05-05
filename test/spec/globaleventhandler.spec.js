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
        test.equal(metricsObject.numberOfElementOnError, 0);
        test.equal(metricsObject.numberOfWindowAddEventListener, 1);

        test.done();
    },

    "TC02": function (test) {
        const filename = suiteCasePath + 'globaleventhandler2.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.numberOfWindowOnError, 1);
        test.equal(metricsObject.numberOfElementOnError, 0);
        test.equal(metricsObject.numberOfWindowAddEventListener, 0);

        test.done();
    },

    "TC03": function (test) {
        const filename = suiteCasePath + 'globaleventhandler3.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.numberOfWindowOnError, 1);
        test.equal(metricsObject.numberOfElementOnError, 1);
        test.equal(metricsObject.numberOfWindowAddEventListener, 0);

        test.done();
    }
});