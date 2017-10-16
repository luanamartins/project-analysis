function getNumberOfLines(node, fromBody) {
    if(node.body) {
        const isBlockStatement = node.type === 'BlockStatement';
        const nodeBody = isBlockStatement ? node.body : node.body.body;
        let numberOfLines = isBlockStatement ? 0 : 1;
        nodeBody.forEach(function(statement){
            numberOfLines += getNumberOfLines(statement);
        });
        return numberOfLines;
    }
    return 1;
}

function getNumberOfLinesByBody(node){

    if(node.body) {
        return 1 + getNumberOfLinesByBody(node.body);
    }
    return 1;
}

function getNumberOfLinesByLoc(node){
    const start = node.loc.start.line;
    const end = node.loc.end.line;
    return (end - start);
}

function handleAnalysis(node, reportObject) {


    if (node.type === 'FunctionDeclaration' && !node.async) {

        const functionBody = node.body.body;

        const tryStatementNodes = getTryStatementNodes(functionBody);

        tryStatementNodes.forEach(function (tryNode) {
            reportObject.tryCatch.numberOfTries++;
            if (tryNode.block.body.length === 0) {
                reportObject.tryCatch.numberOfEmptyTries++;
            } else {
                const numberOfLines = getNumberOfLines(tryNode.block, true);
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
            finallyNodes.push(node.finalizer);
        }
    });
    return finallyNodes;
}

module.exports = {
    handleAnalysis: handleAnalysis
};