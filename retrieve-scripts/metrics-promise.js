function handleAnalysis(obj, repoObject) {

    if (obj.type === 'NewExpression' && obj.callee.name === 'Promise') {
        repoObject.promise.numberOfPromises++;
    }

    if (obj.type === 'CallExpression') {
        const callee = obj.callee;
        if (callee) {
            if (callee.name === 'resolve') {
                repoObject.promise.numberOfResolves++;
            }

            if (callee.name === 'reject') {
                repoObject.promise.numberOfRejects++;
            }

            if(callee.property) {
                if (callee.property.name === 'then') {
                    repoObject.promise.numberOfPromiseThens++;
                }

                if (callee.property.name === 'catch') {
                    repoObject.promise.numberOfPromiseCatches++;
                }
            }

            if (callee.object && callee.object.name === 'Promise') {
                if (callee.property) {
                    const methodName = callee.property.name;
                    if (methodName === 'race') {
                        repoObject.promise.numberOfPromiseRaces++;
                    }

                    if (methodName === 'all') {
                        repoObject.promise.numberOfPromiseAll++;
                    }
                }
            }
        }
    }
}

module.exports = {
    handleAnalysis: handleAnalysis
};