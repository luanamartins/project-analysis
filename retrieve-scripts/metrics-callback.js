function handleAnalysis(node, reportObject) {

    if (node.type === 'FunctionDeclaration' ||
        node.type === 'FunctionExpression' ||
        node.type === 'ArrowFunctionExpression') {
        // If a function argument is called inside the function, this function is callback-accepting

        // Let's use heuristics to identify callbacks for error handling:
        //  - If an argument's name is "err" or "error" is considered error handling callback function
        // Heuristics used by Ali Mesbah on "Don't call us: We'll call you"

        // Still needs to consider ArrowExpressions () => {} (Not exactly)

        let functionsArgsNames = node.params.map((param) => {
            return param.name;
        });

        const keywords = ['err', 'error', 'e', 'exception'];
        const listOfErrorHandlingArgs = getErrorHandlingArgs(functionsArgsNames, keywords);

        if (keywords.includes(functionsArgsNames[0])) {
            reportObject.callbacks.numberOfFirstErrorArgFunctions++;
        } else if (listOfErrorHandlingArgs.length > 0) {
            reportObject.callbacks.numberOfCallbackErrorFunctions++;
        }

        if (node.body) {
            let bodyFunction = node.body.body;
            if (bodyFunction.length === 0) {
                reportObject.callbacks.numberOfEmptyCallbacks++;
            }

            const ifStatements = getIfStatements(bodyFunction, listOfErrorHandlingArgs);
            ifStatements.forEach(ifStatement => {

                const errorHandlingArg = ifStatement.test.name;
                if (listOfErrorHandlingArgs.includes(errorHandlingArg)) {
                    const ifStatementConsequent = ifStatement.consequent;
                    const ifStatementBody = ifStatementConsequent.body;

                    if (ifStatementBody) {
                        if (ifStatementBody.length === 0) {
                            reportObject.callbacks.numberOfEmptyCallbacks++;
                        } else if (ifStatementBody.length === 1) {
                            reportObject.callbacks.numberOfConsoleStatementOnly++;
                        }
                    } else {
                        reportObject.callbacks.numberOfConsoleStatementOnly++;
                    }
                }
            });
        }

    }

    // if (node.body) {
    //     let functionBody = node.body.body;
    //
    //     if (functionBody) {
    //         functionBody.forEach(function (statement) {
    //             if (statement.type === 'CallExpression') {
    //                 const calleeName = statement.callee.name;
    //                 if (calleeName && functionsArgs.includes(calleeName)) {
    //                     reportObject.callbacks.numberOfHighOrderFunctions++;
    //                 }
    //             }
    //         });
    //     }
    // }


    // if (node.type === 'ExpressionStatement' && node.expression.type === 'CallExpression') {
    //
    //     const callArgs = node.expression.arguments;
    //
    //     const callbacks = callArgs.filter(filterErrorHandlingCallbacks);
    //     reportObject.callbacks.numberOfCallbackErrorFunctions += callbacks.length;
    //
    //     for (let i = 0; i < callbacks.length; i++) {
    //         if (callbacks[i].body.type === 'BlockStatement' && callbacks[i].body.body.length === 0) {
    //             reportObject.callbacks.numberOfEmptyCallbacks++;
    //         }
    //     }
    // }
}

function getIfStatements(body, errorVariables) {
    let statements = [];
    body.forEach(statement => {
        if (statement.type === 'IfStatement') {
            statements.push(statement);
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
