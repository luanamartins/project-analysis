function handleAnalysis(node, reportObject) {


    if (node.type === 'FunctionDeclaration' && !node.async) {

        const functionBody = node.body.body;

        const tryStatementNodes = getTryStatementNodes(functionBody);

        tryStatementNodes.forEach(function (tryNode) {
            reportObject.tryCatch.numberOfTries++;
            reportObject.tryCatch.numberOfTriesLines += tryNode.block.body.length;
        });

        const catchClauseNodes = getCatchClauseNodes(functionBody);

        catchClauseNodes.forEach(function (catchClause) {
            reportObject.tryCatch.numberOfCatches++;
            const nodeBody = catchClause.body.body;

            if (nodeBody) {
                if (nodeBody === []) {
                    reportObject.tryCatch.numberOfEmptyCatches++;
                } else {
                    reportObject.tryCatch.numberOfCatchesLines += nodeBody.length;
                }
            }

            if (nodeBody.length === 1 && nodeBody[0].type === 'ExpressionStatement') {
                if (nodeBody[0].expression.type === 'CallExpression') {
                    const calleeObject = nodeBody[0].expression.callee.object;
                    if (calleeObject && calleeObject.name === 'console') {
                        reportObject.tryCatch.numberOfUniqueConsole++;
                    }
                }
            }
        });

        const throwStatementNodes = getThrowStatementNodes(tryStatementNodes);

        throwStatementNodes.forEach(function (throwNode) {
            reportObject.tryCatch.numberOfThrows++;

            if (throwNode.argument.type === 'Literal') {
                // Throwing a string, number or something else
                reportObject.tryCatch.numberOfThrowsLiteral++;

            } else if (throwNode.argument.type === 'NewExpression' && throwNode.argument.callee.name === 'Error') {
                // Creation of new Error object
                reportObject.tryCatch.numberOfThrowsErrorObjects++;
            }
        });

    }
}


function getTryStatementNodes(functionBodyNode) {
    let tryNodes = [];
    functionBodyNode.forEach(function (node) {
        if (node.type === 'TryStatement') {
            tryNodes.push(node);
        }
    });
    return tryNodes;
}

function getCatchClauseNodes(functionBodyNode) {
    let catchNodes = [];
    functionBodyNode.forEach(function (node) {
        if (node.type === 'TryStatement') {
            if (node.handler && node.handler.type === 'CatchClause') {
                catchNodes.push(node.handler);
            }
        }
    });
    return catchNodes;
}


function getThrowStatementNodes(tryStatementNodes) {
    let throwNodes = [];
    tryStatementNodes.forEach(function (tryStatement) {
        const tryBody = tryStatement.block.body;

        tryBody.forEach(function (tryBodyStatement) {
            if (tryBodyStatement.type === 'ThrowStatement') {
                throwNodes.push(tryBodyStatement);
            }
        });
    });
    return throwNodes;
}

module.exports = {
    handleAnalysis: handleAnalysis
};