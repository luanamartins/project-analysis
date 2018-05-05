const utils = require('./utils');

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

    const numberOfLines = utils.getNumberOfLines(catchClauseBody);
    reportObject.asyncAwaitNumberOfCatchesLines += numberOfLines;

    const location = catchClause.loc;
    reportObject.asyncAwaitNumberOfCatchesLinesStart.push(location.start.line);
    reportObject.asyncAwaitNumberOfCatchesLinesEnd.push(location.end.line);

    // Left the catch block empty
    if (utils.isEmptyHandler(catchClauseBody, catchClauseErrorArgs, numberOfLines)) {
        reportObject.asyncAwaitNumberOfEmptyCatches++;
    }

    // Catch clause has one statement only
    if (numberOfLines === 1) {
        reportObject.asyncAwaitNumberOfCatchesWithUniqueStatement++;
        // Handles errors on console only
        const uniqueStatement = catchClauseBody.body[0];
        if (uniqueStatement.type === 'ExpressionStatement' && uniqueStatement.expression.type === 'CallExpression') {
            if (uniqueStatement.expression.callee.object.name === 'console') {
                reportObject.asyncAwaitNumberOfCatchesWithUniqueConsole++;
            }
        }
    }

    // Catch clause has await expressions which receives an error argument
    const awaitExpressions = utils.getStatementsByType(catchClauseBody, 'AwaitExpression');

    awaitExpressions.forEach(function (awaitExpression) {
        const awaitArgument = awaitExpression.argument;
        if (awaitArgument.type === 'CallExpression') {
            const awaitArgs = utils.getIdentifiersNames(awaitArgument.arguments);
            const args = utils.containsAnyErrorArgument(catchClauseErrorArgs, awaitArgs);
            if (args) {
                reportObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches++;
            }
        }
    });

    // Number of throws on catches
    const throwStatements = utils.getStatementsByType(catchClauseBody, 'ThrowStatement');
    reportObject.asyncAwaitNumberOfThrowErrorsOnCatches += throwStatements.length;

    // Number of rethrows an error argument
    reportObject.asyncAwaitNumberOfRethrowsOnCatches += utils.handleRethrowStatements(throwStatements, catchClauseErrorArgs);

    // Counts number of returns
    const returnStatements = utils.getStatementsByType(catchClauseBody, 'ReturnStatement');
    reportObject.asyncAwaitNumberOfReturnsOnCatches += returnStatements.length;

    // Counts number of returns that uses an error argument
    returnStatements.forEach((statement) => {
        const returnArgument = statement.argument;
        if (utils.useAnyArguments(returnArgument, catchClauseErrorArgs)) {
            reportObject.asyncAwaitNumberOfReturnsAnErrorOnCatches++;
        }
    });

    // Counts number of breaks
    const breakStatements = utils.getStatementsByType(catchClauseBody, 'BreakStatement');
    reportObject.asyncAwaitNumberOfBreaksOnCatches += breakStatements.length;

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