const utils = require('./utils');

function handleAnalysis(node, reportObject) {

    // Unique async functions
    if (node.type === 'FunctionDeclaration' && node.async) {
        reportObject.asyncAwaitNumberOfAsyncs++;
        const params = node.params;
        // const errorArgs = utils.getListOfErrorArguments(params);

        const tryStatements = utils.getNodeTypes(node.body, 'TryStatement');
        reportObject.asyncAwaitNumberOfTries += tryStatements.length;

        tryStatements.map(tryStatement => calculateNumberOfLines(reportObject, tryStatement));

        const catchClauses = utils.getNodeTypes(node.body, 'CatchClause');
        reportObject.asyncAwaitNumberOfCatches += catchClauses.length;

        catchClauses.forEach((catchClause) => {
            const bodyHandlerCatch = catchClause.body;
            const numberStatementsOfBody = utils.getNumberOfLines(bodyHandlerCatch);

            reportObject.asyncAwaitNumberOfCatchesLines += numberStatementsOfBody;
            const location = catchClause.loc;
            reportObject.asyncAwaitNumberOfCatchesLinesStart.push(location.start.line);
            reportObject.asyncAwaitNumberOfCatchesLinesEnd.push(location.end.line);

            if (numberStatementsOfBody === 0) {
                // Left the catch block empty
                reportObject.asyncAwaitNumberOfEmptyCatches++;
            }

            // Catch clause has 1 statement only
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
        });

        const finallyStatements = getFinallyStatements(tryStatements);
        reportObject.asyncAwaitNumberOfFinallies = finallyStatements.length;
        finallyStatements.forEach(function (finallyStatement) {
            reportObject.asyncAwaitNumberOfFinalliesLines += utils.getNumberOfLines(finallyStatement);

            const location = finallyStatement.loc;
            reportObject.asyncAwaitNumberOfFinalliesLinesStart.push(location.start.line);
            reportObject.asyncAwaitNumberOfFinalliesLinesEnd.push(location.end.line);

        });
    }

    if (node.type === 'AwaitExpression') {
        reportObject.asyncAwaitNumberOfAwaits++;
    }
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