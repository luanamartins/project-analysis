
function handleAnalysis(obj, repoObject){

    if (obj.type == 'NewExpression' && obj.callee.name == 'Promise') {
        repoObject.numberOfPromises++;
    }

    if(obj.type == 'CallExpression'){
        const callee = obj.callee;
        if(callee){
            if(callee.name === 'resolve'){
                repoObject.numberOfResolves++;
            }

            if(callee.name === 'reject'){
                repoObject.numberOfRejects++;
            }

            if(callee.property.name === 'then'){
                repoObject.numberOfPromiseThens++;
            }

            if(callee.property.name === 'catch'){
                repoObject.numberOfPromiseCatches++;
            }
        }
    }
}

module.exports = {
    handleAnalysis: handleAnalysis
};