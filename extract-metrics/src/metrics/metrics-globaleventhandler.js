const CONFIG = require("../../config");
const utils = require(CONFIG["srcPath"] + 'utils');

function handleAnalysis(node, reportObject) {

    if (node && node.type === 'AssignmentExpression') {
        const leftSideObject = node.left.object;
        const leftSideProperty = node.left.property;

        if (leftSideObject && leftSideProperty && leftSideProperty.name === 'onerror') {
            // window.onerror
            if (leftSideObject.name === 'window') {
                reportObject.numberOfWindowOnError++;
                const rightSide = node.right;
                if (rightSide && rightSide.body) {
                    const rightSideBlockStatement = rightSide.body;
                    const numberOfLines = utils.getNumberOfLines(rightSideBlockStatement);
                    reportObject.numberOfWindowOnErrorLines += numberOfLines;
                    const errors = utils.getAllErrorArgs(utils.getIdentifiersNames(rightSide.params));

                    // empty handler
                    if (utils.isEmptyHandler(rightSideBlockStatement, errors, numberOfLines)) {
                        reportObject.numberOfWindowOnErrorEmptyHandler++;
                    }

                    if (numberOfLines === 1) {
                        // Handler has only one statement
                        reportObject.numberOfWindowOnErrorUniqueStatement++;

                        if (utils.isConsoleStatement(rightSideBlockStatement.body[0])) {
                            // Handler's unique statement is console.log
                            reportObject.numberOfWindowOnErrorUniqueConsole++;
                        }
                    }
                }
            }

            // element.onerror
            if (leftSideObject.name === 'element') {
                reportObject.numberOfElementOnError++;

                const functionRightSide = node.right;
                if (functionRightSide && functionRightSide.body) {
                    const rightSideBlockStatement = functionRightSide.body;
                    const numberOfLines = utils.getNumberOfLines(rightSideBlockStatement);
                    reportObject.numberOfElementOnErrorLines += numberOfLines;
                    const errors = utils.getAllErrorArgs(utils.getIdentifiersNames(functionRightSide.params));

                    // empty handler
                    if (utils.isEmptyHandler(rightSideBlockStatement, errors, numberOfLines)) {
                        reportObject.numberOfElementOnErrorEmptyHandler++;
                    }

                    if (numberOfLines === 1) {
                        // Handler has only one statement
                        reportObject.numberOfElementOnErrorUniqueStatement++;

                        if (utils.isConsoleStatement(rightSideBlockStatement.body[0])) {
                            // Handler's unique statement is console.log
                            reportObject.numberOfElementOnErrorUniqueConsole++;
                        }
                    }
                }
            }
        }
    }

    // window.addEventListener('error')
    if (node.type === 'CallExpression' && node.callee.object && node.callee.property) {
        const objectName = node.callee.object.name;
        const propertyName = node.callee.property.name;
        const firstArg = node.arguments[0];

        if (objectName === 'window' && propertyName === 'addEventListener' &&
            firstArg && firstArg.value === 'error') {
            reportObject.numberOfWindowAddEventListener++;

            const arguments = node.arguments;
            const functionHandler = arguments[1];
            if (functionHandler && functionHandler.type === 'FunctionExpression') {

                const functionBody = functionHandler.body;
                const args = utils.getAllErrorArgs(utils.getIdentifiersNames(functionHandler.params));
                const numberOfLines = utils.getNumberOfLines(functionBody);
                reportObject.numberOfWindowAddEventListenerLines += numberOfLines;

                if(utils.isEmptyHandler(functionBody, args, numberOfLines)) {
                    reportObject.numberOfWindowAddEventListenerEmptyHandler++;
                }

                if(numberOfLines === 1) {
                    reportObject.numberOfWindowAddEventListenerUniqueStatement++;
                    const body = functionBody.body[0];
                    if(utils.isConsoleStatement(body)) {
                        reportObject.numberOfWindowAddEventListenerUniqueConsole++;
                    }
                }
            }
        }
    }
}

module.exports = {
    handleAnalysis
};
