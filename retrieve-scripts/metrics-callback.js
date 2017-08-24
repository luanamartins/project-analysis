function handleAnalysis(obj, repoObject) {

    if(obj.type == 'FunctionDeclaration'){
        // If a function argument is called inside the function, this function is callback-accepting
        // Let's use heuristics to identify callbacks for error handling:
        //  - If an argument's name is "err" or "error" is considered error handling callback function
        // Heuristics used by Ali Mesbah on "Don't call us: We'll call you"

        var functionsArgs = obj.params;
        if(obj.body){
            var functionBody = obj.body;

            functionBody.forEach(function(statement){
                if(statement.type == 'CallExpression'){
                    const calleeName = statement.callee.name;
                    if(calleeName && functionsArgs.includes(calleeName)){
                        repoObject.numberOfCallbackAcceptingFunctions++;
                    }
                }
            });

        }
    }

}

module.exports = {
    handleAnalysis: handleAnalysis
};