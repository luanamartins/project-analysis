const utils = require('./utils');

function handleAnalysis(node, reportObject) {

    if (node.type === 'FunctionDeclaration' || node.type === 'ArrowFunctionExpression' ||
        node.type === 'FunctionExpression' && !node.async) {

        let functionBody;
        if (node.type === 'ArrowFunctionExpression') {
            functionBody = node.body;
        } else {
            functionBody = node.body.body;
        }

        const tryStatementNodes = getTryStatementNodes(functionBody);
        tryStatementNodes.map((tryNode) => handleTryStatement(reportObject, tryNode));

        const catchClauseNodes = getCatchClauseNodes(tryStatementNodes);
        catchClauseNodes.map((catchClause) => handleCatchClause(reportObject, catchClause));

        const finallyStatements = getFinallyStatements(tryStatementNodes);
        finallyStatements.map((finallyNode) => handleFinallyClause(reportObject, finallyNode));

        const nodes = tryStatementNodes.concat(catchClauseNodes).concat(finallyStatements);

        const throwStatementNodes = getThrowStatementNodes(nodes);
        throwStatementNodes.map((throwNode) => handleThrowStatement(reportObject, throwNode));

    }
}

function handleFinallyClause(reportObject, finallyNode) {
    reportObject.tryCatchNumberOfFinallies++;
    reportObject.tryCatchNumberOfFinalliesLines += utils.getNumberOfLines(finallyNode);

    const location = finallyNode.loc;
    reportObject.tryCatchNumberOfFinalliesLinesStart.push(location.start.line);
    reportObject.tryCatchNumberOfFinalliesLinesEnd.push(location.end.line);
}

function handleTryStatement(reportObject, tryNode) {
    reportObject.tryCatchNumberOfTries++;
    const tryNodeBlock = tryNode.block;
    if (tryNodeBlock.body.length === 0) {
        reportObject.tryCatchNumberOfEmptyTries++;
    } else {
        const numberOfLines = utils.getNumberOfLines(tryNodeBlock);
        reportObject.tryCatchNumberOfTriesLines += numberOfLines;

        if (numberOfLines === 1) {
            reportObject.tryCatchNumberOfTriesWithUniqueStatement++;
        }

        const location = tryNodeBlock.loc;
        reportObject.tryCatchNumberOfTriesLinesStart.push(location.start.line);
        reportObject.tryCatchNumberOfTriesLinesEnd.push(location.end.line);
    }
}

function handleCatchClause(reportObject, catchClause) {
    reportObject.tryCatchNumberOfCatches++;
    const nodeBody = catchClause.body.body;
    reportObject.tryCatchNumberOfCatchesLines += utils.getNumberOfLines(catchClause);
    if (nodeBody) {
        if (nodeBody.length === 0) {
            reportObject.tryCatchNumberOfEmptyCatches++;
        } else if (nodeBody.length === 1) {
            reportObject.tryCatchNumberOfCatchesWithUniqueStatement++;

            const uniqueStatement = nodeBody[0];
            if(utils.isConsoleStatement(uniqueStatement)){
                reportObject.tryCatchNumberOfCatchesWithUniqueConsole++;
            }

            if(utils.isThrowStatement(uniqueStatement)){
                reportObject.tryCatchNumberOfCatchesThrowError++;
            }
        }
        const location = catchClause.loc;
        reportObject.tryCatchNumberOfCatchesLinesStart.push(location.start.line);
        reportObject.tryCatchNumberOfCatchesLinesEnd.push(location.end.line);
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
    utils.traverse(functionBodyNode, function (node) {
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