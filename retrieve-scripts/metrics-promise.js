function handleAnalysis(node, reportObject) {

    if (node.type === 'NewExpression' && node.callee.name === 'Promise') {
        reportObject.promise.numberOfPromises++;
    }

    if (node.type === 'CallExpression') {
        const callee = node.callee;
        if (callee) {
            if (callee.name === 'resolve') {
                reportObject.promise.numberOfResolves++;
            }

            if (callee.name === 'reject') {
                reportObject.promise.numberOfRejects++;
            }

            if (callee.property) {
                if (callee.property.name === 'then') {
                    reportObject.promise.numberOfPromiseThens++;

                    // const callbackFunction = node.arguments[0];
                    // const callbackFunctionBodyLoc = callbackFunction.body.loc;
                    // const start = callbackFunctionBodyLoc.start.line;
                    // const end = callbackFunctionBodyLoc.end.line;
                    // reportObject.promise.numberOfPromiseThenLines += (end - start);
                }

                if (callee.property.name === 'catch') {
                    reportObject.promise.numberOfPromiseCatches++;

                    // const callbackFunction = node.arguments[0];
                    // const callbackFunctionBodyLoc = callbackFunction.body.loc;
                    // const start = callbackFunctionBodyLoc.start.line;
                    // const end = callbackFunctionBodyLoc.end.line;
                    // reportObject.promise.numberOfPromiseCatchesLines += (end - start);
                }
            }

            if (callee.object && callee.object.name === 'Promise') {
                if (callee.property) {
                    const methodName = callee.property.name;
                    if (methodName === 'race') {
                        reportObject.promise.numberOfPromiseRaces++;
                    }

                    if (methodName === 'all') {
                        reportObject.promise.numberOfPromiseAll++;
                    }
                }
            }
        }
    }
}

module.exports = {
    handleAnalysis: handleAnalysis
};