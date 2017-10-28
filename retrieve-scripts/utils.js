var sloc  = require('sloc');
var fs  = require('fs');

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

function getGeneralStats(fileContents) {
    return sloc(fileContents, "js");
}

module.exports = {
    getNumberOfLines: getNumberOfLines,
    getNodeTypes: getNodeTypes,
    getGeneralStats: getGeneralStats
};
