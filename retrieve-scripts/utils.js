const sloc = require('sloc');
const path = require('path');
const jsonfile = require('jsonfile');


function isAnErrorArgument(argument) {
    const keywords = ['error', 'exception', 'reason', 'reject', 'err'];
    return containsSubstring(keywords, argument);
}

function hasAnErrorArgument(array) {
    if (array) {
        return array.some((item) => isAnErrorArgument(item));
    }
    return false;
}

function getAllErrorArgs(args) {
    let result = [];
    if(args) {
        result = args.filter(arg => isAnErrorArgument(arg));
    }
    return result;
}

function containsAnyErrorArgument(errArgs, array) {
    if (errArgs && errArgs.length > 0 && array && array.length > 0) {
        return array.some((item) => errArgs.includes(item));
    }
    return false;
}

function isStrictMode(node) {
    if (node && node.type === 'ExpressionStatement' &&
        node.directive && node.directive === 'use strict') {
        return true;
    }
}

function getIdentifiersNames(args) {
    if (args) {
        if (Array.isArray(args)) {
            return args.filter(arg => arg.type === 'Identifier').map((arg) => {
                return arg.name
            });
        } else {
            return [args.name];
        }
    }

    return [];
}

function getStatementsByType(body, type) {
    const result = [];
    if (body) {
        traverse(body, function (node) {
            if (node.type === type) {
                result.push(node);
            }
        });
    }
    return result;
}

function containsSubstring(array, item) {
    let contains = false;

    if (item === 'e' || item === 'er' || item === 'err') {
        return true;
    }

    if (item && typeof(item) === 'string') {
        contains = array.some(function (arrayItem) {
            return item.toLowerCase().indexOf(arrayItem) >= 0;
        });
    }
    return contains;
}

function getNumberOfLines(node) {
    if (node && node.loc && node.loc.start && node.loc.end) {
        let lines = node.loc.end.line - node.loc.start.line;
        return (lines > 0) ? lines - 1 : 0;
    } else {
        return 0;
    }
}

function traverse(obj, fn) {
    for (const key in obj) {
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

function isString(literalValue) {
    const hasDoubleQuotes = literalValue.startsWith("\"") && literalValue.endsWith("\"");
    const hasSingleQuotes = literalValue.startsWith("'") && literalValue.endsWith("'");
    return hasDoubleQuotes || hasSingleQuotes;
}

function listPropertiesOf(object) {
    let listOfProperties = [];
    for (const key in object) {
        if (key.indexOf('LinesStart') < 0 && key.indexOf('LinesEnd') < 0) {
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

function useAnyArguments(body, args) {
    let hasErrorArgs = false;
    if (Array.isArray(args) && args.length > 0) {
        traverse(body, function (bodyFunctionNode) {
            if (!hasErrorArgs && typeof(bodyFunctionNode) === 'string' && args.includes(bodyFunctionNode)) {
                hasErrorArgs = true;
            }
        });
    }
    return hasErrorArgs;
}

function getAllProperties(object) {
    let keys = [];
    for (const property in object) {
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

function getGeneralStats(fileContents) {
    return sloc(fileContents, "js");
}

function createRepoObject(projectPath) {
    const jsonFilepath = path.join(projectPath, 'report-object.json');
    return jsonfile.readFileSync(jsonFilepath);
}

function calculateIntersections(startList, endList) {
    const startSize = startList.length;
    const endSize = endList.length;

    let result = 0;
    if (startSize === 0 || endSize === 0) {
        return result;
    } else if (startSize === 1 || endSize === 1) {
        result = endList[0] - startList[0];
        return (result === 0) ? result : result - 1;
    }

    let i = 0;
    let lines = 0;
    let startValues = [startList[i]];
    let endValues = [endList[i]];

    for (let i = 1; i < startSize; i++) {
        if (notIntersectAny(startValues, endValues, startList[i], endList[i])) {
            startValues.push(startList[i]);
            endValues.push(endList[i]);
        }
    }

    startValues.forEach(function (item, index) {
        lines += endValues[index] - startValues[index];
    });
    return lines;
}

function isEmptyHandler(body, args, numberOfLines) {
    return (numberOfLines === 0) ? true : !useAnyArguments(body, args);
}

function handleRethrowStatements(throwStatements, errorArguments) {
    let result = 0;

    if(!throwStatements) {
        return result;
    }

    throwStatements.forEach((throwStatement) => {
        const argument = getIdentifiersNames(throwStatement.argument);

        // Checks if the throw uses an error argument
        if (containsAnyErrorArgument(errorArguments, argument)) {
            result++;
        }

        // Checks if the throw wrap an error on Error object
        const throwStatementArg = throwStatement.argument;
        if (throwStatementArg && throwStatementArg.type === 'NewExpression') {
            if (throwStatementArg.callee && throwStatementArg.callee.name === 'Error') {
                const arguments = throwStatementArg.arguments;
                arguments.forEach((arg) => {
                    if (useAnyArguments(arg, errorArguments)) {
                        result++;
                    }
                });
            }
        }
    });

    return result;
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

function isConsoleStatement(statement) {
    if (statement.type === 'ExpressionStatement' && statement.expression.type === 'CallExpression') {
        const callee = statement.expression.callee;

        // This is necessary because some functions are not called by a object
        // or is a recursive function
        if (callee.object && callee.object.name === 'console') {
            return true;
        }
    }
    return false;
}

function isThrowStatement(statement) {
    if (statement.type === 'ThrowStatement') {
        return true;
    }
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

// console.log(calculateIntersections([17, 21], [19, 26]));
// console.log(calculateIntersections([2, 4], [12, 9]));

module.exports = {
    getNumberOfLinesOld,
    traverse,
    getNumberOfLines,
    getNodeTypes,
    getGeneralStats,
    getAllProperties,
    listPropertiesOf,
    createRepoObject,
    calculateIntersections,
    guid,
    isAnErrorArgument,
    isString,
    isConsoleStatement,
    isThrowStatement,
    containsAnyErrorArgument,
    getIdentifiersNames,
    hasAnErrorArgument,
    getStatementsByType,
    isStrictMode,
    useAnyArguments,
    isEmptyHandler,
    getAllErrorArgs,
    handleRethrowStatements
};
