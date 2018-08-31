const CONFIG = require("../../config");
const constants = require('../constants')
const utils = require(CONFIG["srcPath"] + 'utils');

function handleAnalysis(node, reportObject, metric_size_array) {

    if (node && node.type === constants.ASSIGNMENT_EXPRESSION) {
        const leftSideObject = node.left.object;
        const leftSideProperty = node.left.property;

        if (leftSideObject && leftSideProperty && leftSideProperty.name === 'onerror') {
            // window.onerror
            if (leftSideObject.name === 'window') {
                handleWindow(reportObject, node, metric_size_array);
            }

            // element.onerror
            if (leftSideObject.name === 'element') {
                handleElement(reportObject, node, metric_size_array);
            }
        }
    }

    // window.addEventListener('error')
    if (node.type === constants.CALL_EXPRESSION && node.callee.object && node.callee.property) {
        const objectName = node.callee.object.name;
        const propertyName = node.callee.property.name;
        const firstArg = node.arguments[0];

        if (objectName === 'window' && propertyName === 'addEventListener' &&
            firstArg && firstArg.value === 'error') {
            reportObject.numberOfWindowAddEventListener++;

            const arguments = node.arguments;
            const functionHandler = arguments[1];

            if (functionHandler && functionHandler.type === 'FunctionExpression') {

                const functionBody = functionHandler.body;
                const errors = utils.getAllErrorArgs(utils.getIdentifiersNames(functionHandler.params));
                const numberOfLines = utils.getNumberOfLines(functionBody);
                reportObject.numberOfWindowAddEventListenerLines += numberOfLines;

                const hasErrorArguments = errors.length !== 0;

                const metricSizeObject = utils.getEmptyMetricSizeObject();
                metricSizeObject.mech = constants.WINDOW_ADDEVENTLISTENER;
                metricSizeObject.lines = numberOfLines;
                metricSizeObject.stmts = functionBody.body.length;
                metricSizeObject.has_error_arguments = hasErrorArguments;
                metricSizeObject.empty = numberOfLines.length === 0;

                if (utils.hasConsoleLog(functionBody)) {
                    metricSizeObject.consoleLog = true;
                }

                // reassigning an error
                if (utils.hasErrorReassignment(functionBody, errors)) {
                    reportObject.numberOfWindowAddEventListenerReassigning++;
                    metricSizeObject.reassigningError = true;
                }

                if(utils.hasAlertMethodCalling(functionBody)) {
                    metricSizeObject.alert = true;
                }

                if (numberOfLines === 0) {
                    reportObject.numberOfWindowAddEventListenerEmptyHandler++;
                } else if (!utils.useAnyArguments(functionBody, errors)) {
                    reportObject.numberOfWindowAddEventListenerNoUsageOfErrorArgument++;
                    metricSizeObject.noUsageOfErrorArg = true;
                }

                if(numberOfLines === 1) {
                    reportObject.numberOfWindowAddEventListenerUniqueStatement++;
                    const body = functionBody.body[0];
                    if(utils.isConsoleStatement(body)) {
                        reportObject.numberOfWindowAddEventListenerUniqueConsole++;
                    }
                }

                const throwStatements = utils.getStatementsByType(functionBody, 'ThrowStatement');
                reportObject.numberOfWindowAddEventListenerThrows += throwStatements.length;
                if (throwStatements.length > 0) {
                    reportObject.numberOfWindowAddEventListenerThatThrows++;
                }

                // Throws literal types
                if (utils.hasLiteral(throwStatements)) {
                    // reportObject.eventsNumberOfHandlersThatThrowsLiteral++;
                    metricSizeObject.throwLiteral = true;
                    // if (lines === 1) {
                    //     reportObject.eventsNumberOfHandlersThatThrowsLiteralOnly++;
                    // }
                }
                
                if (utils.hasUndefined(throwStatements)) {
                    // reportObject.eventsNumberOfHandlersThatThrowsUndefined++;
                    metricSizeObject.throwUndefined = true;
                    // if (lines === 1) {
                    //     reportObject.eventsNumberOfHandlersThatThrowsUndefinedOnly++;
                    // }
                }

                if (utils.hasNull(throwStatements)) {
                    // reportObject.eventsNumberOfHandlersThatThrowsNull++;
                    metricSizeObject.throwNull = true;
                    // if (lines === 1) {
                    //     reportObject.eventsNumberOfHandlersThatThrowsNullOnly++;
                    // }
                }

                if (utils.hasErrorObject(throwStatements)) {
                    // reportObject.eventsNumberOfHandlersThatThrowsErrorObject++;
                    metricSizeObject.throwErrorObject = true;
                }

                // Number of rethrow an error argument
                const numberOfRethrowStatements = utils.reuseAnErrorStatements(throwStatements, errors);
                reportObject.numberOfWindowAddEventListenerRethrows += numberOfRethrowStatements;

                if(numberOfRethrowStatements > 0) {
                    reportObject.numberOfWindowAddEventListenerThatRethrows++;
                    metricSizeObject.rereturn = true;
                }

                // Counts number of returns
                const returnStatements = utils.getStatementsByType(functionBody, 'ReturnStatement');
                reportObject.numberOfWindowAddEventListenerReturns += returnStatements.length;
                if (returnStatements.length > 0) {
                    // Counts number of returns that uses an error argument (so called rethrow)
                    reportObject.numberOfWindowAddEventListenerThatReturns++;
                    reportObject.numberOfWindowAddEventListenerThatReturnsLiteral += utils.hasLiteral(returnStatements);
                }

                if (utils.hasLiteral(returnStatements)) {
                    metricSizeObject.returnLiteral = true;
                }
                
                if (utils.hasUndefined(returnStatements)) {
                    metricSizeObject.returnUndefined = true;
                }
                
                if (utils.hasNull(returnStatements)) {
                    metricSizeObject.returnNull = true;
                }
        
                if (utils.hasErrorObject(returnStatements)) {
                    metricSizeObject.returnErrorObject = true;
                }
        
                const rereturns = utils.reuseAnErrorStatements(returnStatements, errors);
                if(rereturns.length > 0){
                    metricSizeObject.rereturn = true;
                }

                // Counts number of continues
                const continueStatements = utils.getStatementsByType(functionBody, 'ContinueStatement');
                reportObject.numberOfWindowAddEventListenerContinues += continueStatements.length;
                if(continueStatements.length > 0) {
                    reportObject.numberOfWindowAddEventListenerThatContinues++;
                    metricSizeObject.continue = true;
                }

                const breakStatements = utils.getStatementsByType(functionBody, 'BreakStatement');
                reportObject.numberOfWindowAddEventListenerBreaks += breakStatements.length;
                if(breakStatements.length > 0) {
                    reportObject.numberOfWindowAddEventListenerThatBreaks++;
                    metricSizeObject.break = true;
                }

                metric_size_array.push(metricSizeObject);
            }
        }
    }
}

module.exports = {
    handleAnalysis
};

function handleElement(reportObject, node, metric_size_array) {
    reportObject.numberOfElementOnError++;
    const functionRightSide = node.right;
    
    if (functionRightSide && functionRightSide.body) {
        const rightSideBlockStatement = functionRightSide.body;
        const numberOfLines = utils.getNumberOfLines(rightSideBlockStatement);
        
        reportObject.numberOfElementOnErrorLines += numberOfLines;
        const errors = utils.getAllErrorArgs(utils.getIdentifiersNames(functionRightSide.params));
        const hasErrorArguments = errors.length !== 0;
        
        const metricSizeObject = utils.getEmptyMetricSizeObject();
        metricSizeObject.mech = constants.ELEMENT_ON_ERROR;
        metricSizeObject.lines = numberOfLines;
        metricSizeObject.stmts = rightSideBlockStatement.body.length;
        metricSizeObject.has_error_arguments = hasErrorArguments;
        metricSizeObject.empty = numberOfLines.length === 0;

        // empty handler
        if (numberOfLines === 0) {
            reportObject.numberOfElementOnErrorEmptyHandler++;
        } else if (!utils.useAnyArguments(rightSideBlockStatement, errors)) {
            reportObject.numberOfElementOnErrorOnNoUsageOfErrorArgument++;
            metricSizeObject.noUsageOfErrorArg = true;
        }

        if(utils.hasConsoleLog(rightSideBlockStatement.body)) {
            metricSizeObject.consoleLog = true;
        }

        if(utils.hasAlertMethodCalling(rightSideBlockStatement.body)) {
            metricSizeObject.alert = true;
        }

        // reassigning an error
        if (utils.hasErrorReassignment(rightSideBlockStatement, errors)) {
            reportObject.numberOfElementOnErrorReassigning++;
            metricSizeObject.reassigningError = true;
        }
        
        if (numberOfLines === 1) {
            // Handler has only one statement
            reportObject.numberOfElementOnErrorUniqueStatement++;
            if (utils.isConsoleStatement(rightSideBlockStatement.body[0])) {
                // Handler's unique statement is console.log
                reportObject.numberOfElementOnErrorUniqueConsole++;
            }
        }
        
        const throwStatements = utils.getStatementsByType(rightSideBlockStatement, 'ThrowStatement');
        reportObject.numberOfElementOnErrorThrows += throwStatements.length;
        if (throwStatements.length > 0) {
            reportObject.numberOfElementOnErrorThatThrows++;
        }

        // Throws literal types
        if (utils.hasLiteral(throwStatements)) {
            // reportObject.eventsNumberOfHandlersThatThrowsLiteral++;
            metricSizeObject.throwLiteral = true;
            // if (lines === 1) {
            //     reportObject.eventsNumberOfHandlersThatThrowsLiteralOnly++;
            // }
        }
        
        if (utils.hasUndefined(throwStatements)) {
            // reportObject.eventsNumberOfHandlersThatThrowsUndefined++;
            metricSizeObject.throwUndefined = true;
            // if (lines === 1) {
            //     reportObject.eventsNumberOfHandlersThatThrowsUndefinedOnly++;
            // }
        }

        if (utils.hasNull(throwStatements)) {
            // reportObject.eventsNumberOfHandlersThatThrowsNull++;
            metricSizeObject.throwNull = true;
            // if (lines === 1) {
            //     reportObject.eventsNumberOfHandlersThatThrowsNullOnly++;
            // }
        }

        if (utils.hasErrorObject(throwStatements)) {
            // reportObject.eventsNumberOfHandlersThatThrowsErrorObject++;
            metricSizeObject.throwErrorObject = true;
        }

        // Throws Error objects
        const params = utils.getPropertyFrom(throwStatements, 'argument');
        if (utils.hasErrorObject(params)) {
            reportObject.eventsNumberOfHandlersThrowsErrorObject++;
        }
        
        // Number of rethrow an error argument
        const numberOfRethrowStatements = utils.reuseAnErrorStatements(throwStatements, errors);
        reportObject.numberOfElementOnErrorRethrows += numberOfRethrowStatements;
        
        if (numberOfRethrowStatements > 0) {
            reportObject.numberOfElementOnErrorThatRethrows++;
            metricSizeObject.rethrow = true;
        }

        // Counts number of returns
        const returnStatements = utils.getStatementsByType(rightSideBlockStatement, 'ReturnStatement');
        reportObject.numberOfElementOnErrorReturns += returnStatements.length;
        if (returnStatements.length > 0) {
            // Counts number of returns that uses an error argument (so called rethrow)
            reportObject.numberOfElementOnErrorThatReturns++;
            reportObject.numberOfElementOnErrorThatReturnsLiteral += utils.hasLiteral(returnStatements);
        }

        // Throws literal types
        if (utils.hasLiteral(returnStatements)) {
            // reportObject.eventsNumberOfHandlersThatThrowsLiteral++;
            metricSizeObject.returnLiteral = true;
            // if (lines === 1) {
            //     reportObject.eventsNumberOfHandlersThatThrowsLiteralOnly++;
            // }
        }
        
        if (utils.hasUndefined(returnStatements)) {
            // reportObject.eventsNumberOfHandlersThatThrowsUndefined++;
            metricSizeObject.returnUndefined = true;
            // if (lines === 1) {
            //     reportObject.eventsNumberOfHandlersThatThrowsUndefinedOnly++;
            // }
        }

        if (utils.hasNull(returnStatements)) {
            // reportObject.eventsNumberOfHandlersThatThrowsNull++;
            metricSizeObject.returnNull = true;
            // if (lines === 1) {
            //     reportObject.eventsNumberOfHandlersThatThrowsNullOnly++;
            // }
        }

        if (utils.hasErrorObject(returnStatements)) {
            // reportObject.eventsNumberOfHandlersThatThrowsErrorObject++;
            metricSizeObject.returnErrorObject = true;
        }

        const rereturns = utils.reuseAnErrorStatements(returnStatements, errors);
        if(rereturns.length > 0){
            metricSizeObject.rereturn = true;
        }
        
        // Counts number of continues
        const continueStatements = utils.getStatementsByType(rightSideBlockStatement, 'ContinueStatement');
        reportObject.numberOfElementOnErrorContinues += continueStatements.length;
        if (continueStatements.length > 0) {
            metricSizeObject.continue = true;
            reportObject.numberOfElementOnErrorThatContinues++;
        }
        
        const breakStatements = utils.getStatementsByType(rightSideBlockStatement, 'BreakStatement');
        reportObject.numberOfElementOnErrorBreaks += breakStatements.length;
        if (breakStatements.length > 0) {
            metricSizeObject.break = true;
            reportObject.numberOfElementOnErrorThatBreaks++;
        }

        metric_size_array.push(metricSizeObject);
    }
}

function handleWindow(reportObject, node, metric_size_array) {
    reportObject.numberOfWindowOnError++;
    const rightSide = node.right;
    if (rightSide && rightSide.body) {
        const rightSideBlockStatement = rightSide.body;
        const numberOfLines = utils.getNumberOfLines(rightSideBlockStatement);
        reportObject.numberOfWindowOnErrorLines += numberOfLines;
        
        const errors = utils.getAllErrorArgs(utils.getIdentifiersNames(rightSide.params));
        const hasErrorArguments = errors.length !== 0;

        const metricSizeObject = utils.getEmptyMetricSizeObject();
        metricSizeObject.mech = constants.WINDOW_ON_ERROR;
        metricSizeObject.lines = numberOfLines;
        metricSizeObject.stmts = rightSideBlockStatement.body.length;
        metricSizeObject.has_error_arguments = hasErrorArguments;
        metricSizeObject.empty = numberOfLines.length === 0;

        if (!utils.useAnyArguments(rightSideBlockStatement, errors)) {
            metricSizeObject.noUsageOfErrorArg = true;
        }

        if(utils.hasConsoleLog(rightSideBlockStatement)) {
            metricSizeObject.consoleLog = true;
        }

        if(utils.hasAlertMethodCalling(rightSideBlockStatement)) {
            metricSizeObject.alert = true;
        }

        // reasigning an error
        if (utils.hasErrorReassignment(rightSideBlockStatement, errors)) {
            reportObject.numberOfWindowOnErrorReassigning++;
            metricSizeObject.reassigningError = true;
        }
        if (numberOfLines === 0) {
            reportObject.numberOfWindowOnErrorEmptyHandler++;
        }
        else if (!utils.useAnyArguments(rightSideBlockStatement, errors)) {
            reportObject.numberOfWindowOnErrorOnNoUsageOfErrorArgument++;
        }
        if (numberOfLines === 1) {
            // Handler has only one statement
            reportObject.numberOfWindowOnErrorUniqueStatement++;
            if (utils.isConsoleStatement(rightSideBlockStatement.body[0])) {
                // Handler's unique statement is console.log
                reportObject.numberOfWindowOnErrorUniqueConsole++;
            }
        }
        const throwStatements = utils.getStatementsByType(rightSideBlockStatement, 'ThrowStatement');
        reportObject.numberOfWindowOnErrorThrows += throwStatements.length;
        if (throwStatements.length > 0) {
            reportObject.numberOfWindowOnErrorThatThrows++;
        }

        if (utils.hasLiteral(throwStatements)) {
            // reportObject.eventsNumberOfHandlersThatThrowsLiteral++;
            metricSizeObject.throwLiteral = true;
            // if (lines === 1) {
            //     reportObject.eventsNumberOfHandlersThatThrowsLiteralOnly++;
            // }
        }

        if(utils.hasUndefined(throwStatements)) {
            metricSizeObject.throwUndefined = true;
        }

        if (utils.hasNull(throwStatements)) {
            metricSizeObject.throwNull = true;
        }

        if(utils.hasErrorObject(throwStatements)) {
            metricSizeObject.throwErrorObject = true;
        }

        // Number of rethrow an error argument
        const numberOfRethrowStatements = utils.reuseAnErrorStatements(throwStatements, errors);
        reportObject.numberOfWindowOnErrorRethrows += numberOfRethrowStatements;
        if (numberOfRethrowStatements > 0) {
            reportObject.numberOfWindowOnErrorThatRethrows++;
            metricSizeObject.rerethrow = true;
        }

        // Counts number of returns
        const returnStatements = utils.getStatementsByType(rightSideBlockStatement, 'ReturnStatement');
        reportObject.numberOfWindowOnErrorReturns += returnStatements.length;
        if (returnStatements.length > 0) {
            // Counts number of returns that uses an error argument (so called rethrow)
            reportObject.numberOfWindowOnErrorThatReturns++;
            reportObject.numberOfWindowOnErrorThatReturnsLiteral += utils.hasLiteral(returnStatements);

            if (utils.hasLiteral(returnStatements)) {
                metricSizeObject.returnLiteral = true;
            }
            
            if (utils.hasUndefined(returnStatements)) {
                metricSizeObject.returnUndefined = true;
            }
            
            if (utils.hasNull(returnStatements)) {
                metricSizeObject.returnNull = true;
            }
    
            if (utils.hasErrorObject(returnStatements)) {
                metricSizeObject.returnErrorObject = true;
            }
    
            const rereturns = utils.reuseAnErrorStatements(returnStatements, errors);
            if(rereturns.length > 0){
                metricSizeObject.rereturn = true;
            }
        }

        // Counts number of continues
        const continueStatements = utils.getStatementsByType(rightSideBlockStatement, 'ContinueStatement');
        reportObject.numberOfWindowOnErrorContinues += continueStatements.length;
        if (continueStatements.length > 0) {
            reportObject.numberOfWindowOnErrorThatContinues++;
            metricSizeObject.continue = true;
        }
        
        const breakStatements = utils.getStatementsByType(rightSideBlockStatement, 'BreakStatement');
        reportObject.numberOfWindowOnErrorBreaks += breakStatements.length;
        if (breakStatements.length > 0) {
            reportObject.numberOfWindowOnErrorThatBreaks++;
            metricSizeObject.break = true;
        }

        metric_size_array.push(metricSizeObject);
    }
}

