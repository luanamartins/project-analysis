const utils = require('../utils');

function handleCatches(reportObject, node) {
    reportObject.promiseNumberOfPromiseCatches++;
    const numberOfArgumentsOnCatch = node.arguments.length;
    if (numberOfArgumentsOnCatch >= 1) {

        const firstArgument = node.arguments[0];
        const lines = utils.getNumberOfLines(firstArgument);

        const location = firstArgument.loc;
        reportObject.promiseNumberOfPromiseCatchesLines += lines;
        reportObject.promiseNumberOfPromiseCatchesLinesStart.push(location.start.line);
        reportObject.promiseNumberOfPromiseCatchesLinesEnd.push(location.end.line);

        if (firstArgument.type === 'FunctionDeclaration' ||
            firstArgument.type === 'FunctionExpression') {

            const functionBody = firstArgument.body;
            const functionParams = utils.getIdentifiersNames(firstArgument.params);

            if (utils.isEmptyHandler(functionBody, functionParams, lines)) {
                reportObject.promiseNumberOfEmptyFunctionsOnPromiseCatches++;
            }

            if (lines === 1) {
                reportObject.promiseNumberOfCatchesWithUniqueStatement++;

                const statement = functionBody.body[0];
                if (utils.isConsoleStatement(statement)) {
                    reportObject.promiseNumberOfCatchesWithUniqueConsole++;
                }
            }

            // Number of throws on catches
            const throwStatements = utils.getStatementsByType(functionBody, 'ThrowStatement');
            reportObject.promiseNumberOfThrowErrorsOnCatches += throwStatements.length;

            // Number of throws primitive types
            reportObject.promiseNumberOfThrowPrimitiveTypesOnCatches += utils.getThrowPrimitiveTypes(throwStatements);

            // Number of rethrows on catches
            reportObject.promiseNumberOfRethrowsOnCatches += utils.handleRethrowStatements(throwStatements, functionParams);

            // Counts number of returns
            const returnStatements = utils.getStatementsByType(functionBody, 'ReturnStatement');
            reportObject.promiseNumberOfReturnsOnCatches += returnStatements.length;

            // Counts number of returns that uses an error argument
            reportObject.promiseNumberOfReturnsAnErrorOnCatches += utils.getNumberOfReturnUsingErrors(returnStatements, functionParams);

            // Counts number of breaks
            const breakStatements = utils.getStatementsByType(functionBody, 'BreakStatement');
            reportObject.promiseNumberOfBreaksOnCatches += breakStatements.length;

        }
    }

    if (numberOfArgumentsOnCatch === 0) {
        reportObject.promiseNumberOfEmptyFunctionsOnPromiseCatches++;
    }
}

function handleThens(reportObject, node) {
    reportObject.promiseNumberOfPromiseThens++;
    let numberOfLines = utils.getNumberOfLines(node);
    const numberOfArgumentsOnThen = node.arguments.length;

    if (numberOfLines === 0 && numberOfArgumentsOnThen !== 0) {
        numberOfLines = 1;
    } else {
        numberOfLines = utils.getNumberOfLines(node.arguments[0]);
    }

    if (numberOfArgumentsOnThen >= 1) {
        reportObject.promiseNumberOfPromiseThenFulfilledLines += numberOfLines;

        const location = node.arguments[0].loc;
        reportObject.promiseNumberOfPromiseThenFulfilledLinesStart.push(location.start.line);
        reportObject.promiseNumberOfPromiseThenFulfilledLinesEnd.push(location.end.line);
    }

    if (numberOfArgumentsOnThen === 2) {
        reportObject.promiseNumberOfPromiseThenRejectedLines += utils.getNumberOfLines(node.arguments[1]);

        const location = node.arguments[1].loc;
        reportObject.promiseNumberOfPromiseThenRejectedLinesStart.push(location.start.line);
        reportObject.promiseNumberOfPromiseThenRejectedLinesEnd.push(location.end.line);
    }
}

function handlePromiseObjects(reportObject, callee) {
    reportObject.promiseNumberOfPromises++;
    if (callee.property) {
        const methodName = callee.property.name;
        if (methodName === 'race') {
            reportObject.promiseNumberOfPromiseRaces++;
        }

        if (methodName === 'all') {
            reportObject.promiseNumberOfPromiseAll++;
        }
    }
}

function handleAnalysis(node, reportObject) {

    // Promises are created on NewExpression or CallExpression of Promise (resolve, reject, all, race)
    if (node.type === 'NewExpression' && node.callee.name === 'Promise') {
        reportObject.promiseNumberOfPromises++;
    }

    if (node.type === 'CallExpression') {
        const callee = node.callee;
        if (callee) {
            if (callee.name === 'resolve' || (callee.property && callee.property.name === 'resolve')) {
                reportObject.promiseNumberOfResolves++;
            }

            if (callee.name === 'reject' || (callee.property && callee.property.name === 'reject')) {
                reportObject.promiseNumberOfRejects++;
            }

            if (callee.name === 'then' || (callee.property && callee.property.name === 'then')) {
                handleThens(reportObject, node);
            }

            if (callee.name === 'catch' || (callee.property && callee.property.name === 'catch')) {
                handleCatches(reportObject, node);
            }

        }

        if (callee.object && callee.object.name === 'Promise') {
            handlePromiseObjects(reportObject, callee);
        }
    }

    // Add a metric for counting the number of declared promises which has no catches
    if(node.type === 'ExpressionStatement' && node.expression.type === 'CallExpression') {
        const callee = node.expression.callee;
        if(callee.property) {
            const propertyName = callee.property.name;

            // The method name called is not catch
            if (propertyName === 'then') {
                reportObject.promiseNumberOfNonCaughtPromises++;
            }

            const handlesError = propertyName === 'catch';

            // Chaining thens e catches
            if (propertyName === 'then' || propertyName === 'catch') {
                const callExpressions = utils.getStatementsByType(node, 'CallExpression');
                const result = callExpressions.filter((callExpression) =>
                    callExpression.callee.property && callExpression.callee.property.name === 'catch');

                const numberOfChainingCatches = (handlesError) ? result.length - 1 : result.length;
                if (numberOfChainingCatches > 0) {
                    reportObject.promiseNumberOfChainingCatches++;
                }
            }
        }
    }
}

module.exports = {
    handleAnalysis
};