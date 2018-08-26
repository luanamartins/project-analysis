const CONFIG = require("../../config");
const constants = require('../constants');
const utils = require(CONFIG["srcPath"] + 'utils');


function handleRejects(reportObject, node) {
    reportObject.promiseNumberOfRejects++;
    const nodeArgs = node.arguments;
    if (utils.hasAnyLiteral(nodeArgs)) {
        reportObject.promiseNumberOfCatchesRejectsLiteral++;
    }

    if (!utils.hasErrorObject(nodeArgs)) {
        reportObject.promiseNumberOfCatchesNonAnErrorObject++;
    }
}

function handleCatches(reportObject, node, metric_size_array) {
    reportObject.promiseNumberOfPromiseCatches++;
    const numberOfArgumentsOnCatch = node.arguments.length;
    if (numberOfArgumentsOnCatch >= 1) {

        const firstArgument = node.arguments[0];
        const lines = utils.getNumberOfLines(firstArgument);

        const location = firstArgument.loc;
        reportObject.promiseNumberOfPromiseCatchesLines += lines;
        reportObject.promiseNumberOfPromiseCatchesLinesStart.push(location.start.line);
        reportObject.promiseNumberOfPromiseCatchesLinesEnd.push(location.end.line);

        if (firstArgument.type === 'FunctionDeclaration' ||
            firstArgument.type === 'FunctionExpression') {

            const functionBody = firstArgument.body;
            const functionParams = utils.getIdentifiersNames(firstArgument.params);
            const hasErrorArguments = utils.hasAnErrorArgument(functionParams);

            metric_size_array.push({
                'mech': constants.PROMISE,
                'lines': lines,
                'stmts': functionBody.body.length,
                'has_error_arguments': hasErrorArguments
            });


            if(hasErrorArguments === 0) {
                reportObject.promiseNumberOfCatchesFunctionWithNoArg++;
            }

            if (lines === 0) {
                reportObject.promiseNumberOfEmptyFunctionsOnPromiseCatches++;
            } else if (functionParams.length > 0 && !utils.useAnyArguments(functionBody, functionParams)) {
                reportObject.promiseNumberOfFunctionsOnCatchesNoUsageOfErrorArgument++;
            }

            if (lines === 1) {
                reportObject.promiseNumberOfCatchesWithUniqueStatement++;

                const statement = functionBody.body[0];
                if (utils.isConsoleStatement(statement)) {
                    reportObject.promiseNumberOfCatchesWithUniqueConsole++;
                }

                if(utils.isAlertCallExpression(statement)) {
                    reportObject.promiseNumberOfCatchesAlertOnly++;
                }
            }

            if (utils.hasErrorReassignment(functionBody, functionParams)) {
                reportObject.promiseNumberOfErrorReassigning++;
            }

            // Number of throws on catches
            const throwStatements = utils.getStatementsByType(functionBody, 'ThrowStatement');
            const numberOfThrowStatements = throwStatements.length;
            reportObject.promiseNumberOfCatchesThrows += numberOfThrowStatements;

            if(numberOfThrowStatements > 0) {
                reportObject.promiseNumberOfCatchesThatThrows++;
                const numberOfLiterals = utils.numberOfLiterals(throwStatements);

                reportObject.promiseNumberOfCatchesThrowsLiteral += numberOfLiterals;
                reportObject.promiseNumberOfCatchesThrowsErrorObject += utils.numberOfErrorObjects(throwStatements);

                if (numberOfLiterals > 0) {
                    reportObject.promiseNumberOfCatchesThatThrowsLiteral++;

                    if (lines === 1) {
                        reportObject.promiseNumberOfCatchesThatThrowsLiteralOnly++;
                    }
                }

                if(utils.hasUndefined(throwStatements)) {
                    reportObject.promiseNumberOfCatchesThatThrowsUndefined++;

                    if (lines === 1) {
                        reportObject.promiseNumberOfCatchesThatThrowsUndefinedOnly++;
                    }
                }

                if (utils.hasNull(throwStatements)) {
                    reportObject.promiseNumberOfCatchesThatThrowsNull++;
                    if (lines === 1) {
                        reportObject.promiseNumberOfCatchesThatThrowsNullOnly++;
                    }
                }

                if(utils.hasErrorObject(throwStatements)) {
                    reportObject.promiseNumberOfCatchesThatThrowsErrorObject++;
                }
            }

            // Number of throws primitive types
            reportObject.promiseNumberOfThrowPrimitiveTypesOnCatches += utils.getThrowPrimitiveTypes(throwStatements);

            // Number of rethrows on catches
            const numberOfRethrows = utils.reuseAnErrorStatements(throwStatements, functionParams);
            reportObject.promiseNumberOfCatchesRethrows += numberOfRethrows;
            if(numberOfRethrows > 0){
                reportObject.promiseNumberOfCatchesThatRethrows++;
            }

            // Counts number of returns
            const returnStatements = utils.getStatementsByType(functionBody, 'ReturnStatement');
            reportObject.promiseNumberOfCatchesReturns += returnStatements.length;

            const numberOfLiterals = utils.numberOfLiterals(returnStatements);
            const numberOfErrorObjects = utils.numberOfErrorObjects(returnStatements);
            reportObject.promiseNumberOfCatchesReturnsLiteral += numberOfLiterals;
            reportObject.promiseNumberOfCatchesReturnsErrorObject += numberOfErrorObjects;
            reportObject.promiseNumberOfCatchesThatRereturns += utils.reuseAnErrorStatements(returnStatements, functionParams);

            if(returnStatements.length > 0){
                reportObject.promiseNumberOfCatchesThatReturns++;
            }

            if (numberOfLiterals > 0) {
                reportObject.promiseNumberOfCatchesThatReturnsLiteral++;

                if (lines === 1) {
                    reportObject.promiseNumberOfCatchesThatReturnsLiteralOnly++;
                }
            }

            if(utils.hasUndefined(returnStatements)) {
                reportObject.promiseNumberOfCatchesThatReturnsUndefined++;

                if (lines === 1) {
                    reportObject.promiseNumberOfCatchesThatReturnsUndefinedOnly++;
                }
            }

            if (utils.hasNull(returnStatements)) {
                reportObject.promiseNumberOfCatchesThatReturnsNull++;
                if (lines === 1) {
                    reportObject.promiseNumberOfCatchesThatReturnsNullOnly++;
                }
            }

            if(utils.hasErrorObject(returnStatements)) {
                reportObject.promiseNumberOfCatchesThatReturnsErrorObject++;
            }

            // Counts number of continues
            const continueStatements = utils.getStatementsByType(functionBody, 'ContinueStatement');
            reportObject.promiseNumberOfCatchesContinues += continueStatements.length;
            if(continueStatements.length > 0) {
                reportObject.promiseNumberOfCatchesThatContinues++;
            }

            // Counts number of breaks
            const breakStatements = utils.getStatementsByType(functionBody, 'BreakStatement');
            reportObject.promiseNumberOfCatchesBreaks += breakStatements.length;
            if(breakStatements.length > 0) {
                reportObject.promiseNumberOfCatchesThatBreaks++;
            }
        }
    }

    if (numberOfArgumentsOnCatch === 0) {
        reportObject.promiseNumberOfCatchesWithNoArg++;
    }
}

function handleThens(reportObject, node) {
    reportObject.promiseNumberOfPromiseThens++;
    let numberOfLines = utils.getNumberOfLines(node);
    const numberOfArgumentsOnThen = node.arguments.length;

    if (numberOfLines === 0 && numberOfArgumentsOnThen !== 0) {
        numberOfLines = 1;
    } else {
        numberOfLines = utils.getNumberOfLines(node.arguments[0]);
    }

    if (numberOfArgumentsOnThen >= 1) {
        reportObject.promiseNumberOfPromiseThenFulfilledLines += numberOfLines;

        const location = node.arguments[0].loc;
        reportObject.promiseNumberOfPromiseThenFulfilledLinesStart.push(location.start.line);
        reportObject.promiseNumberOfPromiseThenFulfilledLinesEnd.push(location.end.line);
    }

    if (numberOfArgumentsOnThen === 2) {
        reportObject.promiseNumberOfPromiseThenRejectedLines += utils.getNumberOfLines(node.arguments[1]);

        const location = node.arguments[1].loc;
        reportObject.promiseNumberOfPromiseThenRejectedLinesStart.push(location.start.line);
        reportObject.promiseNumberOfPromiseThenRejectedLinesEnd.push(location.end.line);
    }
}

function handlePromiseObjects(reportObject, callee) {
    reportObject.promiseNumberOfPromises++;
    if (callee.property) {
        const methodName = callee.property.name;
        if (methodName === 'race') {
            reportObject.promiseNumberOfPromiseRaces++;
        }

        if (methodName === 'all') {
            reportObject.promiseNumberOfPromiseAll++;
        }
    }
}

function handleAnalysis(node, reportObject, metric_size_array) {

    // Promises are created on NewExpression or CallExpression of Promise (resolve, reject, all, race)
    if (node.type === 'NewExpression' && node.callee.name === 'Promise') {
        reportObject.promiseNumberOfPromises++;
    }

    if (node.type === 'CallExpression') {
        const callee = node.callee;
        if (callee) {
            if (callee.name === 'resolve' || (callee.property && callee.property.name === 'resolve')) {
                reportObject.promiseNumberOfResolves++;
            }

            if (callee.name === 'reject' || (callee.property && callee.property.name === 'reject')) {
                handleRejects(reportObject, node);
            }

            if (callee.name === 'then' || (callee.property && callee.property.name === 'then')) {
                handleThens(reportObject, node);
            }

            if (callee.name === 'catch' || (callee.property && callee.property.name === 'catch')) {
                handleCatches(reportObject, node, metric_size_array);
            }

        }

        if (callee.object && callee.object.name === 'Promise') {
            handlePromiseObjects(reportObject, callee);
        }
    }

    // Add a metric for counting the number of declared promises which has no catches
    if(node.type === 'ExpressionStatement' && node.expression.type === 'CallExpression') {
        const callee = node.expression.callee;
        if(callee.property) {
            const propertyName = callee.property.name;

            // The method name called is not catch
            if (propertyName === 'then') {
                reportObject.promiseNumberOfNonCaughtPromises++;
            }

            const handlesError = propertyName === 'catch';

            // Chaining thens e catches
            if (propertyName === 'then' || propertyName === 'catch') {
                const callExpressions = utils.getStatementsByType(node, 'CallExpression');
                const result = callExpressions.filter((callExpression) =>
                    callExpression.callee.property && callExpression.callee.property.name === 'catch');

                const numberOfChainingCatches = (handlesError) ? result.length - 1 : result.length;
                if (numberOfChainingCatches > 0) {
                    reportObject.promiseNumberOfChainingCatches++;
                }
            }
        }
    }
}

module.exports = {
    handleAnalysis
};