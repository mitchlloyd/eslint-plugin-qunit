/**
 * @fileoverview Require the use of `expect` when using assert inside of a
 * block or function.
 * @author Mitch Lloyd
 */
"use strict";

var assert = require("assert"),
    utils = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var blockDepth = 0,
        testStack = [],
        expectUsed = false,
        ERROR_MESSAGE = "Should use expect() when using an assertion that might not be called.";

    function getAssertContext() {
        assert.ok(testStack.length);
        var currentTest = testStack[testStack.length - 1];
        return utils.getAssertContextNameForTest(currentTest.arguments);
    }

    function isExpectCall(callee) {
        return callee.property && callee.property.name === "expect";
    }

    return {
        "CallExpression": function (node) {
            if (utils.isTest(node.callee)) {
                testStack.push(node);
            } else if (blockDepth === 1 && isExpectCall(node.callee)) {
                expectUsed = true;
            } else if (blockDepth > 1 &&
                       !expectUsed &&
                       utils.isAssertion(node.callee, getAssertContext())) {
                context.report({ node: node, message: ERROR_MESSAGE });
            }
        },

        "CallExpression:exit": function (node) {
            /* istanbul ignore else */
            if (utils.isTest(node.callee)) {
                testStack.pop();
            }
        },

        "BlockStatement": function () {
            /* istanbul ignore else */
            if (testStack.length) {
                blockDepth++;
            }
        },

        "BlockStatement:exit": function () {
            /* istanbul ignore else */
            if (testStack.length) {
                blockDepth--;
            }
        }
    };
};
