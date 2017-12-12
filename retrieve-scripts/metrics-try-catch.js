const utils = require('./utils');

function handleAnalysis(node, reportObject) {

    if (node.type === 'FunctionDeclaration' || node.type === 'ArrowFunctionExpression' || node.type === 'FunctionExpression' && !node.async) {

        let functionBody;
        if (node.type === 'ArrowFunctionExpression') {
            functionBody = node.body;
        } else {
            functionBody = node.body.body;
        }

        const tryStatementNodes = getTryStatementNodes(functionBody);
        tryStatementNodes.forEach(function (tryNode) {
            handleTryStatement(reportObject, tryNode);
        });

        const catchClauseNodes = getCatchClauseNodes(tryStatementNodes);
        catchClauseNodes.forEach(function (catchClause) {
            handleCatchClause(reportObject, catchClause);
        });

        const finallyStatements = getFinallyStatements(tryStatementNodes);
        finallyStatements.forEach(function (finallyNode) {
            reportObject.tryCatchNumberOfFinallies++;
            reportObject.tryCatchNumberOfFinalliesLines += utils.getNumberOfLines(finallyNode);

            const location = finallyNode.loc;
            reportObject.tryCatchNumberOfFinalliesLinesStart.push(location.start.line);
            reportObject.tryCatchNumberOfFinalliesLinesEnd.push(location.end.line);

        });

        const nodes = tryStatementNodes.concat(catchClauseNodes).concat(finallyStatements);

        const throwStatementNodes = getThrowStatementNodes(nodes);
        throwStatementNodes.forEach(function (throwNode) {
            handleThrowStatement(reportObject, throwNode);
        });
    }
}

function handleTryStatement(reportObject, tryNode) {
    reportObject.tryCatchNumberOfTries++;
    if (tryNode.block.body.length === 0) {
        reportObject.tryCatchNumberOfEmptyTries++;
    } else {
        const numberOfLines = utils.getNumberOfLines(tryNode.block);
        reportObject.tryCatchNumberOfTriesLines += numberOfLines;

        const location = tryNode.block.loc;
        reportObject.tryCatchNumberOfTriesLinesStart.push(location.start.line);
        reportObject.tryCatchNumberOfTriesLinesEnd.push(location.end.line);

        const numberOfLinesOnTryBlock = numberOfLines - 1;
        if (numberOfLinesOnTryBlock === 1) {
            reportObject.tryCatchNumberOfTriesWithUniqueStatement++;
        }
    }
}

function handleCatchClause(reportObject, catchClause) {
    reportObject.tryCatchNumberOfCatches++;
    const nodeBody = catchClause.body.body;

    if (nodeBody) {
        if (nodeBody.length === 0) {
            reportObject.tryCatchNumberOfEmptyCatches++;
        } else {
            reportObject.tryCatchNumberOfCatchesLines += utils.getNumberOfLines(catchClause);

            const location = catchClause.loc;
            reportObject.tryCatchNumberOfCatchesLinesStart.push(location.start.line);
            reportObject.tryCatchNumberOfCatchesLinesEnd.push(location.end.line);

        }
    }

    if (nodeBody.length === 1 && nodeBody[0].type === 'ExpressionStatement') {
        if (nodeBody[0].expression.type === 'CallExpression') {
            const calleeObject = nodeBody[0].expression.callee.object;
            if (calleeObject && calleeObject.name === 'console') {
                reportObject.tryCatchNumberOfCatchesWithUniqueConsole++;
            }
        }

        reportObject.tryCatchNumberOfCatchesWithUniqueStatement++;
    }
}

function handleThrowStatement(reportObject, throwNode) {
    reportObject.tryCatchNumberOfThrows++;

    if (throwNode.argument.type === 'Literal') {
        // Throwing a string, number or something else
        reportObject.tryCatchNumberOfThrowsLiteral++;

    } else if (throwNode.argument.type === 'NewExpression' && throwNode.argument.callee.name === 'Error') {
        // Creation of new Error object
        reportObject.tryCatchNumberOfThrowsErrorObjects++;
    }
}


function getTryStatementNodes(functionBodyNode) {
    let tryNodes = [];
    if (Array.isArray(functionBodyNode)) {
        functionBodyNode.forEach(function (node) {
            if (node.type === 'TryStatement') {
                tryNodes.push(node);
            }
        });
    } else if (functionBodyNode.type === 'TryStatement') {
        tryNodes.push(node);
    }
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


function getThrowStatementNodes(nodes) {
    let throwNodes = [];
    nodes.forEach(function (node) {
        let body;
        if (node.block) { // TryStatement
            body = node.block.body;
        } else if (node.type === 'BlockStatement') { // Finally
            body = node.body;
        } else { // CatchClause
            body = node.body.body;
        }

        body.forEach(function (statement) {
            if (statement.type === 'ThrowStatement') {
                throwNodes.push(statement);
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