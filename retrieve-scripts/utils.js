const sloc = require('sloc');
const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');

function getNumberOfLines(node) {
    if (node && node.loc && node.loc.start && node.loc.end) {
        const lines = node.loc.end.line - node.loc.start.line;
        return (lines === 0)? 1 : lines;
    } else {
        return 0;
    }
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

function listPropertiesOf(object) {
    let listOfProperties = [];
    for (let key in object) {
        // if (typeof (object[key]) === 'object' && object[key] !== null) {
        //     listOfProperties = listOfProperties.concat(listPropertiesOf(object[key]));
        // } else {
        //     listOfProperties.push(key);
        // }
        if (key.indexOf("LinesStart") < 0 && key.indexOf("LinesEnd") < 0) {
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

function calculate(startList, endList) {
    const size = startList.length;
    let lines = 0;

    if (startList.length === 0 || endList.length === 0) {
        return lines;
    }

    let i = 0;
    let startValues = [startList[i]];

    let endValues = [endList[i]];
    for (let i = 1; i < size; i++) {
        if (notIntersectAny(startValues, endValues, startList[i], endList[i])) {
            startValues.push(startList[i]);
            endValues.push(endList[i]);
        }

    }

    // console.log(startValues);
    // console.log(endValues);
    startValues.forEach(function (item, index) {
        lines += endValues[index] - startValues[index];
    });
    return lines;
}

function notIntersectAny(startList, endList, start2, end2) {
    const list = [];
    startList.forEach(function (item, index) {
        if (startList[index] < start2 && endList[index] > end2) {
            list.push(true);
        }
    });
    return list.length === 0;
}

function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

console.log(calculate([17, 21], [19, 26]));
// console.log(calculate([2, 4], [12, 9]));

module.exports = {
    getNumberOfLinesOld: getNumberOfLinesOld,
    traverse: traverse,
    getNumberOfLines: getNumberOfLines,
    getNodeTypes: getNodeTypes,
    getGeneralStats: getGeneralStats,
    getAllProperties: getAllProperties,
    listPropertiesOf: listPropertiesOf,
    createRepoObject: createRepoObject,
    calculate: calculate,
    guid: guid
};
