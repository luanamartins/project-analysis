const assert = require("assert");
const CONFIG = require("../../config");

const projectPath = CONFIG["projectPath"];
const suiteCasePath = CONFIG["dataTestPath"] + "callback/";
const metricsModule = require(CONFIG["srcPath"] + "metrics/metrics");

describe("Callback tests", function() {
    it("assert01", function() {
        const filename = suiteCasePath + 'callback1.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 1);
        assert.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 1);
        assert.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 0);

        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueStatement, 1);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueConsole, 1);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArg, 0);

        assert.equal(metricsObject.callbacksNumberOfEmptyFunctionsWithUniqueErrorArg, 0);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueConsole, 0);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueStatement, 0);
        assert.equal(metricsObject.callbacksNumberOfLinesOfFunctionsWithUniqueErrorArg, 0);

        assert.equal(metricsObject.callbacksNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.callbacksNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.callbacksNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.callbacksNumberOfLines, 4);

        
    });

    it("assert02", function(){
        const filename = suiteCasePath + 'callback2.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 1);
        assert.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 1);
        assert.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 1);

        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueStatement, 0);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueConsole, 0);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArg, 0);

        assert.equal(metricsObject.callbacksNumberOfEmptyFunctionsWithUniqueErrorArg, 0);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueConsole, 0);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueStatement, 0);
        assert.equal(metricsObject.callbacksNumberOfLinesOfFunctionsWithUniqueErrorArg, 0);

        assert.equal(metricsObject.callbacksNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.callbacksNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.callbacksNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.callbacksNumberOfLines, 0);

        
    });

    it("assert03", function(){
        const filename = suiteCasePath + 'callback3.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 1);
        assert.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 1);
        assert.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 0);

        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueStatement, 1);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueConsole, 1);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArg, 1);

        assert.equal(metricsObject.callbacksNumberOfEmptyFunctionsWithUniqueErrorArg, 0);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueConsole, 1);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueStatement, 1);
        assert.equal(metricsObject.callbacksNumberOfLinesOfFunctionsWithUniqueErrorArg, 1);

        assert.equal(metricsObject.callbacksNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.callbacksNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.callbacksNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.callbacksNumberOfLines, 1);
    });

    it("assert04", function(){
        const filename = suiteCasePath + 'callback4.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 3);
        assert.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 3);
        assert.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 0);

        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueStatement, 3);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueConsole, 3);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArg, 0);

        assert.equal(metricsObject.callbacksNumberOfEmptyFunctionsWithUniqueErrorArg, 0);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueConsole, 0);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueStatement, 0);
        assert.equal(metricsObject.callbacksNumberOfLinesOfFunctionsWithUniqueErrorArg, 0);

        assert.equal(metricsObject.callbacksNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.callbacksNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.callbacksNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.callbacksNumberOfLines, 15);
    });

    it("assert05", function(){
        const filename = suiteCasePath + 'callback5.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 1);
        assert.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 1);
        assert.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 0);

        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueStatement, 1);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueConsole, 1);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArg, 0);

        assert.equal(metricsObject.callbacksNumberOfEmptyFunctionsWithUniqueErrorArg, 0);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueConsole, 0);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueStatement, 0);
        assert.equal(metricsObject.callbacksNumberOfLinesOfFunctionsWithUniqueErrorArg, 0);

        assert.equal(metricsObject.callbacksNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.callbacksNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.callbacksNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.callbacksNumberOfLines, 4);
    });

    it("assert06", function(){
        const filename = suiteCasePath + 'callback6.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 1);
        assert.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 1);
        assert.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 1);

        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueStatement, 1);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueConsole, 1);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArg, 1);

        assert.equal(metricsObject.callbacksNumberOfEmptyFunctionsWithUniqueErrorArg, 1);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueConsole, 1);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueStatement, 1);
        assert.equal(metricsObject.callbacksNumberOfLinesOfFunctionsWithUniqueErrorArg, 1);

        assert.equal(metricsObject.callbacksNumberOfReturnsOnCatches, 0);
        assert.equal(metricsObject.callbacksNumberOfReturnsAnErrorOnCatches, 0);
        assert.equal(metricsObject.callbacksNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.callbacksNumberOfLines, 1);
    });

    it("assert07", function(){
        const filename = suiteCasePath + 'callback7.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 1);
        assert.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 1);
        assert.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 0);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueStatement, 1);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueConsole, 0);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArg, 0);

        assert.equal(metricsObject.callbacksNumberOfEmptyFunctionsWithUniqueErrorArg, 0);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueConsole, 0);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueStatement, 0);
        assert.equal(metricsObject.callbacksNumberOfLinesOfFunctionsWithUniqueErrorArg, 0);

        assert.equal(metricsObject.callbacksNumberOfReturnsOnCatches, 1);
        assert.equal(metricsObject.callbacksNumberOfReturnsAnErrorOnCatches, 1);
        assert.equal(metricsObject.callbacksNumberOfBreaksOnCatches, 0);

        assert.equal(metricsObject.callbacksNumberOfLines, 4);
    });

});
