const assert = require("assert");
const CONFIG = require("../../config");

const utilsModule = require(CONFIG["srcPath"] + "utils");

describe("Utils tests", function() {
    it("assert01", function() {
        const args = [{type: 'Identifier', name: 'error'}];
        const actual = utilsModule.getIdentifiersNames(args);
        const expected = ['error'];
        assert.deepEqual(actual, expected);
    });

    it("assert02", function() {
        const actual = utilsModule.hasAnErrorArgument(['argName1', 'argName2']);
        assert.equal(actual, false);
    });

    it("assert03", function() {
         const actual = utilsModule.hasAnErrorArgument(['argName1', 'error']);
        assert.equal(actual, true);
    });

    it("assert04", function() {
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
        assert.ok(actual);
    });

    it("assert05", function() {
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
        assert.equal(actual, false);
    });

    it("assert06", function() {
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
        assert.ok(actual);
    });

});
