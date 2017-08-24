function handleAnalysis(obj, repoObject) {

    // Check if it is possible to create async anonymous functions
    if(obj.type == 'FunctionDeclaration' && obj.async){
        repoObject.numberOfAsyncs++;
    }

    if(obj.type == 'AwaitExpression'){
        repoObject.numberOfAwaits++;
    }
}

module.exports = {
    handleAnalysis: handleAnalysis
};