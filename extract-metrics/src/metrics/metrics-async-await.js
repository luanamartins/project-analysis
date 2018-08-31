const config = require("../../config");
const constants = require('../constants');
const utils = require(config["srcPath"] + 'utils');

function handleAnalysis(node, reportObject, metric_size_array) {

    // Asynchronous functions
    if (node.type === 'FunctionDeclaration' && node.async) {
        reportObject.asyncAwaitNumberOfAsyncs++;
        const params = node.params.map((item) => item.name);
        const errorArgs = params.filter((param) => utils.isAnErrorArgument(param));

        const tryStatements = utils.getNodeTypes(node.body, 'TryStatement');
        reportObject.asyncAwaitNumberOfTries += tryStatements.length;

        tryStatements.map(tryStatement => calculateNumberOfLines(reportObject, tryStatement));

        const catchClauses = utils.getNodeTypes(node.body, 'CatchClause');
        reportObject.asyncAwaitNumberOfCatches += catchClauses.length;

        catchClauses.map((catchClause) => handleCatchClause(errorArgs, catchClause, reportObject, metric_size_array));

        const finallyStatements = getFinallyStatements(tryStatements);
        reportObject.asyncAwaitNumberOfFinallies = finallyStatements.length;
        finallyStatements.map((finallyStatement) => handleFinallyClauses(finallyStatement, reportObject));
    }

    if (node.type === 'AwaitExpression') {
        reportObject.asyncAwaitNumberOfAwaits++;
    }
}

function handleCatchClause(errorArgs, catchClause, reportObject, metric_size_array) {
    const catchClauseParameters = utils.getIdentifiersNames(catchClause.param);
    const catchClauseBody = catchClause.body;

    const numberOfLines = utils.getNumberOfLines(catchClauseBody);

    const metricSizeObject = utils.getEmptyMetricSizeObject();
    metricSizeObject.mech = constants.ASYNC_AWAIT;
    metricSizeObject.lines = numberOfLines;
    metricSizeObject.stmts = catchClauseBody.body.length;
    metricSizeObject.has_error_arguments = catchClauseParameters.length > 0;

    reportObject.asyncAwaitNumberOfCatchesLines += numberOfLines;

    const location = catchClause.loc;
    reportObject.asyncAwaitNumberOfCatchesLinesStart.push(location.start.line);
    reportObject.asyncAwaitNumberOfCatchesLinesEnd.push(location.end.line);

    // Left the catch block empty
    if (numberOfLines === 0) {
        reportObject.asyncAwaitNumberOfEmptyCatches++;
        metricSizeObject.empty = true;
    } else if (!utils.useAnyArguments(catchClauseBody, catchClauseParameters)) {
        reportObject.asyncAwaitNumberOfCatchesNoUsageOfErrorArgument++;
        metricSizeObject.noUsageOfErrorArg = true;
    }

    // Catch clause has one statement only
    if (numberOfLines === 1) {
        reportObject.asyncAwaitNumberOfCatchesWithUniqueStatement++;
        // Handles errors on console only
        const uniqueStatement = catchClauseBody.body[0];

        if (utils.isConsoleStatement(uniqueStatement)) {
            reportObject.asyncAwaitNumberOfCatchesWithUniqueConsole++;
        }

        if(utils.isAlertCallExpression(uniqueStatement)) {
            reportObject.asyncAwaitNumberOfCatchesAlertOnly++;
        }
    }

    if(utils.hasConsoleLog(catchClauseBody)) {
        metricSizeObject.consoleLog = true;
    }

    if(utils.hasAlertMethodCalling(catchClauseBody)) {
        metricSizeObject.alert = true;
    }

    if (utils.hasErrorReassignment(catchClauseBody, catchClauseParameters)) {
        reportObject.asyncAwaitNumberOfErrorReassigning++;
        metricSizeObject.reassigningError = true;
    }

    // Catch clause has await expressions which receives an error argument
    const awaitExpressions = utils.getStatementsByType(catchClauseBody, 'AwaitExpression');

    awaitExpressions.forEach(function (awaitExpression) {
        const awaitArgument = awaitExpression.argument;
        if (awaitArgument.type === 'CallExpression') {
            const awaitArgs = utils.getIdentifiersNames(awaitArgument.arguments);
            if (utils.containsAnyErrorArgument(catchClauseParameters, awaitArgs)) {
                reportObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches++;
            }
        }
    });

    const throwStatements = utils.getStatementsByType(catchClauseBody, 'ThrowStatement');
    const numberOfThrowStatements = throwStatements.length;

    // Number of throws on catches
    reportObject.asyncAwaitNumberOfHandlersThrows += numberOfThrowStatements;
    reportObject.asyncAwaitNumberOfHandlersThrowsLiteral += utils.numberOfLiterals(throwStatements);
    reportObject.asyncAwaitNumberOfHandlersThrowsErrorObject += utils.numberOfErrorObjects(throwStatements);

    if(numberOfThrowStatements > 0) {
        reportObject.asyncAwaitNumberOfHandlersThatThrows++;
    }

    // Throws literal types
    if (utils.hasLiteral(throwStatements)) {
        reportObject.asyncAwaitNumberOfHandlersThatThrowsLiteral++;
        metricSizeObject.throwLiteral = true;

        if (numberOfLines === 1) {
            reportObject.asyncAwaitNumberOfHandlersThatThrowsLiteralOnly++;
        }
    }

    if (utils.hasUndefined(throwStatements)) {
        reportObject.asyncAwaitNumberOfHandlersThatThrowsUndefined++;
        metricSizeObject.throwUndefined = true;

        if (numberOfLines === 1) {
            reportObject.asyncAwaitNumberOfHandlersThatThrowsUndefinedOnly++;
        }
    }

    if (utils.hasNull(throwStatements)) {
        reportObject.asyncAwaitNumberOfHandlersThatThrowsNull++;
        metricSizeObject.throwNull = true;

        if (numberOfLines === 1) {
            reportObject.asyncAwaitNumberOfHandlersThatThrowsNullOnly++;
        }
    }

    if (utils.hasErrorObject(throwStatements)) {
        reportObject.asyncAwaitNumberOfHandlersThatThrowsErrorObject++;
        metricSizeObject.throwErrorObject = true;
    }

    // Throws Error objects
    const params = utils.getPropertyFrom(throwStatements, 'argument');
    if(utils.hasErrorObject(params)) {
        reportObject.asyncAwaitNumberOfHandlersThrowsErrorObject++;
    }

    // Number of rethrows an error argument
    const numberOfRethrows = utils.reuseAnErrorStatements(throwStatements, catchClauseParameters);
    reportObject.asyncAwaitNumberOfHandlersRethrows += numberOfRethrows;

    if(numberOfRethrows > 0){
        reportObject.asyncAwaitNumberOfHandlersThatRethrows++;
        metricSizeObject.rethrow = true;
    }

    // Counts number of returns
    const returnStatements = utils.getStatementsByType(catchClauseBody, 'ReturnStatement');
    const numberOfReturnStatements = returnStatements.length;
    const numberOfLiterals = utils.numberOfLiterals(returnStatements);
    const numberOfErrorObjects = utils.numberOfErrorObjects(returnStatements);

    reportObject.asyncAwaitNumberOfHandlersReturns += numberOfReturnStatements;
    reportObject.asyncAwaitNumberOfHandlersReturnsLiteral += numberOfLiterals;
    reportObject.asyncAwaitNumberOfHandlersReturnsErrorObject += numberOfErrorObjects;
    reportObject.asyncAwaitNumberOfHandlersThatRereturns += utils.reuseAnErrorStatements(returnStatements, catchClauseParameters);

    // Number of catches having at least one return statement
    if (numberOfReturnStatements > 0) {
        reportObject.asyncAwaitNumberOfHandlersThatReturns++;
    }

    if (numberOfLiterals > 0) {
        reportObject.asyncAwaitNumberOfHandlersThatReturnsLiteral++;
        metricSizeObject.returnLiteral = true;
        if (numberOfLines === 1) {
            reportObject.asyncAwaitNumberOfHandlersThatReturnsLiteralOnly++;
        }
    }

    if(utils.hasUndefined(returnStatements)) {
        reportObject.asyncAwaitNumberOfHandlersThatReturnsUndefined++;
        metricSizeObject.returnUndefined = true;
        if (numberOfLines === 1) {
            reportObject.asyncAwaitNumberOfHandlersThatReturnsUndefinedOnly++;
        }
    }

    if (utils.hasNull(returnStatements)) {
        reportObject.asyncAwaitNumberOfHandlersThatReturnsNull++;
        metricSizeObject.returnNull = true;
        if (numberOfLines === 1) {
            reportObject.asyncAwaitNumberOfHandlersThatReturnsNullOnly++;
        }
    }

    if(utils.hasErrorObject(returnStatements)) {
        reportObject.asyncAwaitNumberOfHandlersThatReturnsErrorObject++;
        metricSizeObject.returnErrorObject = true;
    }

    const rereturns = utils.reuseAnErrorStatements(returnStatements, catchClauseParameters);
    if(rereturns.length > 0){
        metricSizeObject.rereturns = true;
    }

    // Counts number of continues
    const continueStatements = utils.getStatementsByType(catchClauseBody, 'ContinueStatement');
    reportObject.asyncAwaitNumberOfHandlersContinues += continueStatements.length;
    if(continueStatements.length > 0) {
        reportObject.asyncAwaitNumberOfHandlersThatContinues++;
        metricSizeObject.continue = true;
    }

    // Counts number of breaks
    const breakStatements = utils.getStatementsByType(catchClauseBody, 'BreakStatement');
    reportObject.asyncAwaitNumberOfHandlersBreaks += breakStatements.length;
    if(breakStatements.length > 0) {
        reportObject.asyncAwaitNumberOfHandlersThatBreaks++;
        metricSizeObject.break = true;
        if (numberOfLines === 1) {
            reportObject.asyncAwaitNumberOfHandlersBreaksOnly++;
        }
    }

    if (utils.hasOneStatementAndIsBreak(breakStatements, numberOfLines)) {
        reportObject.asyncAwaitNumberOfBreaksOnCatchesUniqueStatement++;

    }

    metric_size_array.push(metricSizeObject);
}

function handleFinallyClauses(finallyStatement, reportObject) {
    reportObject.asyncAwaitNumberOfFinalliesLines += utils.getNumberOfLines(finallyStatement);

    const location = finallyStatement.loc;
    reportObject.asyncAwaitNumberOfFinalliesLinesStart.push(location.start.line);
    reportObject.asyncAwaitNumberOfFinalliesLinesEnd.push(location.end.line);
}

function calculateNumberOfLines(reportObject, tryStatement) {
    reportObject.asyncAwaitNumberOfTriesLines += utils.getNumberOfLines(tryStatement.block);
    const location = tryStatement.block.loc;
    reportObject.asyncAwaitNumberOfTriesLinesStart.push(location.start.line);
    reportObject.asyncAwaitNumberOfTriesLinesEnd.push(location.end.line);
}

function getFinallyStatements(tryStatements) {
    let finallyStatements = [];
    tryStatements.forEach(statement => {
        if (statement.finalizer) {
            finallyStatements.push(statement.finalizer);
        }
    });
    return finallyStatements;
}


module.exports = {
    handleAnalysis
};