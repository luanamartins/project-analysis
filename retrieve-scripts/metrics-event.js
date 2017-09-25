function handleAnalysis(node, reportObject) {
    
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
    }
}

module.exports = {
    handleAnalysis: handleAnalysis
};