const sloc = require('sloc');
const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');

function getNumberOfLines(node) {
    if (node && node.loc && node.loc.start && node.loc.end) {
        return node.loc.end.line - node.loc.start.line;
    } else {
        return 0;
    }
}

function listPropertiesOf(object) {
    let listOfProperties = [];
    for (let key in object) {
        if (typeof (object[key]) === 'object' && object[key] !== null) {
            listOfProperties = listOfProperties.concat(listPropertiesOf(object[key]));
        } else {
            listOfProperties.push(key);
        }
    }

    return listOfProperties;
}

function getNumberOfLinesOld(node) {
    let numberOfLines = 1;

    if (!node) {
        return 0;
    }

    if (node.block || node.body) {
        const isBlockStatement = node.type === 'BlockStatement' || node.type === 'Program';
        const isTryStatement = node.type === 'TryStatement';

        let nodeBody;
        numberOfLines = 0;

        if (isBlockStatement) {
            nodeBody = node.body;
            numberOfLines = 0;
        } else if (isTryStatement) {
            nodeBody = node.block.body;
            const handlerNumberOfLines = getNumberOfLinesOld(node.handler);
            const finalizerNumberOfLines = getNumberOfLinesOld(node.finalizer);
            numberOfLines = 1 + handlerNumberOfLines + finalizerNumberOfLines;
        } else {
            nodeBody = node.body.body;
            numberOfLines = 1;
        }

        if (nodeBody) {
            nodeBody.forEach(function (statement) {
                numberOfLines += getNumberOfLinesOld(statement);
            });
        }
    }

    return numberOfLines;
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

function getAllProperties(object) {
    let keys = [];
    for (var property in object) {
        if (object.hasOwnProperty(property)) {
            if (typeof(object[property]) === 'object' && object[property] !== null) {
                const propsFromProperty = getAllProperties(object[property]);
                keys = keys.concat(propsFromProperty);
            } else {
                keys.push(property);
            }
        }
    }

    return keys;
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

function createRepoObject(projectPath) {
    const jsonFilepath = path.join(projectPath, 'report-object.json');
    return jsonfile.readFileSync(jsonFilepath);
}

module.exports = {
    getNumberOfLinesOld: getNumberOfLinesOld,
    getNumberOfLines: getNumberOfLines,
    getNodeTypes: getNodeTypes,
    getGeneralStats: getGeneralStats,
    getAllProperties: getAllProperties,
    listPropertiesOf: listPropertiesOf,
    createRepoObject: createRepoObject
};
