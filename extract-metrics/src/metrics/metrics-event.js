const CONFIG = require("../../config");
const utils = require(CONFIG["srcPath"] + 'utils');

function handleAnalysis(node, reportObject) {

    const eventListeningMethods = ['on', 'once'];
    const eventRaisingMethods = ['emit'];

    // eventsNumberOfEventOnWithUniqueConsole
    // eventsNumberOfEventOnWithUniqueStatement
    //
    // eventsNumberOfEventOnceWithUniqueConsole
    // eventsNumberOfEventOnceWithUniqueStatement

    if (node.type === 'CallExpression') {
        if (node.callee.property) {

            const methodName = node.callee.property.name;
            const callExpressionArguments = node.arguments.length;
            const firstArgObject = node.arguments[0];
            const isFirstArgErrorHandling = firstArgObject &&
            firstArgObject.value ? utils.isAnErrorArgument(firstArgObject.value) : false;

            if (callExpressionArguments > 1 && eventListeningMethods.includes(methodName)) {

                const handlerFunction = node.arguments[1];

                if (isFirstArgErrorHandling && handlerFunction.type === 'FunctionExpression') {

                    const handlerParams = utils.getIdentifiersNames(handlerFunction.params);
                    const lines = utils.getNumberOfLines(handlerFunction);
                    const handlerFunctionBody = handlerFunction.body.body;

                    if (handlerFunction && handlerFunction.type === 'FunctionExpression') {

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
                        const throwStatements = utils.getStatementsByType(functionBody, 'ThrowStatement');
                        const numberOfThrowStatements = throwStatements.length;
                        reportObject.eventsNumberOfHandlersThrows += numberOfThrowStatements;
                        reportObject.eventsNumberOfHandlersThrowsLiteral += utils.numberOfLiterals(throwStatements);
                        reportObject.eventsNumberOfHandlersThrowsErrorObject += utils.numberOfErrorObjects(throwStatements);

                        if(numberOfThrowStatements > 0) {
                            reportObject.eventsNumberOfHandlersThatThrows++;
                        }

                        // Throws literal types
                        if (utils.hasLiteral(throwStatements)) {
                            reportObject.eventsNumberOfHandlersThatThrowsLiteral++;

                            if (lines === 1) {
                                reportObject.eventsNumberOfHandlersThatThrowsLiteralOnly++;
                            }
                        }

                        if (utils.hasUndefined(throwStatements)) {
                            reportObject.eventsNumberOfHandlersThatThrowsUndefined++;
                            if (lines === 1) {
                                reportObject.eventsNumberOfHandlersThatThrowsUndefinedOnly++;
                            }
                        }

                        if (utils.hasNull(throwStatements)) {
                            reportObject.eventsNumberOfHandlersThatThrowsNull++;
                            if (lines === 1) {
                                reportObject.eventsNumberOfHandlersThatThrowsNullOnly++;
                            }
                        }

                        if (utils.hasErrorObject(throwStatements)) {
                            reportObject.eventsNumberOfHandlersThatThrowsErrorObject++;
                        }

                        // Throws Error objects
                        const params = utils.getPropertyFrom(throwStatements, 'argument');
                        if(utils.hasErrorObject(params)) {
                            reportObject.eventsNumberOfHandlersThrowsErrorObject++;
                        }

                        // Number of rethrows an error argument
                        const numberOfRethrows = utils.reuseAnErrorStatements(throwStatements, handleArgs);
                        reportObject.eventsNumberOfHandlersRethrows += numberOfRethrows;

                        if(numberOfRethrows > 0){
                            reportObject.eventsNumberOfHandlersThatRethrows++;
                        }

                        // Counts number of returns
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

                                if (lines === 1) {
                                    reportObject.eventsNumberOfHandlersThatReturnsLiteralOnly++;
                                }
                            }

                            if(utils.hasUndefined(returnStatements)) {
                                reportObject.eventsNumberOfHandlersThatReturnsUndefined++;

                                if (lines === 1) {
                                    reportObject.eventsNumberOfHandlersThatReturnsUndefinedOnly++;
                                }
                            }

                            if (utils.hasNull(returnStatements)) {
                                reportObject.eventsNumberOfHandlersThatReturnsNull++;

                                if (lines === 1) {
                                    reportObject.eventsNumberOfHandlersThatReturnsNullOnly++;
                                }
                            }

                            if (utils.hasErrorObject(returnStatements)) {
                                reportObject.eventsNumberOfHandlersThatReturnsErrorObject++;
                            }

                        }

                        // Counts number of continues
                        const continueStatements = utils.getStatementsByType(functionBody, 'ContinueStatement');
                        reportObject.eventsNumberOfHandlersContinues += continueStatements.length;
                        if(continueStatements.length > 0) {
                            reportObject.eventsNumberOfHandlersThatContinues++;
                        }

                        // Counts number of breaks
                        const breakStatements = utils.getStatementsByType(functionBody, 'BreakStatement');
                        reportObject.eventsNumberOfHandlersBreaks += breakStatements.length;
                        if(breakStatements.length > 0) {
                            reportObject.eventsNumberOfHandlersThatBreaks++;

                            if (lines === 1) {
                                reportObject.eventsNumberOfHandlersBreaksOnly++;
                            }
                        }

                    }
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

            if (callExpressionArguments > 0 && (eventListeningMethods.includes(methodName) || eventRaisingMethods.includes(methodName))) {
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