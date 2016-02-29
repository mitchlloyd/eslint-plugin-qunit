/**
 * @fileoverview Require the use of `expect` when using assert inside of a
 * block or function.
 * @author Mitch Lloyd
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/use-expect"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();

ruleTester.run("use-expect", rule, {

    valid: [
        // assert at top of test context is ok
        "test('name', function(assert) { assert.ok(true) });",

        // assert with expect at the top of test context is ok
        "test('name', function(assert) { assert.expect(0); if (false) { assert.ok(false) } });"
    ],

    invalid: [
        // Basic case with assert in loop block
        {
            code: "test('name', function(assert) { while (false) { assert.ok(true) } });",
            errors: [{
                message: "Should use expect() when using an assertion that might not be called.",
                type: "CallExpression"
            }]
        },

        // Basic case with assert used in callback
        {
            code: "test('name', function(assert) { maybe(function() { assert.ok(true) }); });",
            errors: [{
                message: "Should use expect() when using an assertion that might not be called.",
                type: "CallExpression"
            }]
        },

        // Basic case with assert in function expression
        {
            code: "test('name', function(assert) { var maybe = function() { assert.ok(true) }; });",
            errors: [{
                message: "Should use expect() when using an assertion that might not be called.",
                type: "CallExpression"
            }]
        },

        // `expect` does not count when not used inside of a block.
        {
            code: "test('name', function(assert) { function name() { assert.expect(0); assert.ok(true) } });",
            errors: [{
                message: "Should use expect() when using an assertion that might not be called.",
                type: "CallExpression"
            }]
        },

        // Assert in outter test context and nested in a block
        {
            code: "test('name', function(assert) { assert.ok(true); if (true) { assert.ok(true); } });",
            errors: [{
                message: "Should use expect() when using an assertion that might not be called.",
                type: "CallExpression"
            }]
        },

        // Deeply nested
        {
            code: "test('name', function(assert) { if (true) { if (true) { assert.ok(true); } } });",
            errors: [{
                message: "Should use expect() when using an assertion that might not be called.",
                type: "CallExpression"
            }]
        }
    ]

});
