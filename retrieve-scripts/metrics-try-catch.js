

function handleAnalysis(obj, repoObject){
    if (obj.type === 'TryStatement') {
        repoObject.tryCatch.numberOfTries++;
    }

    if (obj.handler && obj.handler.type === 'CatchClause') {
        repoObject.tryCatch.numberOfCatches++;
    }

    if (obj.type === 'ThrowStatement') {
        repoObject.tryCatch.numberOfThrows++;
    }
}


module.exports = {
    handleAnalysis: handleAnalysis
};