const assert = require("assert");
const CONFIG = require("../../config");
const constants = require('../../src/constants');

const projectPath = CONFIG["projectPath"];
const suiteCasePath = CONFIG["dataTestPath"] + "metrics-size/";
const metricsModule = require(CONFIG["srcPath"] + "metrics/metrics");
const utilsModule = require(CONFIG["srcPath"] + "utils");

describe("Counting tests", function() {
    it("assert1", function () {
        const filename = suiteCasePath + 'assert1.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);
        const metricsObject = data.metrics_handlers;

        assert.notEqual(metricsObject, null);
        assert.equal(metricsObject.length, 2);

        const expected = [
            { 'mech': constants.TRY_CATCH, 'lines': 1, 'stmts': 1, 'file': filename },
            { 'mech': constants.TRY_CATCH, 'lines': 2, 'stmts': 2, 'file': filename }
        ];

        assert.deepEqual(metricsObject, expected);

    });

    it("assert2", function () {
        const filename = suiteCasePath + 'assert2.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);
        const metricsObject = data.metrics_handlers;

        assert.notEqual(metricsObject, null);
        assert.equal(metricsObject.length, 4);

        const expected = [
            { 'mech': constants.TRY_CATCH, 'lines': 6, 'stmts': 6, 'file': filename },
            { 'mech': constants.TRY_CATCH, 'lines': 1, 'stmts': 1, 'file': filename },
            { 'mech': constants.ASYNC_AWAIT, 'lines': 1, 'stmts': 1, 'file': filename },
            { 'mech': constants.ASYNC_AWAIT, 'lines': 2, 'stmts': 2, 'file': filename }
        ];

        assert.deepEqual(metricsObject, expected);
    });

    it("assert3", function () {
        const filename = suiteCasePath + 'assert3.js';
        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);
        const metricsObject = data.metrics_handlers;

        assert.notEqual(metricsObject, null);
        assert.equal(metricsObject.length, 2);

        const expected = [
            { 'mech': constants.PROMISE, 'lines': 4, 'stmts': 4, 'has_error_arguments': false, 'file': filename },
            { 'mech': constants.EVENT, 'lines': 1, 'stmts': 1, 'has_error_arguments': true, 'file': filename }
        ];

        assert.deepEqual(metricsObject, expected);

    });

    it("assert4", function () {
        const filename = suiteCasePath + 'assert4.js';

        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);
        const metricsObject = data.metrics_handlers;

        assert.notEqual(metricsObject, null);
        assert.equal(metricsObject.length, 3);

        const expected = [
            { 'mech': constants.CALLBACK, 'lines': 1, 'stmts': 1, 'file': filename },
            { 'mech': constants.PROMISE, 'lines': 4, 'stmts': 4, 'has_error_arguments': true, 'file': filename },
            { 'mech': constants.EVENT, 'lines': 1, 'stmts': 1, 'has_error_arguments': true, 'file': filename }
        ];

        assert.deepEqual(metricsObject, expected);

    });

    it("assert5", function () {
        const filename = suiteCasePath + 'assert5.js';

        const saveObject = utilsModule.getMetricsOnFileObject();
        const data = metricsModule.handleMetrics([filename], saveObject);
        const metricsObject = data.metrics_handlers;

        assert.notEqual(metricsObject, null);
        assert.equal(metricsObject.length, 3);

        const expected = [
            { 'mech': constants.WINDOW_ADDEVENTLISTENER, 'lines': 7, 'stmts': 3, 
                'has_error_arguments': true, 'file': filename },
            { 'mech': constants.ELEMENT_ON_ERROR, 'lines': 1, 'stmts': 1, 
                'has_error_arguments': true, 'file': filename },
            { 'mech': constants.WINDOW_ON_ERROR, 'lines': 8, 'stmts': 5, 
                'has_error_arguments': false, 'file': filename }
        ];

        assert.deepEqual(metricsObject, expected);

    });

});