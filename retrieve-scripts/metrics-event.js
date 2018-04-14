const utils = require('./utils');

function handleAnalysis(node, reportObject) {

    const eventListeningMethods = ['on', 'once'];
    const eventRaisingMethods = ['emit'];

    if (node.type === 'CallExpression') {
        if (node.callee.property) {

            let methodName = node.callee.property.name;
            const numberOfArguments = node.arguments.length;
            const firstArgObject = node.arguments[0];
            const isFirstArgErrorHandling = firstArgObject &&
            firstArgObject.value ? utils.isAnErrorArgument(firstArgObject.value) : false;

            if (numberOfArguments >= 2 && eventListeningMethods.includes(methodName)) {

                const errorHandlingFunction = node.arguments[1];

                if (methodName === 'on' && isFirstArgErrorHandling) {

                    reportObject.eventsNumberOfEventMethodsOn++;
                    if (errorHandlingFunction) {
                        reportObject.eventsNumberOfEventOnLines += utils.getNumberOfLines(errorHandlingFunction);

                        const location = errorHandlingFunction.loc;
                        reportObject.eventsNumberOfEventOnLinesStart.push(location.start.line);
                        reportObject.eventsNumberOfEventOnLinesEnd.push(location.end.line);
                    }

                } else if (methodName === 'once' && isFirstArgErrorHandling) {

                    reportObject.eventsNumberOfEventMethodsOnce++;
                    if (errorHandlingFunction) {
                        reportObject.eventsNumberOfEventOnceLines += utils.getNumberOfLines(errorHandlingFunction);

                        const location = errorHandlingFunction.loc;
                        reportObject.eventsNumberOfEventOnceLinesStart.push(location.start.line);
                        reportObject.eventsNumberOfEventOnceLinesEnd.push(location.end.line);
                    }
                }
            }

            if (numberOfArguments >= 2 && eventRaisingMethods.includes(methodName)) {

                const errorHandlingFunction = node.arguments[1];

                if (methodName === 'emit' && isFirstArgErrorHandling) {
                    reportObject.eventsNumberOfEventMethodsEmit++;
                    if (errorHandlingFunction) {
                        reportObject.eventsNumberOfEventEmitLines += utils.getNumberOfLines(errorHandlingFunction);

                        const location = errorHandlingFunction.loc;
                        reportObject.eventsNumberOfEventEmitLinesStart.push(location.start.line);
                        reportObject.eventsNumberOfEventEmitLinesEnd.push(location.end.line);

                    }
                }
            }

            if (numberOfArguments > 0 && (eventListeningMethods.includes(methodName) || eventRaisingMethods.includes(methodName))) {
                const typeOfFirstArg = typeof(firstArgObject.value);
                if (firstArgObject.type === 'Literal') {
                    const literalValue = node.arguments[0].raw;

                    // the method is an event listener or emitter and is listing/raising a string as event
                    if (utils.isString(literalValue)) {
                        reportObject.eventsTotalOfStringEvents++;
                    }

                    if (firstArgObject && firstArgObject.value === 'uncaughtException') {
                        reportObject.eventsNumberOfEventUncaughtException++;
                    }

                    if (firstArgObject && firstArgObject.value === 'unhandledRejection') {
                        reportObject.eventsNumberOfEventUnhandledRejection++;
                    }
                }

                if (typeOfFirstArg !== 'string') {
                    reportObject.eventsTotalOfEventsExceptStringType++;
                }
            }
        }
    }
}

module.exports = {
    handleAnalysis
};