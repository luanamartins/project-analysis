function handleAnalysis(node, reportObject){
    if (node.type === 'TryStatement') {
        reportObject.tryCatch.numberOfTries++;
    }

    if (node.handler && node.handler.type === 'CatchClause') {
        reportObject.tryCatch.numberOfCatches++;
        if(node.body && node.body.body === []){
            reportObject.tryCatch.numberOfEmptyCatches++;
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