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

        if (errorArguments.length > 0) { // it has at least one error argument

            const numberOfLines = utils.getNumberOfLines(node);
            reportObject.callbacksNumberOfLines += numberOfLines;

            if (errorArguments.length === 1 && params.length === 1) {
                // callback has only one argument and it is an error argument
                reportObject.callbacksNumberOfFunctionsWithUniqueErrorArg++;
                reportObject.callbacksNumberOfFunctionsWithUniqueStatement++;

                // callback has only one argument and an error argument and also is empty
                if(isEmptyCallback(node, errorArguments, numberOfLines)) {
                    reportObject.callbacksNumberOfEmptyFunctionsWithUniqueErrorArg++;
                }

                // Callback features:
                //  (i) has only one error argument
                //  (ii) has only one statement and it is a console.log
                const statement = node.body.body[0];
                if (utils.isConsoleStatement(statement)) {
                    reportObject.callbacksNumberOfFunctionsWithUniqueConsole++;
                }
            }

            reportObject.callbacksNumberOfCallbackErrorFunctions++;

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
        return !utils.useAnyArguments(bodyFunction, errorArguments);
    }
}

function getIfStatementsWithErrorArgs(body, errorVariables) {
    let statements = [];
    body.forEach(statement => {
        if (statement.type === 'IfStatement') {
            const containsErrorArgOnTest = utils.useAnyArguments(statement.test, errorVariables);
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
    handleAnalysis
};
