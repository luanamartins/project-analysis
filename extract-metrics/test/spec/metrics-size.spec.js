const assert = require("assert");
const CONFIG = require("../../config");
const constants = require('../../src/constants');
const metricsModule = require(CONFIG["srcPath"] + "metrics/metrics");
const utils = require(CONFIG["srcPath"] + "utils");

const projectPath = CONFIG["projectPath"];
const suiteCasePath = CONFIG["dataTestPath"] + "metrics-size/";

describe("Counting tests", function() {
    it("assert1", function () {
        const filename = suiteCasePath + 'assert1.js';
        const saveObject = utils.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);
        const metricsObject = data.metrics_handlers;

        assert.notEqual(metricsObject, null);
        assert.equal(metricsObject.length, 2);

        let obj = metricsObject[0];
        assert.equal(obj.mech, constants.TRY_CATCH);
        assert.equal(obj.lines, 1);
        assert.equal(obj.stmts, 1);
        assert.equal(obj.file, filename);
        assert.equal(obj.noUsageOfErrorArg, true);
        assert.equal(obj.returnLiteral, true);

        obj = metricsObject[1];
        assert.equal(obj.mech, constants.TRY_CATCH);
        assert.equal(obj.lines, 2);
        assert.equal(obj.stmts, 2);
        assert.equal(obj.file, filename);
        assert.equal(obj.consoleLog, true);
        assert.equal(obj.returnLiteral, true);
        assert.equal(obj.noUsageOfErrorArg, true);

    });

    it("assert2", function () {
        const filename = suiteCasePath + 'assert2.js';
        const saveObject = utils.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);
        const metricsObject = data.metrics_handlers;

        assert.notEqual(metricsObject, null);
        assert.equal(metricsObject.length, 4);

        let obj = metricsObject[0];
        assert.equal(obj.mech, constants.TRY_CATCH);
        assert.equal(obj.lines, 6);
        assert.equal(obj.stmts, 6);
        assert.equal(obj.file, filename);
        assert.equal(obj.consoleLog, true);
        assert.equal(obj.noUsageOfErrorArg, true);

        obj = metricsObject[1];
        assert.equal(obj.mech, constants.TRY_CATCH);
        assert.equal(obj.lines, 1);
        assert.equal(obj.stmts, 1);
        assert.equal(obj.file, filename);
        assert.equal(obj.noUsageOfErrorArg, true);
        assert.equal(obj.returnLiteral, true);

        obj = metricsObject[2];
        assert.equal(obj.mech, constants.ASYNC_AWAIT);
        assert.equal(obj.lines, 1);
        assert.equal(obj.stmts, 1);
        assert.equal(obj.file, filename);
        assert.equal(obj.noUsageOfErrorArg, true);

        obj = metricsObject[3];
        assert.equal(obj.mech, constants.ASYNC_AWAIT);
        assert.equal(obj.lines, 2);
        assert.equal(obj.stmts, 2);
        assert.equal(obj.file, filename);
        assert.equal(obj.consoleLog, true);
        assert.equal(obj.noUsageOfErrorArg, true);

    });

    it("assert3", function () {
        const filename = suiteCasePath + 'assert3.js';
        const saveObject = utils.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);
        const metricsObject = data.metrics_handlers;

        assert.notEqual(metricsObject, null);
        assert.equal(metricsObject.length, 2);

        let obj = metricsObject[0];
        assert.equal(obj.mech, constants.PROMISE);
        assert.equal(obj.lines, 4);
        assert.equal(obj.stmts, 4);
        assert.equal(obj.file, filename);
        assert.equal(obj.has_error_arguments, false);
        assert.equal(obj.consoleLog, true);
        assert.equal(obj.returnLiteral, true);

        obj = metricsObject[1];
        assert.equal(obj.mech, constants.EVENT);
        assert.equal(obj.lines, 1);
        assert.equal(obj.stmts, 1);
        assert.equal(obj.file, filename);
        assert.equal(obj.has_error_arguments, true);
        assert.equal(obj.noUsageOfErrorArg, true);
        assert.equal(obj.throwLiteral, true);

    });

    it("assert4", function () {
        const filename = suiteCasePath + 'assert4.js';

        const saveObject = utils.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);
        const metricsObject = data.metrics_handlers;

        assert.notEqual(metricsObject, null);
        assert.equal(metricsObject.length, 3);

        let obj = metricsObject[0];
        assert.equal(obj.mech, constants.CALLBACK);
        assert.equal(obj.lines, 1);
        assert.equal(obj.stmts, 1);
        assert.equal(obj.file, filename);
        assert.equal(obj.has_error_arguments, true);
        assert.equal(obj.consoleLog, true);

        obj = metricsObject[1];
        assert.equal(obj.mech, constants.PROMISE);
        assert.equal(obj.lines, 4);
        assert.equal(obj.stmts, 4);
        assert.equal(obj.file, filename);
        assert.equal(obj.has_error_arguments, true);
        assert.equal(obj.consoleLog, true);
        assert.equal(obj.returnLiteral, true);

        obj = metricsObject[2];
        assert.equal(obj.mech, constants.EVENT);
        assert.equal(obj.lines, 1);
        assert.equal(obj.stmts, 1);
        assert.equal(obj.file, filename);
        assert.equal(obj.has_error_arguments, true);
        assert.equal(obj.throwLiteral, true);

    });

    it("assert5", function () {
        const filename = suiteCasePath + 'assert5.js';

        const saveObject = utils.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);
        const metricsObject = data.metrics_handlers;

        assert.notEqual(metricsObject, null);
        assert.equal(metricsObject.length, 3);

        let obj = metricsObject[0];
        assert.equal(obj.mech, constants.WINDOW_ADDEVENTLISTENER);
        assert.equal(obj.lines, 7);
        assert.equal(obj.stmts, 3);
        assert.equal(obj.file, filename);
        assert.equal(obj.has_error_arguments, true);
        assert.equal(obj.consoleLog, true);
        assert.equal(obj.throwLiteral, true);

        obj = metricsObject[1];
        assert.equal(obj.mech, constants.ELEMENT_ON_ERROR);
        assert.equal(obj.lines, 1);
        assert.equal(obj.stmts, 1);
        assert.equal(obj.file, filename);
        assert.equal(obj.has_error_arguments, true);
        assert.equal(obj.consoleLog, true);

        obj = metricsObject[2];
        assert.equal(obj.mech, constants.WINDOW_ON_ERROR);
        assert.equal(obj.lines, 8);
        assert.equal(obj.stmts, 5);
        assert.equal(obj.file, filename);
        assert.equal(obj.consoleLog, true);

    });

});