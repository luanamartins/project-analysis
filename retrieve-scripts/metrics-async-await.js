function handleAnalysis(node, reportObject) {

    // Check if it is possible to create async anonymous functions
    if(node.type === 'FunctionDeclaration' && node.async){
        reportObject.asyncAwait.numberOfAsyncs++;
    }

    if(node.type === 'AwaitExpression'){
        // This is basically the same as then on promises
        reportObject.asyncAwait.numberOfAwaits++;
    }
}

module.exports = {
    handleAnalysis: handleAnalysis
};