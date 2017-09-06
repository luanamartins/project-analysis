function handleAnalysis(obj, repoObject) {

    if (obj.type == 'NewExpression' && obj.callee.name == 'Promise') {
        repoObject.numberOfPromises++;
    }

    if (obj.type == 'CallExpression') {
        const callee = obj.callee;
        if (callee) {
            if (callee.name === 'resolve') {
                repoObject.numberOfResolves++;
            }

            if (callee.name === 'reject') {
                repoObject.numberOfRejects++;
            }

            if(callee.property) {
                if (callee.property.name === 'then') {
                    repoObject.numberOfPromiseThens++;
                }

                if (callee.property.name === 'catch') {
                    repoObject.numberOfPromiseCatches++;
                }
            }

            if (callee.object && callee.object.name == 'Promise') {
                if (callee.property) {
                    const methodName = callee.property.name;
                    if (methodName === 'race') {
                        repoObject.numberOfPromiseRaces++;
                    }

                    if (methodName === 'all') {
                        repoObject.numberOfPromiseAll++;
                    }
                }
            }
        }
    }
}

module.exports = {
    handleAnalysis: handleAnalysis
};