const CONFIG = require("../../config");
const constants = require('../constants');
const utils = require(CONFIG["srcPath"] + 'utils');

function handleAnalysis(node, reportObject, metric_size_array) {

    const eventListeningMethods = ['on', 'once'];
    const eventRaisingMethods = ['emit'];

    if (node.type === constants.CALL_EXPRESSION) {
        if (node.callee.property) {
            const methodName = node.callee.property.name;
            const callExpressionArguments = node.arguments.length;
            const firstArgObject = node.arguments[0];
            const isFirstArgErrorHandling = firstArgObject &&
            firstArgObject.value ? utils.isAnErrorArgument(firstArgObject.value) : false;

            if (callExpressionArguments > 1 && eventListeningMethods.includes(methodName)) {
                const handlerFunction = node.arguments[1];

                if (isFirstArgErrorHandling && handlerFunction.type === constants.FUNCTION_EXPRESSION) {
                    const handlerParams = utils.getIdentifiersNames(handlerFunction.params);
                    const lines = utils.getNumberOfLines(handlerFunction);
                    const handlerFunctionBody = handlerFunction.body.body;
                    const hasErrorArguments = utils.hasAnErrorArgument(handlerParams);

                    const metricSizeObject = utils.getEmptyMetricSizeObject();
                    metricSizeObject.mech = constants.EVENT;
                    metricSizeObject.lines = lines;
                    metricSizeObject.stmts = handlerFunctionBody.length;
                    metricSizeObject.has_error_arguments = hasErrorArguments;
                    metricSizeObject.empty = lines === 0;

                    const useAnyErrorParam = utils.useAnyArguments(handlerFunctionBody, handlerParams);

                    if (!useAnyErrorParam) {
                        metricSizeObject.noUsageOfErrorArg = true;
                    }
        
                    if(utils.hasConsoleLog(handlerFunctionBody)) {
                        metricSizeObject.consoleLog = true;
                    }
            
                    if(utils.hasAlertMethodCalling(handlerFunctionBody)) {
                        metricSizeObject.alert = true;
                    }

                    if (lines === 1 && utils.isAlertCallExpression(handlerFunctionBody[0])) {
                        reportObject.eventsNumberOfCatchesAlertOnly++;
                    }

                    if (utils.reuseAnErrorStatements(handlerFunctionBody, handlerParams)) {
                        reportObject.eventsNumberOfErrorReassigning++;
                    }

                    if (methodName === 'on') {
                        reportObject.eventsNumberOfEventMethodsOn++;
                        reportObject.eventsNumberOfEventOnLines += lines;
                        const location = handlerFunction.loc;
                        reportObject.eventsNumberOfEventOnLinesStart.push(location.start.line);
                        reportObject.eventsNumberOfEventOnLinesEnd.push(location.end.line);

                        if (lines === 0) {
                            reportObject.eventsNumberOfEventOnEmptyFunctions++;
                        } else if (!utils.useAnyArguments(handlerFunction.body, handlerParams)) {
                            reportObject.eventsNumberOfEventOnNoUsageOfErrorArgument++;
                        }

                    } else if (methodName === 'once') {

                        reportObject.eventsNumberOfEventMethodsOnce++;

                        reportObject.eventsNumberOfEventOnceLines += utils.getNumberOfLines(handlerFunction);
                        const location = handlerFunction.loc;
                        reportObject.eventsNumberOfEventOnceLinesStart.push(location.start.line);
                        reportObject.eventsNumberOfEventOnceLinesEnd.push(location.end.line);

                        if (lines === 0) {
                            reportObject.eventsNumberOfEventOnceEmptyFunctions++;
                        } else if (!utils.useAnyArguments(handlerFunction.body, handlerParams)) {
                            reportObject.eventsNumberOfEventOnceNoUsageOfErrorArgument++;
                        }
                    }

                    const functionBody = handlerFunction.body;
                    const handleArgs = utils.getIdentifiersNames(handlerFunction.params);

                    if (utils.hasErrorReassignment(functionBody, handleArgs)) {
                        reportObject.eventsNumberOfUncaughtExceptionReassignment++;
                    }

                    // Number of throws on catches
                    handleThrows(functionBody, reportObject, lines, handleArgs, metricSizeObject);

                    // Counts number of returns
                    handleReturns(functionBody, reportObject, handleArgs, lines, handlerParams, metricSizeObject);

                    // Counts number of continues
                    handleContinuesAndBreaks(functionBody, reportObject, lines, metricSizeObject);

                    metric_size_array.push(metricSizeObject);
                }
            }

            if (callExpressionArguments >= 2 && eventRaisingMethods.includes(methodName)) {

                const errorHandlingFunction = node.arguments[1];

                if (methodName === 'emit' && isFirstArgErrorHandling) {
                    reportObject.eventsNumberOfEventMethodsEmit++;
                    if (errorHandlingFunction) {
                        reportObject.eventsNumberOfEventEmitLines += utils.getNumberOfLines(errorHandlingFunction);

                        const location = errorHandlingFunction.loc;
                        reportObject.eventsNumberOfEventEmitLinesStart.push(location.start.line);
                        reportObject.eventsNumberOfEventEmitLinesEnd.push(location.end.line);

                    }
                }
            }

            if (callExpressionArguments > 0 && 
                (eventListeningMethods.includes(methodName) || eventRaisingMethods.includes(methodName))) {
                const typeOfFirstArg = typeof(firstArgObject.value);
                if (firstArgObject.type === 'Literal') {
                    const literalValue = node.arguments[0].value;

                    // the method is an event listener or emitter and is listing/raising a string as event
                    if (utils.isString(literalValue)) {
                        reportObject.eventsTotalOfStringEvents++;
                    }

                    if (firstArgObject && firstArgObject.value === 'uncaughtException') {
                        reportObject.eventsNumberOfEventUncaughtException++;
                        const secondArgument = node.arguments[1];
                        if(secondArgument && secondArgument.type === 'FunctionExpression') {
                            const bodyStatement = secondArgument.body;
                            const numberOfLines = utils.getNumberOfLines(bodyStatement);
                            reportObject.eventsNumberOfEventUncaughtExceptionLines += numberOfLines; 
                            const params = utils.getIdentifiersNames(secondArgument.params);

                            if (numberOfLines === 0) {
                                reportObject.eventsNumberOfUncaughtExceptionEmpty++;
                            } else if (!utils.useAnyArguments(bodyStatement, params)) {
                                reportObject.eventsNumberOfUncaughtExceptionNoUsageOfErrorArgument++;
                            }

                            // UncaughtException body has only one statement
                            if (numberOfLines === 1) {
                                reportObject.eventsNumberOfUncaughtExceptionWithUniqueStatement++;
                                if (utils.isConsoleStatement(bodyStatement.body[0])) {
                                    reportObject.eventsNumberOfUncaughtExceptionWithUniqueConsole++;
                                }
                            }

                            const returnStatements = utils.getStatementsByType(bodyStatement, 'ReturnStatement');
                            if (returnStatements.length > 0) {
                                reportObject.eventsNumberOfUncaughtExceptionReturns++;
                            }

                            const throwsStatements = utils.getStatementsByType(bodyStatement, 'ThrowStatement');
                            if (throwsStatements.length > 0) {
                                reportObject.eventsNumberOfUncaughtExceptionThrows++;
                            }
                        }
                    }

                    if (firstArgObject && firstArgObject.value === 'unhandledRejection') {
                        reportObject.eventsNumberOfEventUnhandledRejection++;
                    }
                }

                if (typeOfFirstArg !== 'string') {
                    reportObject.eventsTotalOfEventsExceptStringType++;
                }
            }
        }
    }
}

module.exports = {
    handleAnalysis
};

function handleThrows(functionBody, reportObject, lines, handleArgs, metricSizeObject) {
    const throwStatements = utils.getStatementsByType(functionBody, 'ThrowStatement');
    const numberOfThrowStatements = throwStatements.length;

    reportObject.eventsNumberOfHandlersThrows += numberOfThrowStatements;
    reportObject.eventsNumberOfHandlersThrowsLiteral += utils.numberOfLiterals(throwStatements);
    reportObject.eventsNumberOfHandlersThrowsErrorObject += utils.numberOfErrorObjects(throwStatements);
    
    if (numberOfThrowStatements > 0) {
        reportObject.eventsNumberOfHandlersThatThrows++;
    }
    
    // Throws literal types
    if (utils.hasLiteral(throwStatements)) {
        reportObject.eventsNumberOfHandlersThatThrowsLiteral++;
        metricSizeObject.throwLiteral = true;
        if (lines === 1) {
            reportObject.eventsNumberOfHandlersThatThrowsLiteralOnly++;
        }
    }
    
    if (utils.hasUndefined(throwStatements)) {
        reportObject.eventsNumberOfHandlersThatThrowsUndefined++;
        metricSizeObject.throwUndefined = true;
        if (lines === 1) {
            reportObject.eventsNumberOfHandlersThatThrowsUndefinedOnly++;
        }
    }

    if (utils.hasNull(throwStatements)) {
        reportObject.eventsNumberOfHandlersThatThrowsNull++;
        metricSizeObject.throwNull = true;
        if (lines === 1) {
            reportObject.eventsNumberOfHandlersThatThrowsNullOnly++;
        }
    }

    if (utils.hasErrorObject(throwStatements)) {
        reportObject.eventsNumberOfHandlersThatThrowsErrorObject++;
        metricSizeObject.throwErrorObject = true;
    }

    // Throws Error objects
    const params = utils.getPropertyFrom(throwStatements, 'argument');
    if (utils.hasErrorObject(params)) {
        reportObject.eventsNumberOfHandlersThrowsErrorObject++;
    }
    // Number of rethrows an error argument
    const numberOfRethrows = utils.reuseAnErrorStatements(throwStatements, handleArgs);
    reportObject.eventsNumberOfHandlersRethrows += numberOfRethrows;
    if (numberOfRethrows > 0) {
        metricSizeObject.rethrow = true;
        reportObject.eventsNumberOfHandlersThatRethrows++;
    }
}

function handleReturns(functionBody, reportObject, handleArgs, lines, errorParams, metricSizeObject) {
    const returnStatements = utils.getStatementsByType(functionBody, 'ReturnStatement');
    const numberOfLiterals = utils.numberOfLiterals(returnStatements);
    const numberOfErrorObjects = utils.numberOfErrorObjects(returnStatements);
    
    reportObject.eventsNumberOfHandlersReturns += returnStatements.length;
    reportObject.eventsNumberOfHandlersReturnsLiteral += numberOfLiterals;
    reportObject.eventsNumberOfHandlersReturnsErrorObject += numberOfErrorObjects;
    reportObject.eventsNumberOfHandlersThatRereturns += utils.reuseAnErrorStatements(returnStatements, handleArgs);

    if (returnStatements.length > 0) {
        // Counts number of returns that uses an error argument (so called rethrow)
        reportObject.eventsNumberOfHandlersThatReturns++;

        if (utils.hasLiteral(returnStatements)) {
            reportObject.eventsNumberOfHandlersThatReturnsLiteral++;
            metricSizeObject.returnLiteral = true;
            if (lines === 1) {
                reportObject.eventsNumberOfHandlersThatReturnsLiteralOnly++;
            }
        }
        
        if (utils.hasUndefined(returnStatements)) {
            reportObject.eventsNumberOfHandlersThatReturnsUndefined++;
            metricSizeObject.returnUndefined = true;
            if (lines === 1) {
                reportObject.eventsNumberOfHandlersThatReturnsUndefinedOnly++;
            }
        }
        
        if (utils.hasNull(returnStatements)) {
            reportObject.eventsNumberOfHandlersThatReturnsNull++;
            metricSizeObject.returnNull = true;
            if (lines === 1) {
                reportObject.eventsNumberOfHandlersThatReturnsNullOnly++;
            }
        }

        if (utils.hasErrorObject(returnStatements)) {
            metricSizeObject.returnErrorObject = true;
            reportObject.eventsNumberOfHandlersThatReturnsErrorObject++;
        }

        const rereturns = utils.reuseAnErrorStatements(returnStatements, errorParams);
        if(rereturns.length > 0){
            metricSizeObject.rereturn = true;
        }
    }
}

function handleContinuesAndBreaks(functionBody, reportObject, lines, metricSizeObject) {
    const continueStatements = utils.getStatementsByType(functionBody, 'ContinueStatement');
    reportObject.eventsNumberOfHandlersContinues += continueStatements.length;
    if (continueStatements.length > 0) {
        reportObject.eventsNumberOfHandlersThatContinues++;
        metricSizeObject.continue = true;
    }
    // Counts number of breaks
    const breakStatements = utils.getStatementsByType(functionBody, 'BreakStatement');
    reportObject.eventsNumberOfHandlersBreaks += breakStatements.length;
    if (breakStatements.length > 0) {
        reportObject.eventsNumberOfHandlersThatBreaks++;
        metricSizeObject.break = true;
        if (lines === 1) {
            reportObject.eventsNumberOfHandlersBreaksOnly++;
        }
    }
}
