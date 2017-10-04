function handleAnalysis(node, reportObject){
    if (node.type === 'TryStatement') {
        reportObject.tryCatch.numberOfTries++;
    }

    if (node.handler && node.handler.type === 'CatchClause') {
        reportObject.tryCatch.numberOfCatches++;
        const nodeBody = node.body;
        if(nodeBody && nodeBody.body === []){
            reportObject.tryCatch.numberOfEmptyCatches++;
        }

        if (nodeBody.length() === 1 && node.type === 'ExpressionStatement'){
            if(node.expression.type === 'CallExpression' && node.expression.callee.object.name === 'console'){
                reportObject.tryCatch.numberOfUniqueConsole++;
            }
        }

    }

    if (node.type === 'ThrowStatement') {
        reportObject.tryCatch.numberOfThrows++;
        if(node.argument.type === 'Literal'){
            // Throwing a string, number or something else
        } else if(node.argument.type === 'NewExpression' && node.argument.callee.name === 'Error'){
            // Creation of new Error object
        }
    }
}


module.exports = {
    handleAnalysis: handleAnalysis
};