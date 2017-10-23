function getNumberOfLines(node) {
    if (node.block || node.body) {

        const isBlockStatement = node.type === 'BlockStatement';
        const isTryStatement = node.type === 'TryStatement';

        let nodeBody;
        let numberOfLines = 0;

        if (isBlockStatement) {
            nodeBody = node.body;
            numberOfLines = 0;
        } else if (isTryStatement) {
            nodeBody = node.block.body;
            numberOfLines = 1;
        } else {
            nodeBody = node.body.body;
            numberOfLines = 1;
        }
        if(nodeBody) {
            nodeBody.forEach(function (statement) {
                numberOfLines += getNumberOfLines(statement);
            });
        }
        return numberOfLines;
    }
    return 1;
}

function getNodeTypes(functionDeclaration, type) {

    let nodeTypes = [];
    traverse(functionDeclaration, function (node) {
        if (node.type === type) {
            nodeTypes.push(node);
        }
    });

    return nodeTypes;
}

function traverse(obj, fn) {
    for (let key in obj) {
        if (obj[key] !== null && fn(obj[key]) === false) {
            return false;
        }
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            if (traverse(obj[key], fn) === false) {
                return false;
            }
        }
    }
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
    getNumberOfLines: getNumberOfLines,
    getNodeTypes: getNodeTypes
};