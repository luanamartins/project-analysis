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
    const bodyHandlerCatch = catchClause.body;
    const numberStatementsOfBody = utils.getNumberOfLines(bodyHandlerCatch);

    reportObject.asyncAwaitNumberOfCatchesLines += numberStatementsOfBody;
    const location = catchClause.loc;
    reportObject.asyncAwaitNumberOfCatchesLinesStart.push(location.start.line);
    reportObject.asyncAwaitNumberOfCatchesLinesEnd.push(location.end.line);

    // Left the catch block empty
    if (numberStatementsOfBody === 0) {
        reportObject.asyncAwaitNumberOfEmptyCatches++;
    }

    // Catch clause has one statement only
    if (numberStatementsOfBody === 1) {
        reportObject.asyncAwaitNumberOfCatchesWithUniqueStatement++;
        // Handles errors on console only
        const uniqueStatement = bodyHandlerCatch.body[0];
        if (uniqueStatement.type === 'ExpressionStatement' && uniqueStatement.expression.type === 'CallExpression') {
            if (uniqueStatement.expression.callee.object.name === 'console') {
                reportObject.asyncAwaitNumberOfCatchesWithUniqueConsole++;
            }
        }
    }

    // Catch clause has await expressions which receives an error argument
    const awaitExpressions = getAwaitExpressions(catchClause, reportObject);

}

function getAwaitExpressions(catchClause, reportObject) {
    // TODO returns the await expressions which any arguments matches with any item on errorArgs
    const number = 0;
    const catchClauseArgs = [catchClause.param.name];
    utils.traverse(catchClause, function (node) {
        if (node.type === 'AwaitExpression') {
            const expression = node.argument;
            if (expression.type === 'CallExpression') {
                let awaitExpressionArgs = expression.arguments;
                if (awaitExpressionArgs.length !== 0) {
                    awaitExpressionArgs = awaitExpressionArgs.filter((arg) => arg.type === 'Identifier').map((item) => {
                        return item.name;
                    });

                    if (utils.containsAnyErrorArgument(catchClauseArgs, awaitExpressionArgs)) {
                        // TODO An await expression which calling function receives an error argument from the catch clause
                        reportObject.asyncAwaitNumberOfAwaitErrorArgsOnCatches++;
                    }
                }
            }
        }
    });
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
    handleAnalysis: handleAnalysis
};