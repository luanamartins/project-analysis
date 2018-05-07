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

            const functionBody = node.body.body;

            if (errorArguments.length === 1 && params.length === 1) {
                // callback has only one argument and it is an error argument
                reportObject.callbacksNumberOfFunctionsWithUniqueErrorArg++;
                reportObject.callbacksNumberOfLinesOfFunctionsWithUniqueErrorArg += numberOfLines;

                if (numberOfLines === 1) {
                    reportObject.callbacksNumberOfFunctionsWithUniqueStatement++;
                    reportObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueStatement++;
                }

                // callback has only one argument and an error argument and also is empty
                if (utils.isEmptyHandler(node.body, errorArguments, numberOfLines)) {
                    reportObject.callbacksNumberOfEmptyFunctionsWithUniqueErrorArg++;
                }

                // Callback features:
                //  (i) has only one error argument
                //  (ii) has only one statement and it is a console.log
                const statement = functionBody[0];
                if (utils.isConsoleStatement(statement)) {
                    reportObject.callbacksNumberOfFunctionsWithUniqueConsole++;
                    reportObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueConsole++;
                }

                // DONE
                // callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueConsole
                // callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueStatement
                // callbacksNumberOfLinesOfFunctionsWithUniqueErrorArg
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
            if (utils.isEmptyHandler(node.body, errorArguments, numberOfLines)) {
                reportObject.callbacksNumberOfEmptyCallbacks++;
            }

            // Counts number of returns
            const returnStatements = utils.getStatementsByType(functionBody, 'ReturnStatement');
            reportObject.callbacksNumberOfReturnsOnCatches += returnStatements.length;

            // Counts number of returns that uses an error argument
            reportObject.callbacksNumberOfReturnsAnErrorOnCatches += utils.getNumberOfReturnUsingErrors(returnStatements, errorArguments);

            // Counts number of breaks
            const breakStatements = utils.getStatementsByType(functionBody, 'BreakStatement');
            reportObject.callbacksNumberOfBreaksOnCatches += breakStatements.length;

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
