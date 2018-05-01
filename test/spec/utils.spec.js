require('dotenv').load();
const testCase = require('nodeunit').testCase;
const projectPath = process.env.RETRIEVE_SCRIPTS_ROOT_PATH;
const utilsModule = require(projectPath + '/utils');

module.exports = testCase({

    "TC01": function (test) {
        const args = [{type: 'Identifier', name: 'error'}];
        const actual = utilsModule.getIdentifiersNames(args);
        const expected = ['error'];
        test.deepEqual(actual, expected);
        test.done();
    },

    "TC02": function (test) {
        const actual = utilsModule.hasAnErrorArgument(['argName1', 'argName2']);
        test.equal(actual, false);
        test.done();
    },

    "TC03": function (test) {
        const actual = utilsModule.hasAnErrorArgument(['argName1', 'error']);
        test.equal(actual, true);
        test.done();
    },

    "TC04": function (test) {
        const body = {
            "type": "MemberExpression",
            "computed": false,
            "object": {
                "type": "Identifier",
                "name": "e"
            },
            "property": {
                "type": "Identifier",
                "name": "m"
            }
        };
        const args = ["e"];
        const actual = utilsModule.useAnyArguments(body, args);
        test.ok(actual);
        test.done();
    },

    "TC05": function (test) {
        const body = {
            "type": "MemberExpression",
            "computed": false,
            "object": {
                "type": "Identifier",
                "name": "e"
            },
            "property": {
                "type": "Identifier",
                "name": "m"
            }
        };
        const args = ["error"];
        const actual = utilsModule.useAnyArguments(body, args);
        test.equal(actual, false);
        test.done();
    },


    "TC06": function (test) {
        const body = {
            "type": "CallExpression",
            "callee": {
                "type": "Identifier",
                "name": "f"
            },
            "arguments": [
                {
                    "type": "Identifier",
                    "name": "e"
                }
            ]
        };
        const args = ["e"];
        const actual = utilsModule.useAnyArguments(body, args);
        test.ok(actual);
        test.done();
    }

});