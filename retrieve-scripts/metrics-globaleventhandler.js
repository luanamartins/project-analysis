function handleAnalysis(node, reportObject) {

    if (node && node.type === 'AssignmentExpression') {
        const leftSideObject = node.left.object;
        const leftSideProperty = node.left.property;

        if(leftSideObject && leftSideProperty && leftSideProperty.name === 'onerror') {
            // window.onerror
            if (leftSideObject.name === 'window') {
                reportObject.numberOfWindowOnError++;
            }

            // element.onerror
            if (leftSideObject.name === 'element') {
                reportObject.numberOfElementOnError++;
            }
        }
    }

    // window.addEventListener('error')
    if (node.type === 'CallExpression') {
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
