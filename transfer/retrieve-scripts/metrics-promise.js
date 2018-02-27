const utils = require('./utils');

function handleAnalysis(node, reportObject) {

    if (node.type === 'NewExpression' && node.callee.name === 'Promise') {
        reportObject.promiseNumberOfPromises++;
    }

    if (node.type === 'CallExpression') {
        const callee = node.callee;
        if (callee) {
            if (callee.name === 'resolve' || (callee.property && callee.property.name === 'resolve')) {
                reportObject.promiseNumberOfResolves++;
            }

            if (callee.name === 'reject' || (callee.property && callee.property.name === 'reject')) {
                reportObject.promiseNumberOfRejects++;
            }

            if (callee.name === 'then' || (callee.property && callee.property.name === 'then')) {
                reportObject.promiseNumberOfPromiseThens++;
                let numberOfLines = utils.getNumberOfLines(node);
                const numberOfArgumentsOnThen = node.arguments.length;

                if (numberOfLines === 0 && numberOfArgumentsOnThen !== 0) {
                    numberOfLines = 1;
                } else {
                    numberOfLines = utils.getNumberOfLines(node.arguments[0]);
                }

                if (numberOfArgumentsOnThen >= 1) {
                    reportObject.promiseNumberOfPromiseThenFulfilledLines += numberOfLines;

                    const location = node.arguments[0].loc;
                    reportObject.promiseNumberOfPromiseThenFulfilledLinesStart.push(location.start.line);
                    reportObject.promiseNumberOfPromiseThenFulfilledLinesEnd.push(location.end.line);

                }

                if (numberOfArgumentsOnThen === 2) {
                    reportObject.promiseNumberOfPromiseThenRejectedLines += utils.getNumberOfLines(node.arguments[1]);

                    const location = node.arguments[1].loc;
                    reportObject.promiseNumberOfPromiseThenRejectedLinesStart.push(location.start.line);
                    reportObject.promiseNumberOfPromiseThenRejectedLinesEnd.push(location.end.line);

                }

            }

            if (callee.name === 'catch' || (callee.property && callee.property.name === 'catch')) {
                reportObject.promiseNumberOfPromiseCatches++;
                const numberOfArgumentsOnCatch = node.arguments.length;
                if (numberOfArgumentsOnCatch >= 1) {

                    const firstArgument = node.arguments[0];
                    const location = firstArgument.loc;

                    reportObject.promiseNumberOfPromiseCatchesLines += utils.getNumberOfLines(firstArgument);
                    reportObject.promiseNumberOfPromiseCatchesLinesStart.push(location.start.line);
                    reportObject.promiseNumberOfPromiseCatchesLinesEnd.push(location.end.line);

                    if (utils.getNumberOfLines(firstArgument) === 0 &&
                        (firstArgument.type === 'FunctionDeclaration' || firstArgument.type === 'FunctionExpression')) {
                        reportObject.promiseNumberOfEmptyFunctionsOnPromiseCatches++;
                    }
                }

                if (numberOfArgumentsOnCatch === 0) {
                    reportObject.promiseNumberOfEmptyFunctionsOnPromiseCatches++;
                }
            }


            if (callee.object && callee.object.name === 'Promise') {
                if (callee.property) {
                    const methodName = callee.property.name;
                    if (methodName === 'race') {
                        reportObject.promiseNumberOfPromiseRaces++;
                    }

                    if (methodName === 'all') {
                        reportObject.promiseNumberOfPromiseAll++;
                    }
                }
            }
        }
    }
}

module.exports = {
    handleAnalysis: handleAnalysis
};