const utils = require('./utils');

function handleAnalysis(node, reportObject) {

    // Unique async functions
    if (node.type === 'FunctionDeclaration' && node.async) {
        reportObject.asyncAwait.numberOfAsyncs++;

        const tryStatements = utils.getNodeTypes(node.body, 'TryStatement');
        reportObject.asyncAwait.numberOfTries += tryStatements.length;

        tryStatements.forEach(tryStatement => {
            reportObject.asyncAwait.numberOfTriesLines += utils.getNumberOfLines(tryStatement);
        });

        const catchClauses = utils.getNodeTypes(node.body, 'CatchClause');
        reportObject.asyncAwait.numberOfCatches += catchClauses.length;

        catchClauses.forEach((catchClause) => {
            const bodyHandlerCatch = catchClause.body.body;

            if (bodyHandlerCatch.length === 0) {
                // Left the catch block empty
                reportObject.asyncAwait.numberOfEmptyCatches++;
            } else {
                // Number of lines on catch block
                reportObject.asyncAwait.numberOfCatchesLines += bodyHandlerCatch.length;
            }
            reportObject.asyncAwait.numberOfCatchesLines += utils.getNumberOfLines(catchClause);

            // Catch clause has 1 statement only
            if (bodyHandlerCatch.length === 1) {
                // Handles errors on console only
                const uniqueStatement = bodyHandlerCatch[0];
                if (uniqueStatement.type === 'ExpressionStatement' && uniqueStatement.expression.type === 'CallExpression') {
                    if (uniqueStatement.expression.callee.object.name === 'console') {
                        reportObject.asyncAwait.numberOfUniqueConsole++;
                    }
                }
            }
        });

        const finallyStatements = getFinallyStatements(tryStatements);
        reportObject.asyncAwait.numberOfFinallies = finallyStatements.length;
        finallyStatements.forEach(function (finallyStatement) {
            reportObject.asyncAwait.numberOfFinalliesLines += utils.getNumberOfLines(finallyStatement);
        });
    }

    if (node.type === 'AwaitExpression') {
        reportObject.asyncAwait.numberOfAwaits++;
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