const CONFIG = require("../../config");
const constants = require('../constants')
const utils = require(CONFIG["srcPath"] + 'utils');

function handleAnalysis(node, reportObject, metric_size_array) {

    if (node && node.type === 'AssignmentExpression') {
        const leftSideObject = node.left.object;
        const leftSideProperty = node.left.property;

        if (leftSideObject && leftSideProperty && leftSideProperty.name === 'onerror') {
            // window.onerror
            if (leftSideObject.name === 'window') {
                reportObject.numberOfWindowOnError++;
                const rightSide = node.right;
                if (rightSide && rightSide.body) {
                    const rightSideBlockStatement = rightSide.body;
                    const numberOfLines = utils.getNumberOfLines(rightSideBlockStatement);
                    reportObject.numberOfWindowOnErrorLines += numberOfLines;
                    const errors = utils.getAllErrorArgs(utils.getIdentifiersNames(rightSide.params));
                    const hasErrorArguments = errors.length !== 0;

                    metric_size_array.push({
                        'mech': constants.WINDOW_ON_ERROR,
                        'lines': numberOfLines,
                        'stmts': rightSideBlockStatement.body.length,
                        'has_error_arguments': hasErrorArguments
                    });

                    // reasigning an error
                    if (utils.hasErrorReassignment(rightSideBlockStatement, errors)) {
                        reportObject.numberOfWindowOnErrorReassigning++;
                    }

                    if (numberOfLines === 0) {
                        reportObject.numberOfWindowOnErrorEmptyHandler++;
                    } else if (!utils.useAnyArguments(rightSideBlockStatement, errors)) {
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

                    // Number of rethrow an error argument
                    const numberOfRethrowStatements = utils.reuseAnErrorStatements(throwStatements, errors);
                    reportObject.numberOfWindowOnErrorRethrows += numberOfRethrowStatements;

                    if(numberOfRethrowStatements > 0) {
                        reportObject.numberOfWindowOnErrorThatRethrows++;
                    }

                    // Counts number of returns
                    const returnStatements = utils.getStatementsByType(rightSideBlockStatement, 'ReturnStatement');
                    reportObject.numberOfWindowOnErrorReturns += returnStatements.length;
                    if (returnStatements.length > 0) {
                        // Counts number of returns that uses an error argument (so called rethrow)
                        reportObject.numberOfWindowOnErrorThatReturns++;
                        reportObject.numberOfWindowOnErrorThatReturnsLiteral += utils.hasLiteral(returnStatements);
                    }

                    // Counts number of continues
                    const continueStatements = utils.getStatementsByType(rightSideBlockStatement, 'ContinueStatement');
                    reportObject.numberOfWindowOnErrorContinues += continueStatements.length;
                    if(continueStatements.length > 0) {
                        reportObject.numberOfWindowOnErrorThatContinues++;
                    }

                    const breakStatements = utils.getStatementsByType(rightSideBlockStatement, 'BreakStatement');
                    reportObject.numberOfWindowOnErrorBreaks += breakStatements.length;
                    if(breakStatements.length > 0) {
                        reportObject.numberOfWindowOnErrorThatBreaks++;
                    }
                }
            }

            // element.onerror
            if (leftSideObject.name === 'element') {
                reportObject.numberOfElementOnError++;

                const functionRightSide = node.right;
                if (functionRightSide && functionRightSide.body) {
                    const rightSideBlockStatement = functionRightSide.body;
                    const numberOfLines = utils.getNumberOfLines(rightSideBlockStatement);
                    reportObject.numberOfElementOnErrorLines += numberOfLines;
                    const errors = utils.getAllErrorArgs(utils.getIdentifiersNames(functionRightSide.params));

                    const hasErrorArguments = errors.length !== 0;

                    metric_size_array.push({
                        'mech': constants.ELEMENT_ON_ERROR,
                        'lines': numberOfLines,
                        'stmts': rightSideBlockStatement.body.length,
                        'has_error_arguments': hasErrorArguments
                    });

                    // empty handler
                    if (numberOfLines === 0) {
                        reportObject.numberOfElementOnErrorEmptyHandler++;
                    } else if (!utils.useAnyArguments(rightSideBlockStatement, errors)) {
                        reportObject.numberOfElementOnErrorOnNoUsageOfErrorArgument++;
                    }

                    // reassigning an error
                    if (utils.hasErrorReassignment(rightSideBlockStatement, errors)) {
                        reportObject.numberOfElementOnErrorReassigning++;
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

                    // Number of rethrow an error argument
                    const numberOfRethrowStatements = utils.reuseAnErrorStatements(throwStatements, errors);
                    reportObject.numberOfElementOnErrorRethrows += numberOfRethrowStatements;

                    if(numberOfRethrowStatements > 0) {
                        reportObject.numberOfElementOnErrorThatRethrows++;
                    }

                    // Counts number of returns
                    const returnStatements = utils.getStatementsByType(rightSideBlockStatement, 'ReturnStatement');
                    reportObject.numberOfElementOnErrorReturns += returnStatements.length;
                    if (returnStatements.length > 0) {
                        // Counts number of returns that uses an error argument (so called rethrow)
                        reportObject.numberOfElementOnErrorThatReturns++;
                        reportObject.numberOfElementOnErrorThatReturnsLiteral += utils.hasLiteral(returnStatements);
                    }

                    // Counts number of continues
                    const continueStatements = utils.getStatementsByType(rightSideBlockStatement, 'ContinueStatement');
                    reportObject.numberOfElementOnErrorContinues += continueStatements.length;
                    if(continueStatements.length > 0) {
                        reportObject.numberOfElementOnErrorThatContinues++;
                    }

                    const breakStatements = utils.getStatementsByType(rightSideBlockStatement, 'BreakStatement');
                    reportObject.numberOfElementOnErrorBreaks += breakStatements.length;
                    if(breakStatements.length > 0) {
                        reportObject.numberOfElementOnErrorThatBreaks++;
                    }
                }
            }
        }
    }

    // window.addEventListener('error')
    if (node.type === 'CallExpression' && node.callee.object && node.callee.property) {
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

                metric_size_array.push({
                    'mech': constants.WINDOW_ADDEVENTLISTENER,
                    'lines': numberOfLines,
                    'stmts': functionBody.body.length,
                    'has_error_arguments': hasErrorArguments
                });

                // reassigning an error
                if (utils.hasErrorReassignment(functionBody, errors)) {
                    reportObject.numberOfWindowAddEventListenerReassigning++;
                }

                if (numberOfLines === 0) {
                    reportObject.numberOfWindowAddEventListenerEmptyHandler++;
                } else if (!utils.useAnyArguments(functionBody, errors)) {
                    reportObject.numberOfWindowAddEventListenerNoUsageOfErrorArgument++;
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

                // Number of rethrow an error argument
                const numberOfRethrowStatements = utils.reuseAnErrorStatements(throwStatements, errors);
                reportObject.numberOfWindowAddEventListenerRethrows += numberOfRethrowStatements;

                if(numberOfRethrowStatements > 0) {
                    reportObject.numberOfWindowAddEventListenerThatRethrows++;
                }

                // Counts number of returns
                const returnStatements = utils.getStatementsByType(functionBody, 'ReturnStatement');
                reportObject.numberOfWindowAddEventListenerReturns += returnStatements.length;
                if (returnStatements.length > 0) {
                    // Counts number of returns that uses an error argument (so called rethrow)
                    reportObject.numberOfWindowAddEventListenerThatReturns++;
                    reportObject.numberOfWindowAddEventListenerThatReturnsLiteral += utils.hasLiteral(returnStatements);
                }

                // Counts number of continues
                const continueStatements = utils.getStatementsByType(functionBody, 'ContinueStatement');
                reportObject.numberOfWindowAddEventListenerContinues += continueStatements.length;
                if(continueStatements.length > 0) {
                    reportObject.numberOfWindowAddEventListenerThatContinues++;
                }

                const breakStatements = utils.getStatementsByType(functionBody, 'BreakStatement');
                reportObject.numberOfWindowAddEventListenerBreaks += breakStatements.length;
                if(breakStatements.length > 0) {
                    reportObject.numberOfWindowAddEventListenerThatBreaks++;
                }
            }
        }
    }
}

module.exports = {
    handleAnalysis
};
