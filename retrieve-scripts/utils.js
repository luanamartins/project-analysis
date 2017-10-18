function getNumberOfLines(node) {
    if (node.body) {
        const isBlockStatement = node.type === 'BlockStatement';
        const nodeBody = isBlockStatement ? node.body : node.body.body;
        let numberOfLines = isBlockStatement ? 0 : 1;
        nodeBody.forEach(function (statement) {
            numberOfLines += getNumberOfLines(statement);
        });
        return numberOfLines;
    }
    return 1;
}

function getNumberOfLinesByBody(node) {

    if (node.body) {
        return 1 + getNumberOfLinesByBody(node.body);
    }
    return 1;
}

function getNumberOfLinesByLoc(node) {
    const start = node.loc.start.line;
    const end = node.loc.end.line;
    return (end - start);
}

// const callbackFunction = node.arguments[0];
// const callbackFunctionBodyLoc = callbackFunction.body.loc;
// const start = callbackFunctionBodyLoc.start.line;
// const end = callbackFunctionBodyLoc.end.line;
// reportObject.promise.numberOfPromiseCatchesLines += (end - start);

module.exports = {
    getNumberOfLines: getNumberOfLines
};