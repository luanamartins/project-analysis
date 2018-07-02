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

        assert.equal(metricsObject.callbacksNumberOfHandlersReturnsErrorObject, 0);
        assert.equal(metricsObject.callbacksNumberOfHandlersBreaks, 0);

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

        assert.equal(metricsObject.callbacksNumberOfHandlersReturnsErrorObject, 0);
        assert.equal(metricsObject.callbacksNumberOfHandlersBreaks, 0);

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

        assert.equal(metricsObject.callbacksNumberOfHandlersReturnsErrorObject, 0);
        assert.equal(metricsObject.callbacksNumberOfHandlersBreaks, 0);

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

        assert.equal(metricsObject.callbacksNumberOfHandlersReturnsErrorObject, 0);
        assert.equal(metricsObject.callbacksNumberOfHandlersBreaks, 0);

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

        assert.equal(metricsObject.callbacksNumberOfHandlersReturnsErrorObject, 0);
        assert.equal(metricsObject.callbacksNumberOfHandlersBreaks, 0);

        assert.equal(metricsObject.callbacksNumberOfLines, 4);
    });

    it("assert06", function(){
        const filename = suiteCasePath + 'callback6.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 1);
        assert.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 1);
        assert.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 0);
        assert.equal(metricsObject.callbacksNumberOfFunctionsNoUsageOfErrorArgument, 1);
        assert.equal(metricsObject.callbacksNumberOfFunctionsNoUsageOfErrorArgumentWithUniqueErrorArg, 1);

        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueStatement, 1);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueConsole, 1);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArg, 1);

        assert.equal(metricsObject.callbacksNumberOfEmptyFunctionsWithUniqueErrorArg, 0);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueConsole, 1);
        assert.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueStatement, 1);
        assert.equal(metricsObject.callbacksNumberOfLinesOfFunctionsWithUniqueErrorArg, 1);

        assert.equal(metricsObject.callbacksNumberOfHandlersReturnsErrorObject, 0);
        assert.equal(metricsObject.callbacksNumberOfHandlersBreaks, 0);

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

        assert.equal(metricsObject.callbacksNumberOfHandlersReturnsErrorObject, 1);
        assert.equal(metricsObject.callbacksNumberOfHandlersBreaks, 0);

        assert.equal(metricsObject.callbacksNumberOfLines, 4);
    });

    it("assert08", function(){
        const filename = suiteCasePath + 'callback8.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.callbacksNumberOfHandlersThrows, 1);
        assert.equal(metricsObject.callbacksNumberOfHandlersThatThrows, 1);
        assert.equal(metricsObject.callbacksNumberOfHandlersRethrows, 1);
        assert.equal(metricsObject.callbacksNumberOfHandlersThatRethrows, 1);
        assert.equal(metricsObject.callbacksNumberOfHandlersReturns, 1);
        assert.equal(metricsObject.callbacksNumberOfHandlersThatReturnsErrorObject, 1);
    });

    it("assert09", function(){
        const filename = suiteCasePath + 'callback9.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.callbacksNumberOfHandlersAlertOnly, 1);
        assert.equal(metricsObject.callbacksNumberOfErrorReassigning, 1);
    });

    it("assert10", function(){
        const filename = suiteCasePath + 'callback10.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];

        assert.equal(metricsObject.callbacksNumberOfHandlersThrows, 7);
        assert.equal(metricsObject.callbacksNumberOfHandlersThrowsLiteral, 2);
        assert.equal(metricsObject.callbacksNumberOfHandlersThrowsErrorObject, 1);
        assert.equal(metricsObject.callbacksNumberOfHandlersThatThrowsLiteral, 2);
        assert.equal(metricsObject.callbacksNumberOfHandlersThatThrowsLiteralOnly, 1);
        assert.equal(metricsObject.callbacksNumberOfHandlersThatThrowsUndefined, 1);
        assert.equal(metricsObject.callbacksNumberOfHandlersThatThrowsUndefinedOnly, 0);
        assert.equal(metricsObject.callbacksNumberOfHandlersThatThrowsNull, 2);
        assert.equal(metricsObject.callbacksNumberOfHandlersThatThrowsNullOnly, 1);
        assert.equal(metricsObject.callbacksNumberOfHandlersThatThrowsErrorObject, 1);
    });

    it("assert11", function(){
        const filename = suiteCasePath + 'callback11.js';
        const data = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = data.metrics[0];
        assert.equal(metricsObject.callbacksNumberOfHandlersReturnsLiteral, 1);
        assert.equal(metricsObject.callbacksNumberOfHandlersThatReturnsUndefined, 1);
        assert.equal(metricsObject.callbacksNumberOfHandlersThatReturnsNull, 1);
        assert.equal(metricsObject.callbacksNumberOfHandlersThatReturnsErrorObject, 2);
        assert.equal(metricsObject.callbacksNumberOfHandlersThatRereturns, 1);
        assert.equal(metricsObject.callbacksNumberOfHandlersContinues, 1);
        assert.equal(metricsObject.callbacksNumberOfHandlersThatContinues, 1);
        assert.equal(metricsObject.callbacksNumberOfHandlersThatBreaks, 1);
        assert.equal(metricsObject.callbacksNumberOfHandlersBreaksOnly, 0);

    });


});
