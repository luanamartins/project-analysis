function handleAnalysis(obj, repoObject) {

    if (obj.type === 'FunctionDeclaration') {
        // If a function argument is called inside the function, this function is callback-accepting

        // Let's use heuristics to identify callbacks for error handling:
        //  - If an argument's name is "err" or "error" is considered error handling callback function
        // Heuristics used by Ali Mesbah on "Don't call us: We'll call you"

        // Still needs to consider ArrowExpressions () => {} (Not exactly)

        let functionsArgs = obj.params;
        if (obj.body) {
            let functionBody = obj.body.body;

            if (functionBody) {
                functionBody.forEach(function (statement) {
                    if (statement.type === 'CallExpression') {
                        const calleeName = statement.callee.name;
                        if (calleeName && functionsArgs.includes(calleeName)) {
                            repoObject.callbacks.numberOfCallbackAcceptingFunctions++;
                        }
                    }
                });
            }
        }
    }

    if (obj.type === 'ExpressionStatement' && obj.expression.type === 'CallExpression') {

        const callArgs = obj.expression.arguments;

        const callbacks = callArgs.filter(filterErrorHandlingCallbacks);
        repoObject.callbacks.numberOfCallbackErrorFunctions += callbacks.length;

        for(let i = 0; i < callbacks.length; i++){
            if(callbacks[i].body.type === 'BlockStatement' && callbacks[i].body.body === []){
                repoObject.callbacks.numberOfEmptyCallbacks++;
            }
        }
    }
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
