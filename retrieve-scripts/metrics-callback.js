const utils = require('./utils');

function handleAnalysis(node, reportObject) {

    if (node.type === 'FunctionDeclaration' ||
        node.type === 'FunctionExpression' ||
        node.type === 'ArrowFunctionExpression') {
        // If a function argument is called inside the function, this function is callback-accepting

        let functionsArgsOfTypeString = node.params.filter((param) => typeof(param.name) === 'string');
        let functionsArgsNames = functionsArgsOfTypeString.map((param) => {
            return param.name;
        });

        const listOfErrorHandlingArgs = getErrorHandlingArguments(functionsArgsNames);

        let isErrorHandlingFunction = false;

        if (functionsArgsNames[0] && isErrorHandlingArgument(functionsArgsNames[0])) {
            reportObject.callbacksNumberOfFirstErrorArgFunctions++;
            isErrorHandlingFunction = true;
        } else if (listOfErrorHandlingArgs.length > 0) {
            reportObject.callbacksNumberOfCallbackErrorFunctions++;
            isErrorHandlingFunction = true;
        }

        if (isErrorHandlingFunction) {

            reportObject.callbacksNumberOfLines += utils.getNumberOfLines(node);

            const location = node.loc;
            reportObject.callbacksNumberOfLinesStart.push(location.start.line);
            reportObject.callbacksNumberOfLinesEnd.push(location.end.line);

            if (node.body) {
                let bodyFunction = node.body.body;
                if (bodyFunction && bodyFunction.length === 0) {
                    reportObject.callbacksNumberOfEmptyCallbacks++;
                }

                if (bodyFunction) {
                    const ifStatements = getIfStatements(bodyFunction, listOfErrorHandlingArgs);
                    ifStatements.forEach(ifStatement => {
                        const ifStatementConsequent = ifStatement.consequent;
                        // const ifStatementBody = ifStatementConsequent.body;

                        if (ifStatementConsequent) {
                            const numberOfStatementsOnIf = utils.getNumberOfLines(ifStatementConsequent);
                            if (numberOfStatementsOnIf === 0) {
                                reportObject.callbacksNumberOfEmptyCallbacks++;
                            } else if (numberOfStatementsOnIf === 1) {
                                reportObject.callbacksNumberOfFunctionsWithUniqueStatement++;
                                const uniqueStatement = ifStatementConsequent.body[0];
                                if(utils.isConsoleStatement(uniqueStatement)){
                                    reportObject.asyncAwaitNumberOfCatchesWithUniqueConsole++;
                                }
                            }
                        }
                    });
                }
            }
        }
    }
}

function getIfStatements(body, errorVariables) {
    let statements = [];
    body.forEach(statement => {
        if (statement.type === 'IfStatement') {
            const errorHandlingArg = statement.test.name;
            if (errorHandlingArg && errorHandlingArg.includes(errorVariables)) {
                statements.push(statement);
            }
        }
    });

    return statements;
}

function getErrorHandlingArguments(array) {
    let errorHandlingArgs = [];
    array.forEach(item => {
        if (isErrorHandlingArgument(item)) {
            errorHandlingArgs.push(item);
        }
    });

    return errorHandlingArgs;
}

function isErrorHandlingArgument(argument) {
    const keywordsHigherSize = ['error', 'exception', 'reason', 'reject'];
    const keywordsLowerSize = ['err', 'e', 'er'];

    const containsExactly = keywordsLowerSize.includes(argument);
    const containsSubstrings = substring(argument, keywordsHigherSize);

    return (containsExactly || containsSubstrings);
}

function substring(item, keywords) {
    if (keywords) {
        const list = keywords.filter(keyword => item.indexOf(keyword) >= 0);
        return list.length !== 0;
    } else {
        return false;
    }
}


// Functions which has no arguments, but still uses:
//  console.error
//  console.log a message of error
//  Still are handling errors


module.exports = {
    handleAnalysis: handleAnalysis
};
