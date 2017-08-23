function handleAnalysis(obj, repoObject) {
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