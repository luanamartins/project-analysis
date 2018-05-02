function isWindowOnError(node, reportObject) {
    if (node && node.type === 'AssignmentExpression') {
        const leftSide = node.left;
        if (leftSide.object && leftSide.object.name === 'window' &&
            leftSide.property && leftSide.property.name === 'onerror') {
            reportObject.numberOfWindowOnError++;
        }
    }
}

module.exports = {
    isWindowOnError
};
