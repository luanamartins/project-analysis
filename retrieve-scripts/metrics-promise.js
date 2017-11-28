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
                let numberOfLines = utils.getNumberOfLines(node);
                const numberOfArgumentsOnThen = node.arguments.length;

                if (numberOfLines === 0 && numberOfArgumentsOnThen !== 0) {
                    numberOfLines = 1;
                } else {
                    numberOfLines = utils.getNumberOfLines(node.arguments[0]);
                }

                if (numberOfArgumentsOnThen >= 1) {
                    reportObject.promise.numberOfPromiseThenFulfilledLines += numberOfLines;
                }

                if (numberOfArgumentsOnThen === 2) {
                    reportObject.promise.numberOfPromiseThenRejectedLines += utils.getNumberOfLines(node.arguments[1]);
                }

            }

            if (callee.name === 'catch' || (callee.property && callee.property.name === 'catch')) {
                reportObject.promise.numberOfPromiseCatches++;
                reportObject.promise.numberOfPromiseCatchesLines += utils.getNumberOfLines(node.arguments[0]);
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