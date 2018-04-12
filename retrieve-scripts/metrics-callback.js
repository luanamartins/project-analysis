const utils = require('./utils');

function handleAnalysis(node, reportObject) {

    if (node.type === 'FunctionDeclaration' ||
        node.type === 'FunctionExpression' ||
        node.type === 'ArrowFunctionExpression') {

        // If a function argument is called inside the function, this function is callback-accepting
        const params = node.params.map((item) => {
            return item.name
        });

        const errorArguments = params.filter(item => utils.isAnErrorArgument(item));

        if (errorArguments.length > 0) { // it is an error handling function
            reportObject.callbacksNumberOfCallbackErrorFunctions++;

            const numberOfLines = utils.getNumberOfLines(node);
            reportObject.callbacksNumberOfLines += numberOfLines;

            const location = node.loc;
            reportObject.callbacksNumberOfLinesStart.push(location.start.line);
            reportObject.callbacksNumberOfLinesEnd.push(location.end.line);

            const firstArgument = params[0];
            if (utils.isAnErrorArgument(firstArgument)) {
                reportObject.callbacksNumberOfFirstErrorArgFunctions++;
            }

            // Empty callback functions:
            // (i) its body might be empty
            // (ii) It is not using any error argument in any part of the body
            if (isEmptyCallback(node, errorArguments, numberOfLines)) {
                reportObject.callbacksNumberOfEmptyCallbacks++;
            }


            const bodyFunction = node.body.body;
            const ifStatements = getIfStatementsWithErrorArgs(bodyFunction, errorArguments);

            ifStatements.forEach(ifStatement => {

                const ifStatementConsequent = ifStatement.consequent;
                if (ifStatementConsequent) {
                    const numberOfStatementsOnIf = utils.getNumberOfLines(ifStatementConsequent);
                    if (numberOfStatementsOnIf === 1) {
                        reportObject.callbacksNumberOfFunctionsWithUniqueStatement++;

                        const uniqueStatement = ifStatementConsequent.body[0];
                        if (utils.isConsoleStatement(uniqueStatement)) {
                            reportObject.callbacksNumberOfFunctionsWithUniqueConsole++;
                        }
                    }
                }
            });
        }
    }
}

function isEmptyCallback(node, errorArguments, numberOfLines) {
    if (numberOfLines === 0) {
        return true;
    } else {
        const bodyFunction = node.body;
        return !useAnyArguments(bodyFunction, errorArguments);
    }
}

function useAnyArguments(body, args) {
    let hasErrorArgs = false;
    utils.traverse(body, function (bodyFunctionNode) {
        if (!hasErrorArgs && typeof(bodyFunctionNode) === 'string' && args.includes(bodyFunctionNode)) {
            hasErrorArgs = true;
        }
    });
    return hasErrorArgs;
}

function getIfStatementsWithErrorArgs(body, errorVariables) {
    let statements = [];
    body.forEach(statement => {
        if (statement.type === 'IfStatement') {
            const containsErrorArgOnTest = useAnyArguments(statement.test, errorVariables);
            if (containsErrorArgOnTest) {
                statements.push(statement);
            }
        }
    });

    return statements;
}


// Functions which has no arguments, but still uses:
//  console.error
//  console.log a message of error
//  Still are handling errors


module.exports = {
    handleAnalysis: handleAnalysis
};
