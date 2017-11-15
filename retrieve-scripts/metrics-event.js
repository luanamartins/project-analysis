function handleAnalysis(node, reportObject) {

    const keywords = ['err', 'error', 'exception', 'reason', 'er'];

    let eventListeningMethods = ['on', 'once'];
    let eventRaisingMethods = ['emit'];

    if (node.type === 'CallExpression') {
        if (node.callee.property) {

            let methodName = node.callee.property.name;
            const firstArg = node.arguments[0];
            const firstArgEhm = containsSubstring(keywords, firstArg.value);

            if (eventListeningMethods.includes(methodName)) {
                if (methodName === 'on' && firstArgEhm) {
                    reportObject.events.numberOfEventMethodsOn++;
                } else if (methodName === 'once' && firstArgEhm) {
                    reportObject.events.numberOfEventMethodsOnce++;
                }
            }

            if (eventRaisingMethods.includes(methodName)) {
                if (methodName === 'emit' && firstArgEhm) {
                    reportObject.events.numberOfEventMethodsEmit++;
                }
            }

            if (eventListeningMethods.includes(methodName) || eventRaisingMethods.includes(methodName)) {
                const typeOfFirstArg = typeof(firstArg.value);
                if (firstArg.type === 'Literal') {
                    const literalValue = node.arguments[0].raw;

                    // the method is an event listener or emitter and is listing/raising a string as event
                    if (literalValue.startsWith("'") && literalValue.endsWith("'")) {
                        reportObject.events.totalOfStringEvents++;
                    }

                    if (firstArg && firstArg.value === 'uncaughtException') {
                        reportObject.events.numberOfEventUncaughtException++;
                    }

                    if (firstArg && firstArg.value === 'unhandledRejection') {
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

function containsSubstring(array, item) {
    let contains = false;

    if (item === 'e') {
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