const utils = require('./utils');

function handleAnalysis(node, reportObject) {

    const keywords = ['err', 'error', 'exception', 'reason'];

    const eventListeningMethods = ['on', 'once'];
    const eventRaisingMethods = ['emit'];

    if (node.type === 'CallExpression') {
        if (node.callee.property) {

            let methodName = node.callee.property.name;
            const firstArgObject = node.arguments[0];
            const isFirstArgErrorHandling = firstArgObject && firstArgObject.value ? containsSubstring(keywords, firstArgObject.value) : false;

            if (eventListeningMethods.includes(methodName)) {
                if (methodName === 'on' && isFirstArgErrorHandling) {
                    reportObject.events.numberOfEventMethodsOn++;
                } else if (methodName === 'once' && isFirstArgErrorHandling) {
                    reportObject.events.numberOfEventMethodsOnce++;
                }
            }

            if (eventRaisingMethods.includes(methodName)) {
                if (methodName === 'emit' && isFirstArgErrorHandling) {
                    reportObject.events.numberOfEventMethodsEmit++;
                    reportObject.events.numberOfEventEmitLines += utils.getNumberOfLines(node);
                }
            }

            if (eventListeningMethods.includes(methodName) || eventRaisingMethods.includes(methodName)) {
                const typeOfFirstArg = typeof(firstArgObject.value);
                if (firstArgObject.type === 'Literal') {
                    const literalValue = node.arguments[0].raw;

                    // the method is an event listener or emitter and is listing/raising a string as event
                    if (isString(literalValue)) {
                        reportObject.events.totalOfStringEvents++;
                    }

                    if (firstArgObject && firstArgObject.value === 'uncaughtException') {
                        reportObject.events.numberOfEventUncaughtException++;
                    }

                    if (firstArgObject && firstArgObject.value === 'unhandledRejection') {
                        reportObject.events.numberOfEventUnhandledRejection++;
                    }
                }

                if (typeOfFirstArg !== 'string') {
                    reportObject.events.totalOfEventsExceptStringType++;
                }
            }
        }

    }
}

function isString(literalValue){
    const hasDoubleQuotes = literalValue.startsWith("\"") && literalValue.endsWith("\"");
    const hasSingleQuotes = literalValue.startsWith("'") && literalValue.endsWith("'");
    return hasDoubleQuotes || hasSingleQuotes;
}

function containsSubstring(array, item) {
    let contains = false;

    if (item === 'e' || item === 'er') {
        return true;
    }

    if (item && typeof(item) === 'string') {
        contains = array.some(function (arrayItem) {
            return item.indexOf(arrayItem) >= 0;
        });
    }
    return contains;
}

// console.log(containsSubstring(['err', 'error', 'exception', 'reason', 'er'], 'connection'));

module.exports = {
    handleAnalysis: handleAnalysis
};