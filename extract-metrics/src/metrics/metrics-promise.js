const config = require('../../config');
const constants = require('../constants');
const utils = require(config["srcPath"] + 'utils');


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

        if (firstArgument.type === constants.FUNCTION_DECLARATION  || 
           firstArgument.type === constants.FUNCTION_EXPRESSION) {

            const functionBody = firstArgument.body;
            const functionParams = utils.getIdentifiersNames(firstArgument.params);
            const hasErrorArguments = utils.hasAnErrorArgument(functionParams);

            const metricSizeObject = utils.getEmptyMetricSizeObject();
            metricSizeObject.mech = constants.PROMISE;
            metricSizeObject.lines = lines;
            metricSizeObject.stmts = functionBody.body.length;
            metricSizeObject.has_error_arguments = hasErrorArguments;
            metricSizeObject.empty = lines === 0;

            const useAnyErrorParam = utils.useAnyArguments(functionBody, functionParams);
            if (!useAnyErrorParam) {
                metricSizeObject.noUsageOfErrorArg = true;
            }

            if(utils.hasConsoleLog(functionBody)) {
                metricSizeObject.consoleLog = true;
            }
    
            if(utils.hasAlertMethodCalling(functionBody)) {
                metricSizeObject.alert = true;
            }

            if (utils.hasErrorReassignment(functionBody, functionParams)) {
                metricSizeObject.reassigningError = true;
            }

            if(hasErrorArguments === false) {
                reportObject.promiseNumberOfCatchesFunctionWithNoErrorArg++;
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
            handleThrows(functionBody, reportObject, lines, functionParams, metricSizeObject);

            // Counts number of returns
            handleReturns(functionBody, reportObject, functionParams, lines, metricSizeObject);

            // Counts number of continues
            handleContinueAndBreak(functionBody, reportObject, metricSizeObject);

            metric_size_array.push(metricSizeObject);
        }
    }

    if (numberOfArgumentsOnCatch === 0) {
        reportObject.promiseNumberOfCatchesWithNoArg++;
    }
}

function handleThrows(functionBody, reportObject, lines, functionParams, metricSizeObject) {
    const throwStatements = utils.getStatementsByType(functionBody, constants.THROW_STATEMENT);
    const numberOfThrowStatements = throwStatements.length;
    reportObject.promiseNumberOfCatchesThrows += numberOfThrowStatements;

    if (numberOfThrowStatements > 0) {
        reportObject.promiseNumberOfCatchesThatThrows++;
        const numberOfLiterals = utils.numberOfLiterals(throwStatements);
        reportObject.promiseNumberOfCatchesThrowsLiteral += numberOfLiterals;
        reportObject.promiseNumberOfCatchesThrowsErrorObject += utils.numberOfErrorObjects(throwStatements);
       
        if (numberOfLiterals > 0) {
            reportObject.promiseNumberOfCatchesThatThrowsLiteral++;
            metricSizeObject.throwLiteral = true;
            if (lines === 1) {
                reportObject.promiseNumberOfCatchesThatThrowsLiteralOnly++;
            }
        }
       
        if (utils.hasUndefined(throwStatements)) {
            reportObject.promiseNumberOfCatchesThatThrowsUndefined++;
            metricSizeObject.throwUndefined = true;
            if (lines === 1) {
                reportObject.promiseNumberOfCatchesThatThrowsUndefinedOnly++;
            }
        }
        if (utils.hasNull(throwStatements)) {
            reportObject.promiseNumberOfCatchesThatThrowsNull++;
            metricSizeObject.throwNull = true;
            if (lines === 1) {
                reportObject.promiseNumberOfCatchesThatThrowsNullOnly++;
            }
        }
        if (utils.hasErrorObject(throwStatements)) {
            reportObject.promiseNumberOfCatchesThatThrowsErrorObject++;
            metricSizeObject.throwErrorObject = true;
        }
    }
    
    // Number of throws primitive types
    reportObject.promiseNumberOfThrowPrimitiveTypesOnCatches += utils.getThrowPrimitiveTypes(throwStatements);
    
    // Number of rethrows on catches
    const numberOfRethrows = utils.reuseAnErrorStatements(throwStatements, functionParams);
    reportObject.promiseNumberOfCatchesRethrows += numberOfRethrows;
    if (numberOfRethrows > 0) {
        reportObject.promiseNumberOfCatchesThatRethrows++;
        metricSizeObject.rethrow = true;
    }
}

function handleReturns(functionBody, reportObject, functionParams, lines, metricSizeObject) {
    const returnStatements = utils.getStatementsByType(functionBody, 'ReturnStatement');
    reportObject.promiseNumberOfCatchesReturns += returnStatements.length;
    
    const numberOfLiterals = utils.numberOfLiterals(returnStatements);
    const numberOfErrorObjects = utils.numberOfErrorObjects(returnStatements);
    
    reportObject.promiseNumberOfCatchesReturnsLiteral += numberOfLiterals;
    reportObject.promiseNumberOfCatchesReturnsErrorObject += numberOfErrorObjects;
    reportObject.promiseNumberOfCatchesThatRereturns += utils.reuseAnErrorStatements(returnStatements, functionParams);
    
    if (returnStatements.length > 0) {
        reportObject.promiseNumberOfCatchesThatReturns++;
    }

    if (numberOfLiterals > 0) {
        reportObject.promiseNumberOfCatchesThatReturnsLiteral++;
        metricSizeObject.returnLiteral = true;
        if (lines === 1) {
            reportObject.promiseNumberOfCatchesThatReturnsLiteralOnly++;
        }
    }
    if (utils.hasUndefined(returnStatements)) {
        reportObject.promiseNumberOfCatchesThatReturnsUndefined++;
        metricSizeObject.returnUndefined = true;
        if (lines === 1) {
            reportObject.promiseNumberOfCatchesThatReturnsUndefinedOnly++;
        }
    }
    if (utils.hasNull(returnStatements)) {
        reportObject.promiseNumberOfCatchesThatReturnsNull++;
        metricSizeObject.returnNull = true;
        if (lines === 1) {
            reportObject.promiseNumberOfCatchesThatReturnsNullOnly++;
        }
    }
    if (utils.hasErrorObject(returnStatements)) {
        reportObject.promiseNumberOfCatchesThatReturnsErrorObject++;
        metricSizeObject.returnErrorObject = true;
    }

    const rereturns = utils.reuseAnErrorStatements(returnStatements, functionParams);
    if (rereturns.length > 0) {
        metricSizeObject.rereturn = true;
    }
}

function handleContinueAndBreak(functionBody, reportObject, metricSizeObject) {
    const continueStatements = utils.getStatementsByType(functionBody, 'ContinueStatement');
    reportObject.promiseNumberOfCatchesContinues += continueStatements.length;
    if (continueStatements.length > 0) {
        reportObject.promiseNumberOfCatchesThatContinues++;
        metricSizeObject.continue = true;
    }
    // Counts number of breaks
    const breakStatements = utils.getStatementsByType(functionBody, 'BreakStatement');
    reportObject.promiseNumberOfCatchesBreaks += breakStatements.length;
    if (breakStatements.length > 0) {
        reportObject.promiseNumberOfCatchesThatBreaks++;
        metricSizeObject.break = true;
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