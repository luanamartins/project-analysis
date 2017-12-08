const utils = require('./utils');

function handleAnalysis(node, reportObject) {

    // Unique async functions
    if (node.type === 'FunctionDeclaration' && node.async) {
        reportObject.asyncAwaitNumberOfAsyncs++;

        const tryStatements = utils.getNodeTypes(node.body, 'TryStatement');
        reportObject.asyncAwaitNumberOfTries += tryStatements.length;

        tryStatements.forEach(tryStatement => {
            reportObject.asyncAwaitNumberOfTriesLines += utils.getNumberOfLines(tryStatement.block);
        });

        const catchClauses = utils.getNodeTypes(node.body, 'CatchClause');
        reportObject.asyncAwaitNumberOfCatches += catchClauses.length;

        catchClauses.forEach((catchClause) => {
            const bodyHandlerCatch = catchClause.body.body;

            if (bodyHandlerCatch.length === 0) {
                // Left the catch block empty
                reportObject.asyncAwaitNumberOfEmptyCatches++;
            }
            reportObject.asyncAwaitNumberOfCatchesLines += utils.getNumberOfLines(catchClause);

            // Catch clause has 1 statement only
            if (bodyHandlerCatch.length === 1) {
                // Handles errors on console only
                const uniqueStatement = bodyHandlerCatch[0];
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
        });
    }

    if (node.type === 'AwaitExpression') {
        reportObject.asyncAwaitNumberOfAwaits++;
    }
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