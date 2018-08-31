const CONFIG = require("../../config");
const utils = require(CONFIG["srcPath"] + 'utils');
const constants = require('../constants');

function handleAnalysis(node, reportObject, metric_size_array) {

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
        catchClauseNodes.map((catchClause) => handleCatchClause(reportObject, catchClause, metric_size_array));

        const finallyStatements = getFinallyStatements(tryStatementNodes);
        finallyStatements.map((finallyNode) => handleFinallyClause(reportObject, finallyNode));

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
    const numberOfLines = utils.getNumberOfLines(tryNodeBlock);
    reportObject.tryCatchNumberOfTriesLines += numberOfLines;

    if (tryNodeBlock.body.length === 0) {
        reportObject.tryCatchNumberOfEmptyTries++;
    } else {
        if (numberOfLines === 1) {
            reportObject.tryCatchNumberOfTriesWithUniqueStatement++;
        }

        const location = tryNodeBlock.loc;
        reportObject.tryCatchNumberOfTriesLinesStart.push(location.start.line);
        reportObject.tryCatchNumberOfTriesLinesEnd.push(location.end.line);
    }
}

function handleCatchClause(reportObject, catchClause, metric_size_array) {
    reportObject.tryCatchNumberOfCatches++;
    const nodeBody = catchClause.body.body;
    reportObject.tryCatchNumberOfCatchesLines += utils.getNumberOfLines(catchClause);

    if (nodeBody) {
        const catchClauseParams = utils.getIdentifiersNames(catchClause.param);
        const numberOfLines = utils.getNumberOfLines(catchClause.body);
        const metricSizeObject = utils.getEmptyMetricSizeObject();

        metricSizeObject.mech = constants.TRY_CATCH;
        metricSizeObject.lines = numberOfLines;
        metricSizeObject.stmts = nodeBody.length;
        metricSizeObject.has_error_arguments = catchClauseParams.length > 0;

        if (numberOfLines === 0) {
            reportObject.tryCatchNumberOfEmptyCatches++;
            metricSizeObject.empty = true;
        } else if (!utils.useAnyArguments(nodeBody, catchClauseParams)) {
            reportObject.tryCatchNumberOfCatchesNoUsageOfErrorArgument++;
            metricSizeObject.noUsageOfErrorArg = true;
        }

        if (nodeBody.length === 1) {
            reportObject.tryCatchNumberOfCatchesWithUniqueStatement++;

            const uniqueStatement = nodeBody[0];
            if (utils.isConsoleStatement(uniqueStatement)) {
                reportObject.tryCatchNumberOfCatchesWithUniqueConsole++;
            }

            if(utils.isAlertCallExpression(uniqueStatement)) {
                reportObject.tryCatchNumberOfCatchesAlertOnly++;
            }
        }

        if(utils.hasConsoleLog(nodeBody)) {
            metricSizeObject.consoleLog = true;
        }

        if(utils.hasAlertMethodCalling(nodeBody)) {
            metricSizeObject.alert = true;
        }

        if (utils.hasErrorReassignment(nodeBody, catchClauseParams)) {
            reportObject.tryCatchNumberOfErrorReassigning++;
            metricSizeObject.reassigningError = true;
        }

        // Number of throws on catches
        const throwStatements = utils.getStatementsByType(nodeBody, 'ThrowStatement');
        const numberOfThrowStatements = throwStatements.length;
        reportObject.tryCatchNumberOfCatchesThrows += numberOfThrowStatements;

        if(numberOfThrowStatements > 0) {
            reportObject.tryCatchNumberOfCatchesThatThrows++;
        }

        // Throws literal types
        if (utils.hasLiteral(throwStatements)) {
            reportObject.tryCatchNumberOfCatchesThatThrowsLiteral++;
            metricSizeObject.throwLiteral = true;

            if (nodeBody.length === 1) {
                reportObject.tryCatchNumberOfCatchesThatThrowsLiteralOnly++;
            }
        }

        if (utils.hasUndefined(throwStatements)) {
            reportObject.tryCatchNumberOfCatchesThatThrowsUndefined++;
            metricSizeObject.throwUndefined = true;

            if (nodeBody.length === 1) {
                reportObject.tryCatchNumberOfCatchesThatThrowsUndefinedOnly++;
            }
        }

        if (utils.hasNull(throwStatements)) {
            reportObject.tryCatchNumberOfCatchesThatThrowsNull++;
            metricSizeObject.throwNull = true;

            if (nodeBody.length === 1) {
                reportObject.tryCatchNumberOfCatchesThatThrowsNullOnly++;
            }
        }

        if (utils.hasErrorObject(throwStatements)) {
            reportObject.tryCatchNumberOfCatchesThatThrowsErrorObject++;
            metricSizeObject.throwErrorObject = true;
        }

        // Throws Error objects
        const params = utils.getPropertyFrom(throwStatements, 'argument');
        if(utils.hasErrorObject(params)) {
            reportObject.tryCatchNumberOfCatchesThrowsErrorObject++;
        }

        // Number of rethrows an error argument
        const numberOfRethrows = utils.reuseAnErrorStatements(throwStatements, catchClauseParams);
        reportObject.tryCatchNumberOfCatchesRethrows += numberOfRethrows;

        if(numberOfRethrows > 0){
            reportObject.tryCatchNumberOfCatchesThatRethrows++;
            metricSizeObject.rethrow = true;
        }

        // Counts number of returns
        const returnStatements = utils.getStatementsByType(nodeBody, 'ReturnStatement');
        reportObject.tryCatchNumberOfCatchesReturns += returnStatements.length;
        reportObject.tryCatchNumberOfCatchesReturnsLiteral += utils.numberOfLiterals(returnStatements);
        reportObject.tryCatchNumberOfCatchesReturnsErrorObject += utils.numberOfErrorObjects(returnStatements);
        reportObject.tryCatchNumberOfCatchesThatRereturns += utils.reuseAnErrorStatements(returnStatements, catchClauseParams);

        if (returnStatements.length > 0) {
            // Counts number of returns that uses an error argument (so called rethrow)
            reportObject.tryCatchNumberOfCatchesThatReturns++;
            if (utils.hasLiteral(returnStatements)) {
                reportObject.tryCatchNumberOfCatchesThatReturnsLiteral++;
                metricSizeObject.returnLiteral = true;
                if (numberOfLines === 1) {
                    reportObject.tryCatchNumberOfCatchesThatReturnsLiteralOnly++;
                }
            }

            if (utils.hasUndefined(returnStatements)) {
                reportObject.tryCatchNumberOfCatchesThatReturnsUndefined++;
                metricSizeObject.returnUndefined = true;
                if (numberOfLines === 1) {
                    reportObject.tryCatchNumberOfCatchesThatReturnsUndefinedOnly++;
                }
            }

            if (utils.hasNull(returnStatements)) {
                reportObject.tryCatchNumberOfCatchesThatReturnsNull++;
                metricSizeObject.returnNull = true;
                if (numberOfLines === 1) {
                    reportObject.tryCatchNumberOfCatchesThatReturnsNullOnly++;
                }
            }

            if (utils.hasErrorObject(returnStatements)) {
                reportObject.tryCatchNumberOfCatchesThatReturnsErrorObject++;
                metricSizeObject.returnErrorObject = true;
            }

            const rereturns = utils.reuseAnErrorStatements(returnStatements, catchClauseParams);
            if(rereturns.length > 0){
                metricSizeObject.rereturns = true;
            }

        }

        // Counts number of continues
        const continueStatements = utils.getStatementsByType(nodeBody, 'ContinueStatement');
        reportObject.tryCatchNumberOfCatchesContinues += continueStatements.length;
        if(continueStatements.length > 0) {
            reportObject.tryCatchNumberOfCatchesThatContinues++;
            metricSizeObject.continue = true;
        }

        // Counts number of breaks
        const breakStatements = utils.getStatementsByType(nodeBody, 'BreakStatement');
        reportObject.tryCatchNumberOfCatchesBreaks += breakStatements.length;
        if(breakStatements.length > 0) {
            reportObject.tryCatchNumberOfCatchesThatBreaks++;
            metricSizeObject.break = true;

            if (nodeBody.length === 1) {
                reportObject.tryCatchNumberOfCatchesBreaksOnly++;
            }
        }

        metric_size_array.push(metricSizeObject);
    }

    const location = catchClause.loc;
    reportObject.tryCatchNumberOfCatchesLinesStart.push(location.start.line);
    reportObject.tryCatchNumberOfCatchesLinesEnd.push(location.end.line);

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
    handleAnalysis
};