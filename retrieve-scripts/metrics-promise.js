const utils = require('./utils');

function handleAnalysis(node, reportObject) {

    if (node.type === 'NewExpression' && node.callee.name === 'Promise') {
        reportObject.promise.numberOfPromises++;
    }

    if (node.type === 'CallExpression') {
        const callee = node.callee;
        if (callee) {
            if (callee.name === 'resolve' || (callee.property && callee.property.name === 'resolve')) {
                reportObject.promise.numberOfResolves++;
            }

            if (callee.name === 'reject' || (callee.property && callee.property.name === 'reject')) {
                reportObject.promise.numberOfRejects++;
            }

            if (callee.name === 'then' || (callee.property && callee.property.name === 'then')) {
                reportObject.promise.numberOfPromiseThens++;
                reportObject.promise.numberOfPromiseThenLines += utils.getNumberOfLines(node);
            }

            if (callee.name === 'catch' || (callee.property && callee.property.name === 'catch')) {
                reportObject.promise.numberOfPromiseCatches++;
                reportObject.promise.numberOfPromiseCatchesLines += utils.getNumberOfLines(node);
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