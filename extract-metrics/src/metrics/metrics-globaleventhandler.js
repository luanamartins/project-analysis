const CONFIG = require("../../config");
const utils = require(CONFIG["srcPath"] + 'utils');

function handleAnalysis(node, reportObject) {

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

                    // empty handler
                    // if (utils.isEmptyHandler(rightSideBlockStatement, errors, numberOfLines)) {
                    //     reportObject.numberOfWindowOnErrorEmptyHandler++;
                    // }

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
                    const numberOfRethrowStatements = utils.handleRethrowStatements(throwStatements, errors);
                    reportObject.numberOfWindowOnErrorRethrows += numberOfRethrowStatements;

                    if(numberOfRethrowStatements > 0) {
                        reportObject.numberOfWindowOnErrorThatRethrows++;
                    }

                    // Counts number of returns
                    const returnStatements = utils.getStatementsByType(rightSideBlockStatement, 'ReturnStatement');
                    if (returnStatements.length > 0) {
                        reportObject.numberOfWindowOnErrorReturns++;

                        // Counts number of returns that uses an error argument (so called rethrow)
                        // TODO
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

                    // empty handler
                    if (numberOfLines === 0) {
                        reportObject.numberOfElementOnErrorEmptyHandler++;
                    } else if (!utils.useAnyArguments(rightSideBlockStatement, errors)) {
                        reportObject.numberOfElementOnErrorOnNoUsageOfErrorArgument++;
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
                    const numberOfRethrowStatements = utils.handleRethrowStatements(throwStatements, errors);
                    reportObject.numberOfElementOnErrorRethrows += numberOfRethrowStatements;

                    if(numberOfRethrowStatements > 0) {
                        reportObject.numberOfElementOnErrorThatRethrows++;
                    }

                    const returnStatements = utils.getStatementsByType(rightSideBlockStatement, 'ReturnStatement');
                    if (returnStatements.length > 0) {
                        reportObject.numberOfElementOnErrorReturns++;
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
                const args = utils.getAllErrorArgs(utils.getIdentifiersNames(functionHandler.params));
                const numberOfLines = utils.getNumberOfLines(functionBody);
                reportObject.numberOfWindowAddEventListenerLines += numberOfLines;

                if (numberOfLines === 0) {
                    reportObject.numberOfWindowAddEventListenerEmptyHandler++;
                } else if (!utils.useAnyArguments(functionBody, args)) {
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
                const numberOfRethrowStatements = utils.handleRethrowStatements(throwStatements, errors);
                reportObject.numberOfWindowAddEventListenerRethrows += numberOfRethrowStatements;

                if(numberOfRethrowStatements > 0) {
                    reportObject.numberOfWindowAddEventListenerThatRethrows++;
                }

                const returnStatements = utils.getStatementsByType(functionBody, 'ReturnStatement');
                if (returnStatements.length > 0) {
                    reportObject.numberOfWindowAddEventListenerReturns++;
                }
            }
        }
    }
}

module.exports = {
    handleAnalysis
};
