const assert = require("assert");
const CONFIG = require("../../config");

const projectPath = CONFIG["projectPath"];
const suiteCasePath = CONFIG["dataTestPath"] + "globaleventhandler/";
const metricsModule = require(CONFIG["srcPath"] + "metrics/metrics");

describe("Events tests", function() {
    it("assert01", function() {
        const filename = suiteCasePath + 'globaleventhandler1.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

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
        const data = metricsModule.handleMetrics([filename], projectPath);

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
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.numberOfWindowOnError, 1);
        assert.equal(metricsObject.numberOfWindowOnErrorLines, 8);
        assert.equal(metricsObject.numberOfWindowOnErrorEmptyHandler, 1);
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
});