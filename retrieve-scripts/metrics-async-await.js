function handleAnalysis(node, reportObject) {

    // Unique async functions
    if (node.type === 'FunctionDeclaration' && node.async) {
        reportObject.asyncAwait.numberOfAsyncs++;

        const catchClauses = getCatchClauseNodes(node.body);

        catchClauses.forEach((catchClause) => {
            const bodyHandlerCatch = catchClause.body.body;
            const isEmpty = bodyHandlerCatch.length === 0;
            reportObject.asyncAwait.numberOfCatches++;

            if (isEmpty) {
                // Left the catch block empty
                reportObject.asyncAwait.numberOfEmptyCatches++;
            } else {
                // Number of lines on catch block
                reportObject.asyncAwait.numberOfCatchesLines += bodyHandlerCatch.length;
            }

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
    }

    if (node.type === 'AwaitExpression') {
        // This is basically the same as then on promises
        reportObject.asyncAwait.numberOfAwaits++;
    }
}

function getCatchClauseNodes(functionDeclaration) {

    let catchClauses = [];
    traverse(functionDeclaration, function (node) {
        if(node.type === 'CatchClause'){
            catchClauses.push(node);
        }
    });

    return catchClauses;
}

function traverse(obj, fn) {
    for (let key in obj) {
        if (obj[key] !== null && fn(obj[key]) === false) {
            return false;
        }
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            if (traverse(obj[key], fn) === false) {
                return false;
            }
        }
    }
}


module.exports = {
    handleAnalysis: handleAnalysis
};