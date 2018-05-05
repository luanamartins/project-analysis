const utils = require('./utils');

function handleAnalysis(node, reportObject) {

    if (node && node.type === 'AssignmentExpression') {
        const leftSideObject = node.left.object;
        const leftSideProperty = node.left.property;

        if (leftSideObject && leftSideProperty && leftSideProperty.name === 'onerror') {
            // window.onerror
            if (leftSideObject.name === 'window') {
                reportObject.numberOfWindowOnError++;
                if (node.right && node.right.body) {
                    const rightSideBlockStatement = node.right.body;
                    const numberOfLines = utils.getNumberOfLines(rightSideBlockStatement);
                    const errors = utils.getAllErrorArgs(utils.getIdentifiersNames(node.params));

                    // empty handler
                    if (utils.isEmptyHandler(rightSideBlockStatement, errors, numberOfLines)) {
                        reportObject.numberOfWindowOnErrorEmptyHandler++;
                    }

                    if(numberOfLines === 1) {
                        // Handler has only one statement
                        reportObject.numberOfWindowOnErrorUniqueStatement++;

                        if(utils.isConsoleStatement(rightSideBlockStatement.body[0])) {
                            // Handler's unique statement is console.log
                            reportObject.numberOfWindowOnErrorUniqueConsole++;
                        }
                    }
                }
            }

            // element.onerror
            if (leftSideObject.name === 'element') {
                reportObject.numberOfElementOnError++;
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
        }
    }
}

module.exports = {
    handleAnalysis
};
