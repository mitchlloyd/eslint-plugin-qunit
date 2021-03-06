/**
 * @fileoverview Check the location of literals in arguments to QUnit's assertion functions.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/literal-compare-order"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function wrap(assertionCode, testName) {
    testName = testName || "Name";
    return "QUnit.test('" +
        testName +
        "', function (assert) { " +
        assertionCode +
        " });";
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();

ruleTester.run("literal-compare-order", rule, {
    valid: [
        // equal
        wrap("equal(variable, 'Literal');"),
        wrap("equal(variable, 'Literal', 'Message');"),
        wrap("assert.equal(variable, 'Literal');"),
        wrap("assert.equal(variable, 'Literal', 'Message');"),

        // strictEqual
        wrap("strictEqual(variable, 'Literal');"),
        wrap("strictEqual(variable, 'Literal', 'Message');"),
        wrap("assert.strictEqual(variable, 'Literal');"),
        wrap("assert.strictEqual(variable, 'Literal', 'Message');"),

        // deepEqual
        wrap("deepEqual(variable, 'Literal');"),
        wrap("deepEqual(variable, 'Literal', 'Message');"),
        wrap("assert.deepEqual(variable, 'Literal');"),
        wrap("assert.deepEqual(variable, 'Literal', 'Message');"),

        // propEqual
        wrap("propEqual(variable, 'Literal');"),
        wrap("propEqual(variable, 'Literal', 'Message');"),
        wrap("assert.propEqual(variable, 'Literal');"),
        wrap("assert.propEqual(variable, 'Literal', 'Message');"),

        // notEqual
        wrap("notEqual(variable, 'Literal');"),
        wrap("notEqual(variable, 'Literal', 'Message');"),
        wrap("assert.notEqual(variable, 'Literal');"),
        wrap("assert.notEqual(variable, 'Literal', 'Message');"),

        // notStrictEqual
        wrap("notStrictEqual(variable, 'Literal');"),
        wrap("notStrictEqual(variable, 'Literal', 'Message');"),
        wrap("assert.notStrictEqual(variable, 'Literal');"),
        wrap("assert.notStrictEqual(variable, 'Literal', 'Message');"),

        // notDeepEqual
        wrap("notDeepEqual(variable, 'Literal');"),
        wrap("notDeepEqual(variable, 'Literal', 'Message');"),
        wrap("assert.notDeepEqual(variable, 'Literal');"),
        wrap("assert.notDeepEqual(variable, 'Literal', 'Message');"),

        // notPropEqual
        wrap("notPropEqual(variable, 'Literal');"),
        wrap("notPropEqual(variable, 'Literal', 'Message');"),
        wrap("assert.notPropEqual(variable, 'Literal');"),
        wrap("assert.notPropEqual(variable, 'Literal', 'Message');")
    ],
    invalid: [
        // equal
        {
            code: wrap("equal('Literal', variable);"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("equal('Literal', variable, 'message');"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("assert.equal('Literal', variable);"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("assert.equal('Literal', variable, 'message');"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },

        // strictEqual
        {
            code: wrap("strictEqual('Literal', variable);"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("strictEqual('Literal', variable, 'message');"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("assert.strictEqual('Literal', variable);"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("assert.strictEqual('Literal', variable, 'message');"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },

        // deepEqual
        {
            code: wrap("deepEqual('Literal', variable);"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("deepEqual('Literal', variable, 'message');"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("assert.deepEqual('Literal', variable);"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("assert.deepEqual('Literal', variable, 'message');"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },

        // propEqual
        {
            code: wrap("propEqual('Literal', variable);"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("propEqual('Literal', variable, 'message');"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("assert.propEqual('Literal', variable);"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("assert.propEqual('Literal', variable, 'message');"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },

        // notEqual
        {
            code: wrap("notEqual('Literal', variable);"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("notEqual('Literal', variable, 'message');"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("assert.notEqual('Literal', variable);"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("assert.notEqual('Literal', variable, 'message');"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },

        // notStrictEqual
        {
            code: wrap("notStrictEqual('Literal', variable);"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("notStrictEqual('Literal', variable, 'message');"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("assert.notStrictEqual('Literal', variable);"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("assert.notStrictEqual('Literal', variable, 'message');"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },

        // notDeepEqual
        {
            code: wrap("notDeepEqual('Literal', variable);"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("notDeepEqual('Literal', variable, 'message');"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("assert.notDeepEqual('Literal', variable);"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("assert.notDeepEqual('Literal', variable, 'message');"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },

        // notPropEqual
        {
            code: wrap("notPropEqual('Literal', variable);"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("notPropEqual('Literal', variable, 'message');"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("assert.notPropEqual('Literal', variable);"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        },
        {
            code: wrap("assert.notPropEqual('Literal', variable, 'message');"),
            errors: ["Expected value 'Literal' should be specified after actual value variable."]
        }
    ]
});
