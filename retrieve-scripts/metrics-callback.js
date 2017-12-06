const utils = require('./utils');

function handleAnalysis(node, reportObject) {

    if (node.type === 'FunctionDeclaration' ||
        node.type === 'FunctionExpression' ||
        node.type === 'ArrowFunctionExpression') {
        // If a function argument is called inside the function, this function is callback-accepting

        let functionsArgsNames = node.params.map((param) => {
            return param.name;
        });

        const keywords = ['err', 'error', 'e', 'exception', 'reason', 'er'];
        const listOfErrorHandlingArgs = getErrorHandlingArgs(functionsArgsNames, keywords);

        let isErrorHandlingFunction = false;

        if (keywords.includes(functionsArgsNames[0])) {
            reportObject.callbacksNumberOfFirstErrorArgFunctions++;
            isErrorHandlingFunction = true;
        } else if (listOfErrorHandlingArgs.length > 0) {
            reportObject.callbacksNumberOfCallbackErrorFunctions++;
            isErrorHandlingFunction = true;
        }

        if (isErrorHandlingFunction) {

            reportObject.callbacksNumberOfLines += utils.getNumberOfLines(node);

            if (node.body) {
                let bodyFunction = node.body.body;
                if (bodyFunction && bodyFunction.length === 0) {
                    reportObject.callbacksNumberOfEmptyCallbacks++;
                }

                if (bodyFunction) {
                    const ifStatements = getIfStatements(bodyFunction, listOfErrorHandlingArgs);
                    ifStatements.forEach(ifStatement => {
                        const ifStatementConsequent = ifStatement.consequent;
                        const ifStatementBody = ifStatementConsequent.body;

                        if (ifStatementBody) {
                            if (ifStatementBody.length === 0) {
                                reportObject.callbacksNumberOfEmptyCallbacks++;
                            } else if (ifStatementBody.length === 1) {
                                reportObject.callbacksNumberOfConsoleStatementOnly++;
                            }
                        } else {
                            reportObject.callbacksNumberOfConsoleStatementOnly++;
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

function getErrorHandlingArgs(args, haystack) {
    let errorHandlingArgs = [];
    args.forEach(arg => {
        if (haystack.includes(arg)) {
            errorHandlingArgs.push(arg);
        }
    });

    return errorHandlingArgs;
}


// Functions which has no arguments, but still uses:
//  console.error
//  console.log a message of error
//  Still are handling errors

function filterErrorHandlingCallbacks(arg) {
    if (arg.type === 'FunctionExpression') {
        const params = arg.params;
        const keywords = ['err', 'error', 'e', 'exception'];

        return params && findOne(keywords, params);
    }
}

let findOne = function (haystack, arr) {
    return arr.some(function (v) {
        return haystack.indexOf(v.name) >= 0;
    });
};

module.exports = {
    handleAnalysis: handleAnalysis
};
