

function handleAnalysis(obj, repoObject){
    if (obj.type == 'TryStatement') {
        repoObject.numberOfTries++;
    }

    if (obj.handler && obj.handler.type === 'CatchClause') {
        repoObject.numberOfCatches++;
    }

    if (obj.type == 'ThrowStatement') {
        repoObject.numberOfThrows++;
    }
}


module.exports = {
    handleAnalysis: handleAnalysis
};