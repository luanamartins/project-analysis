function handleAnalysis(node, reportObject) {

    let eventListeningMethods = ['on', 'once'];
    let eventRaisingMethods = ['emit'];
    
    if (node.type === 'CallExpression') {
        if (node.property) {
            const methodName = node.property.name;

            if (methodName === 'on') {
                reportObject.events.numberOfEventMethodsOn++;
            }

            if (methodName === 'emit') {
                reportObject.events.numberOfEventMethodsEmit++;
            }

            if (methodName === 'once') {
                reportObject.events.numberOfEventMethodsOnce++;
            }
            const firstArg = methodName.argument[0];

            if (firstArg.value === 'uncaughtException') {
                reportObject.events.numberOfEventUncaughtException++;
            }

            if (firstArg.value === 'unhandledRejection') {
                reportObject.events.numberOfEventUnhandledRejection++;
            }

        }


        if (node.callee.property) {
            let methodName = node.callee.property.name;
            if (eventListeningMethods.includes(methodName) || eventRaisingMethods.includes(methodName)) {
                const firstArgFromMethod = node.arguments[0];
                if (firstArgFromMethod.type === 'Literal') {
                    let literalValue = node.arguments[0].raw;

                    // the method is an event listener or emitter and is listing/raising a string as event
                    if (literalValue.startsWith("'") && literalValue.endsWith("'")) {
                        reportObject.events.totalOfStringEvents++;
                    }
                }
                reportObject.events.totalOfEventTypes++;
            }
        }

    }
}

module.exports = {
    handleAnalysis: handleAnalysis
};