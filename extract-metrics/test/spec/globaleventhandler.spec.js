const assert = require("assert");
const CONFIG = require("../../config");

const projectPath = CONFIG["projectPath"];
const suiteCasePath = CONFIG["dataTestPath"] + "globaleventhandler/";
const metricsModule = require(CONFIG["srcPath"] + "metrics/metrics");
const utilsModule = require(CONFIG["srcPath"] + "utils");

describe("Global event handler tests", function() {
    it("assert01", function() {
        const filename = suiteCasePath + 'globaleventhandler1.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.numberOfWindowOnError, 0);
        assert.equal(metricsObject.numberOfWindowOnErrorEmptyHandler, 0);
        assert.equal(metricsObject.numberOfWindowOnErrorUniqueStatement, 0);
        assert.equal(metricsObject.numberOfWindowOnErrorUniqueConsole, 0);

        assert.equal(metricsObject.numberOfElementOnError, 0);
        assert.equal(metricsObject.numberOfElementOnErrorEmptyHandler, 0);
        assert.equal(metricsObject.numberOfElementOnErrorUniqueStatement, 0);
        assert.equal(metricsObject.numberOfElementOnErrorUniqueConsole, 0);

        assert.equal(metricsObject.numberOfWindowAddEventListener, 1);
        assert.equal(metricsObject.numberOfWindowAddEventListenerEmptyHandler, 0);
        assert.equal(metricsObject.numberOfWindowAddEventListenerUniqueStatement, 1);
        assert.equal(metricsObject.numberOfWindowAddEventListenerUniqueConsole, 1);
    });

    it("assert02", function() {

        const filename = suiteCasePath + 'globaleventhandler2.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.numberOfWindowOnError, 1);
        assert.equal(metricsObject.numberOfWindowOnErrorLines, 1);
        assert.equal(metricsObject.numberOfWindowOnErrorEmptyHandler, 0);
        assert.equal(metricsObject.numberOfWindowOnErrorUniqueStatement, 1);
        assert.equal(metricsObject.numberOfWindowOnErrorUniqueConsole, 1);

        assert.equal(metricsObject.numberOfElementOnError, 0);
        assert.equal(metricsObject.numberOfElementOnErrorLines, 0);
        assert.equal(metricsObject.numberOfElementOnErrorEmptyHandler, 0);
        assert.equal(metricsObject.numberOfElementOnErrorUniqueStatement, 0);
        assert.equal(metricsObject.numberOfElementOnErrorUniqueConsole, 0);

        assert.equal(metricsObject.numberOfWindowAddEventListener, 0);
        assert.equal(metricsObject.numberOfWindowAddEventListenerLines, 0);
        assert.equal(metricsObject.numberOfWindowAddEventListenerEmptyHandler, 0);
        assert.equal(metricsObject.numberOfWindowAddEventListenerUniqueStatement, 0);
        assert.equal(metricsObject.numberOfWindowAddEventListenerUniqueConsole, 0);
    });

    it("assert03", function() {
        const filename = suiteCasePath + 'globaleventhandler3.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.numberOfWindowOnError, 1);
        assert.equal(metricsObject.numberOfWindowOnErrorLines, 8);
        assert.equal(metricsObject.numberOfWindowOnErrorEmptyHandler, 0);
        assert.equal(metricsObject.numberOfWindowOnErrorUniqueStatement, 0);
        assert.equal(metricsObject.numberOfWindowOnErrorUniqueConsole, 0);

        assert.equal(metricsObject.numberOfElementOnError, 1);
        assert.equal(metricsObject.numberOfElementOnErrorLines, 1);
        assert.equal(metricsObject.numberOfElementOnErrorEmptyHandler, 0);
        assert.equal(metricsObject.numberOfElementOnErrorUniqueStatement, 1);
        assert.equal(metricsObject.numberOfElementOnErrorUniqueConsole, 1);

        assert.equal(metricsObject.numberOfWindowAddEventListener, 0);
        assert.equal(metricsObject.numberOfWindowAddEventListenerLines, 0);
        assert.equal(metricsObject.numberOfWindowAddEventListenerEmptyHandler, 0);
        assert.equal(metricsObject.numberOfWindowAddEventListenerUniqueStatement, 0);
        assert.equal(metricsObject.numberOfWindowAddEventListenerUniqueConsole, 0);
    });

    it("assert04", function() {
        const filename = suiteCasePath + 'globaleventhandler4.js';
        const saveObject = utilsModule.getMetricsOnFileObject();             const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.numberOfWindowOnErrorThrows, 2);
        assert.equal(metricsObject.numberOfWindowOnErrorReturns, 1);

    });

    it("assert05", function() {
        const filename = suiteCasePath + 'globaleventhandler5.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.numberOfElementOnErrorThrows, 2);
        assert.equal(metricsObject.numberOfElementOnErrorReturns, 2);

    });

    it("assert06", function() {
        const filename = suiteCasePath + 'globaleventhandler6.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.numberOfWindowAddEventListenerThrows, 2);
        assert.equal(metricsObject.numberOfWindowAddEventListenerReturns, 1);

    });

    it("assert07", function() {
        const filename = suiteCasePath + 'globaleventhandler7.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.numberOfWindowOnErrorOnNoUsageOfErrorArgument, 4);
        assert.equal(metricsObject.numberOfWindowOnErrorThatThrows, 6);
        assert.equal(metricsObject.numberOfWindowOnErrorRethrows, 4);
        assert.equal(metricsObject.numberOfWindowOnErrorThatRethrows, 4);

        assert.equal(metricsObject.numberOfElementOnErrorOnNoUsageOfErrorArgument, 0);
        assert.equal(metricsObject.numberOfElementOnErrorThatThrows, 0);
        assert.equal(metricsObject.numberOfElementOnErrorRethrows, 0);
        assert.equal(metricsObject.numberOfElementOnErrorThatRethrows, 0);

        assert.equal(metricsObject.numberOfWindowAddEventListenerNoUsageOfErrorArgument, 1);
        assert.equal(metricsObject.numberOfWindowAddEventListenerThatThrows, 3);
        assert.equal(metricsObject.numberOfWindowAddEventListenerRethrows, 2);
        assert.equal(metricsObject.numberOfWindowAddEventListenerThatRethrows, 2);

    });

});