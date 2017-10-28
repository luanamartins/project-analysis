var sloc  = require('sloc');
var fs  = require('fs');

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
    getNodeTypes: getNodeTypes,
    getGeneralStats: getGeneralStats
};
