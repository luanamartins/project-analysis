const utils = require('./utils');

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

                if (isFirstArgErrorHandling) {

                    const handlerParams = utils.getIdentifiersNames(handlerFunction.params);
                    const lines = utils.getNumberOfLines(handlerFunction);
                    if (handlerFunction && handlerFunction.type === 'FunctionExpression') {
                        if (methodName === 'on') {
                            reportObject.eventsNumberOfEventMethodsOn++;


                            reportObject.eventsNumberOfEventOnLines += lines;
                            const location = handlerFunction.loc;
                            reportObject.eventsNumberOfEventOnLinesStart.push(location.start.line);
                            reportObject.eventsNumberOfEventOnLinesEnd.push(location.end.line);

                            if (utils.isEmptyHandler(handlerFunction.body, handlerParams, lines)) {
                                reportObject.eventsNumberOfEventOnEmptyFunctions++;
                            }

                        } else if (methodName === 'once') {

                            reportObject.eventsNumberOfEventMethodsOnce++;


                            reportObject.eventsNumberOfEventOnceLines += utils.getNumberOfLines(handlerFunction);
                            const location = handlerFunction.loc;
                            reportObject.eventsNumberOfEventOnceLinesStart.push(location.start.line);
                            reportObject.eventsNumberOfEventOnceLinesEnd.push(location.end.line);

                            if (utils.isEmptyHandler(handlerFunction.body, handlerParams, lines)) {
                                reportObject.eventsNumberOfEventOnceEmptyFunctions++;
                            }
                        }

                        const handlerBody = handlerFunction.body;
                        const handlerArgs = utils.getIdentifiersNames(handlerFunction.params);

                        // Throw an error
                        const throwStatements = utils.getStatementsByType(handlerBody, 'ThrowStatement');
                        reportObject.eventsNumberOfThrowErrorsOnCatches += throwStatements.length;

                        // Number of rethrow an error argument
                        reportObject.eventsNumberOfRethrowsOnCatches += utils.handleRethrowStatements(throwStatements, handlerArgs);

                        // Counts number of returns
                        const returnStatements = utils.getStatementsByType(handlerBody, 'ReturnStatement');
                        reportObject.eventsNumberOfReturnsOnCatches += returnStatements.length;

                        // Counts number of returns that uses an error argument
                        returnStatements.forEach((statement) => {
                            const returnArgument = statement.argument;
                            if (utils.useAnyArguments(returnArgument, handlerArgs)) {
                                reportObject.eventsNumberOfReturnsAnErrorOnCatches++;
                            }
                        });

                        // Counts number of breaks
                        const breakStatements = utils.getStatementsByType(handlerBody, 'BreakStatement');
                        reportObject.eventsNumberOfBreaksOnCatches += breakStatements.length;
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
                    const literalValue = node.arguments[0].raw;

                    // the method is an event listener or emitter and is listing/raising a string as event
                    if (utils.isString(literalValue)) {
                        reportObject.eventsTotalOfStringEvents++;
                    }

                    if (firstArgObject && firstArgObject.value === 'uncaughtException') {
                        reportObject.eventsNumberOfEventUncaughtException++;
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