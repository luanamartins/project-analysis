const sloc = require('sloc');
const path = require('path');
const jsonfile = require('jsonfile');

const CONFIG = require("../config");

function isAnErrorArgument(argument) {
    const keywords = ['error', 'exception', 'reason', 'reject', 'err'];
    return containsSubstring(keywords, argument);
}

function hasAnErrorArgument(array) {
    return array && array.some((item) => isAnErrorArgument(item));
}

function getAllErrorArgs(args) {
    let result = [];
    if (args) {
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
            return args.filter(arg => arg && arg.type === 'Identifier').map((arg) => {
                return arg.name;
            });
        } else {
            return [args.name];
        }
    }

    return [];
}

function isAlertCallExpression(statement) {
    return statement && statement.type === 'ExpressionStatement' && statement.expression.type === 'CallExpression' &&
        statement.expression.callee.name === 'alert';
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

function getPropertyFrom(array, property) {
    if (array) {
        const result = [];
        array.forEach(function(item) {
            if (item[property]) {
                result.push(item[property]);
            }
        });
        return result;
    }

    return [];
}

function hasLiteral(statements) {
    if (statements) {
        return statements.some(function(item) {
            return item.argument && item.argument.type === 'Literal' && item.argument.value !== null;
        });
    }
    return false;
}

function hasNull(statements) {
    if (statements) {
        return statements.some(function(item) {
            return item.argument && item.argument.type === 'Literal' && item.argument.value === null;
        });
    }
    return false;
}

function hasUndefined(statements) {
    if (statements) {
        return statements.some(function(item) {
            return item.argument && item.argument.type === 'Identifier' && item.argument.name === 'undefined';
        });
    }
    return false;
}

function hasAnyLiteral(array) {
    if (array) {
        return array.some(function(item) {
            return item.type === 'Literal' && item.value != null;
        });
    }
    return false;
}

function hasErrorObject(array) {
    if (array) {
        return array.some(function(item) {
            const arg = item.argument;
            return arg && arg.type === 'NewExpression' && arg.callee && arg.callee.name === 'Error';
        });
    }
    return false;
}

function numberOfLiterals(array) {
    if (array) {
        let result = 0;
        array.forEach(function(item) {
            if (item.argument && item.argument.type === 'Literal' && item.argument.value != null) {
                result++;
            }
        });
        return result;
    }

    return 0;
}

function numberOfErrorObjects(array) {
    if (array) {
        let result = 0;
        array.forEach(function(item) {
            const arg = item.argument;
            if (arg && arg.type === 'NewExpression' && arg.callee.name === 'Error') {
                result++;
            }
        });
        return result;
    }

    if (array) {
        traverse(array, function (node) {
            if (node.type === type) {
                nodeTypes.push(node);
            }
        });
    }

    return 0;
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

function isNotThrowingErrorArg(statements, errorArgs) {
    let result = 0;
    if (!statements || !errorArgs) {
        return 0;
    }

    statements.forEach((statement) => {
        const arg = statement.argument;
        if (!useAnyArguments(arg, errorArgs)) {
            result++;
        }
    });

    return result;
}

function getThrowPrimitiveTypes(throwStatements) {
    let result = 0;
    if(Array.isArray(throwStatements) && throwStatements.length > 0) {
        throwStatements.forEach(function(throwStatement) {
           const argument = throwStatement.argument;
           if(argument.type === 'Literal' || (argument.type === 'NewExpression' && argument.callee.name === 'RegExp')) {
               result++;
           }
        });
    }
    return result;
}


function isString(literalValue) {
    return typeof literalValue === 'string';
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

function trailLastSlash(str) {
    return str.endsWith('/')? str.slice(0, -1) : str;
}

function getEmptyRepoObject() {
    const jsonFilepath = path.join(CONFIG["srcPath"], 'report-object.json');
    return jsonfile.readFileSync(jsonFilepath);
}

function getMetricsOnFileObject() {
    const repoObject = getEmptyRepoObject();
    const metrics = listPropertiesOf(repoObject);
    const result = {};

    metrics.forEach((metric) => {
        result[metric] = [];
    });

    return result;
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

function isEventEmptyHandler(body, numberOfLines) {
    return (numberOfLines === 0);
}

function hasOneStatementAndIsBreak(breakStatements, numberOfLines) {
    return (breakStatements.length === 1 && numberOfLines === 1);
}

function getDirectoriesNameFrom(directory) {
    const { readdirSync, statSync } = require('fs');
    const { join } = require('path');

    const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory())

    return dirs(directory);
}

function reuseAnErrorStatements(statements, errorArguments) {
    let result = 0;

    if (!statements) {
        return result;
    }

    statements.forEach((statement) => {
        const argument = getIdentifiersNames([statement.argument]);

        // Checks if the throw uses an error argument
        if (containsAnyErrorArgument(errorArguments, argument)) {
            result++;
        }

        // Checks if the throw wrap an error on Error object
        const statementArg = statement.argument;
        if (statementArg && statementArg.type === 'NewExpression') {
            if (statementArg.callee && statementArg.callee.name === 'Error') {
                const arguments = statementArg.arguments;
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

        // This is necessary because some functions are not called by a object or is a recursive function
        return callee.object && callee.object.name === 'console';
    }
    return false;
}

function getNumberOfReturnUsingErrors(returnStatements, errors) {
    let result = 0;
    if (!returnStatements || !errors) {
        return 0;
    }

    returnStatements.forEach((statement) => {
        const returnArgument = statement.argument;
        if (useAnyArguments(returnArgument, errors)) {
            result++;
        }
    });

    return result;
}

function hasErrorReassignment(body, errors) {
    const assignments = getStatementsByType(body, 'AssignmentExpression');
    for (let i = 0; i < assignments.length; i++) {
        const left = assignments[i].left;
        if (left.type === 'Identifier' && isAnErrorArgument(left.name)) {
            return true;
        }
    }

    return false;
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
    getEmptyRepoObject,
    calculateIntersections,
    guid,
    isAnErrorArgument,
    isString,
    isConsoleStatement,
    containsAnyErrorArgument,
    getIdentifiersNames,
    hasAnErrorArgument,
    getStatementsByType,
    isStrictMode,
    useAnyArguments,
    isEmptyHandler,
    isEventEmptyHandler,
    getAllErrorArgs,
    reuseAnErrorStatements,
    getNumberOfReturnUsingErrors,
    hasOneStatementAndIsBreak,
    getThrowPrimitiveTypes,
    getDirectoriesNameFrom,
    trailLastSlash,
    hasLiteral,
    hasUndefined,
    hasNull,
    hasAnyLiteral,
    hasErrorObject,
    getPropertyFrom,
    numberOfLiterals,
    numberOfErrorObjects,
    isNotThrowingErrorArg,
    isAlertCallExpression,
    hasErrorReassignment,
    getMetricsOnFileObject
};
