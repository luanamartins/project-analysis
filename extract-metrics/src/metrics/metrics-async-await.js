const CONFIG = require("../../config");
const utils = require(CONFIG["srcPath"] + 'utils');

function handleAnalysis(node, reportObject) {

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

        catchClauses.map((catchClause) => handleCatchClauses(errorArgs, catchClause, reportObject));

        const finallyStatements = getFinallyStatements(tryStatements);
        reportObject.asyncAwaitNumberOfFinallies = finallyStatements.length;
        finallyStatements.map((finallyStatement) => handleFinallyClauses(finallyStatement, reportObject));
    }

    if (node.type === 'AwaitExpression') {
        reportObject.asyncAwaitNumberOfAwaits++;
    }
}

function handleCatchClauses(errorArgs, catchClause, reportObject) {
    const catchClauseErrorArgs = utils.getIdentifiersNames(catchClause.param);
    const catchClauseBody = catchClause.body;

    const lines = utils.getNumberOfLines(catchClauseBody);
    reportObject.asyncAwaitNumberOfCatchesLines += lines;

    const location = catchClause.loc;
    reportObject.asyncAwaitNumberOfCatchesLinesStart.push(location.start.line);
    reportObject.asyncAwaitNumberOfCatchesLinesEnd.push(location.end.line);

    // Left the catch block empty
    if (lines === 0) {
        reportObject.asyncAwaitNumberOfEmptyCatches++;
    } else if (!utils.useAnyArguments(catchClauseBody, catchClauseErrorArgs)) {
        reportObject.asyncAwaitNumberOfCatchesNoUsageOfErrorArgument++;
    }

    // Catch clause has one statement only
    if (lines === 1) {
        reportObject.asyncAwaitNumberOfCatchesWithUniqueStatement++;
        // Handles errors on console only
        const uniqueStatement = catchClauseBody.body[0];
        if (utils.isConsoleStatement(uniqueStatement)) {
            reportObject.asyncAwaitNumberOfCatchesWithUniqueConsole++;
        }
    }

    // Catch clause has await expressions which receives an error argument
    const awaitExpressions = utils.getStatementsByType(catchClauseBody, 'AwaitExpression');

    awaitExpressions.forEach(function (awaitExpression) {
        const awaitArgument = awaitExpression.argument;
        if (awaitArgument.type === 'CallExpression') {
            const awaitArgs = utils.getIdentifiersNames(awaitArgument.arguments);
            if (utils.containsAnyErrorArgument(catchClauseErrorArgs, awaitArgs)) {
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

        if (lines === 1) {
            reportObject.asyncAwaitNumberOfHandlersThatThrowsLiteralOnly++;
        }
    }

    if (utils.hasUndefined(throwStatements)) {
        reportObject.asyncAwaitNumberOfHandlersThatThrowsUndefined++;
        if (lines === 1) {
            reportObject.asyncAwaitNumberOfHandlersThatThrowsUndefinedOnly++;
        }
    }

    if (utils.hasNull(throwStatements)) {
        reportObject.asyncAwaitNumberOfHandlersThatThrowsNull++;
        if (lines === 1) {
            reportObject.asyncAwaitNumberOfHandlersThatThrowsNullOnly++;
        }
    }

    if (utils.hasErrorObject(throwStatements)) {
        reportObject.asyncAwaitNumberOfHandlersThatThrowsErrorObject++;
    }

    // Throws Error objects
    const params = utils.getPropertyFrom(throwStatements, 'argument');
    if(utils.hasErrorObject(params)) {
        reportObject.asyncAwaitNumberOfHandlersThrowsErrorObject++;
    }

    // Number of rethrows an error argument
    const numberOfRethrows = utils.reuseAnErrorStatements(throwStatements, catchClauseErrorArgs);
    reportObject.asyncAwaitNumberOfHandlersRethrows += numberOfRethrows;

    if(numberOfRethrows > 0){
        reportObject.asyncAwaitNumberOfHandlersThatRethrows++;
    }

    // Counts number of returns
    const returnStatements = utils.getStatementsByType(catchClauseBody, 'ReturnStatement');
    const numberOfReturnStatements = returnStatements.length;
    const numberOfLiterals = utils.numberOfLiterals(returnStatements);
    const numberOfErrorObjects = utils.numberOfErrorObjects(returnStatements);

    reportObject.asyncAwaitNumberOfHandlersReturns += numberOfReturnStatements;
    reportObject.asyncAwaitNumberOfHandlersReturnsLiteral += numberOfLiterals;
    reportObject.asyncAwaitNumberOfHandlersReturnsErrorObject += numberOfErrorObjects;
    reportObject.asyncAwaitNumberOfHandlersThatRereturns += utils.reuseAnErrorStatements(returnStatements, catchClauseErrorArgs);

    // Number of catches having at least one return statement
    if (numberOfReturnStatements > 0) {
        reportObject.asyncAwaitNumberOfHandlersThatReturns++;
    }

    if (numberOfLiterals > 0) {
        reportObject.asyncAwaitNumberOfHandlersThatReturnsLiteral++;

        if (lines === 1) {
            reportObject.asyncAwaitNumberOfHandlersThatReturnsLiteralOnly++;
        }
    }

    if(utils.hasUndefined(returnStatements)) {
        reportObject.asyncAwaitNumberOfHandlersThatReturnsUndefined++;

        if (lines === 1) {
            reportObject.asyncAwaitNumberOfHandlersThatReturnsUndefinedOnly++;
        }
    }

    if (utils.hasNull(returnStatements)) {
        reportObject.asyncAwaitNumberOfHandlersThatReturnsNull++;
        if (lines === 1) {
            reportObject.asyncAwaitNumberOfHandlersThatReturnsNullOnly++;
        }
    }

    if(utils.hasErrorObject(returnStatements)) {
        reportObject.asyncAwaitNumberOfHandlersThatReturnsErrorObject++;
    }

    // Counts number of continues
    const continueStatements = utils.getStatementsByType(catchClauseBody, 'ContinueStatement');
    reportObject.asyncAwaitNumberOfHandlersContinues += continueStatements.length;
    if(continueStatements.length > 0) {
        reportObject.asyncAwaitNumberOfHandlersThatContinues++;
    }

    // Counts number of breaks
    const breakStatements = utils.getStatementsByType(catchClauseBody, 'BreakStatement');
    reportObject.asyncAwaitNumberOfHandlersBreaks += breakStatements.length;
    if(breakStatements.length > 0) {
        reportObject.asyncAwaitNumberOfHandlersThatBreaks++;

        if (lines === 1) {
            reportObject.asyncAwaitNumberOfHandlersBreaksOnly++;
        }
    }

    if (utils.hasOneStatementAndIsBreak(breakStatements, lines)) {
        reportObject.asyncAwaitNumberOfBreaksOnCatchesUniqueStatement++;

    }
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