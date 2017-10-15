function getNumberOfLines(node, fromBody) {
     if(fromBody){
        return node.length;
    }
    const start = node.loc.start.line;
    const end = node.loc.end.line;
    return (end - start);
}

// tryCatch: {
//     numberOfTries: 0,
//         numberOfEmptyTries: 0, // TODO test
//         numberOfTriesLines: 0, // TODO test
//         numberOfTriesWithUniqueStatement: 0, // TODO test
//
//         numberOfCatches: 0,
//         numberOfEmptyCatches: 0,
//         numberOfCatchesLines: 0, // TODO test
//         numberOfUniqueConsole: 0,
//         numberOfCatchesWithUniqueStatement: 0, // TODO test
//
//         numberOfThrows: 0,
//         numberOfThrowsLiteral: 0,
//         numberOfThrowsErrorObjects: 0,
//
//         numberOfFinallies: 0, // TODO
//         numberOfFinalliesLines: 0, // TODO
// }


function handleAnalysis(node, reportObject) {


    if (node.type === 'FunctionDeclaration' && !node.async) {

        const functionBody = node.body.body;

        const tryStatementNodes = getTryStatementNodes(functionBody);

        tryStatementNodes.forEach(function (tryNode) {
            reportObject.tryCatch.numberOfTries++;
            const numberOfLines = getNumberOfLines(tryNode.block.body, true);
            if (numberOfLines === 0) {
                reportObject.tryCatch.numberOfEmptyTries++;
            } else {
                reportObject.tryCatch.numberOfTriesLines += numberOfLines;
                if (numberOfLines === 1) {
                    reportObject.tryCatch.numberOfTriesWithUniqueStatement++;
                }
            }
        });

        const catchClauseNodes = getCatchClauseNodes(tryStatementNodes);

        catchClauseNodes.forEach(function (catchClause) {
            reportObject.tryCatch.numberOfCatches++;
            const nodeBody = catchClause.body.body;

            if (nodeBody) {
                if (nodeBody.length === 0) {
                    reportObject.tryCatch.numberOfEmptyCatches++;
                } else {
                    reportObject.tryCatch.numberOfCatchesLines += getNumberOfLines(catchClause, false);
                }
            }

            if (nodeBody.length === 1 && nodeBody[0].type === 'ExpressionStatement') {
                if (nodeBody[0].expression.type === 'CallExpression') {
                    const calleeObject = nodeBody[0].expression.callee.object;
                    if (calleeObject && calleeObject.name === 'console') {
                        reportObject.tryCatch.numberOfUniqueConsole++;
                    }
                }

                reportObject.tryCatch.numberOfCatchesWithUniqueStatement++;
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

        const finallyStatements = getFinallyStatements(tryStatementNodes);

        finallyStatements.forEach(function (finallyNode) {
            reportObject.tryCatch.numberOfFinallies++;
            reportObject.tryCatch.numberOfFinalliesLines += getNumberOfLines(finallyNode, false);
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

function getCatchClauseNodes(tryNodes) {
    let catchNodes = [];
    tryNodes.forEach(function (node) {
        if (node.handler) {
            catchNodes.push(node.handler);
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

function getFinallyStatements(tryNodes) {
    let finallyNodes = [];
    tryNodes.forEach(function (node) {
        if (node.finalizer) {
            finallyNodes.push(node.handler);
        }
    });
    return finallyNodes;
}

module.exports = {
    handleAnalysis: handleAnalysis
};