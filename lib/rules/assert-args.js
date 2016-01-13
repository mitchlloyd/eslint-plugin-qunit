/**
 * @fileoverview Check the number of arguments to QUnit's assertion functions.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var assert = require("assert"),
    utils = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var testStack = [],
        sourceCode = context.getSourceCode(),
        MESSAGE = "Unexpected call to {{callee}} with {{argCount}} arguments.",
        MESSAGE_NO_ASSERT_MESSAGE = "Unexpected call to {{callee}} with {{argCount}} arguments and no error message.";

    function checkAssertArity (callExpressionNode) {
        var allowedArities = utils.getAllowedArities(callExpressionNode.callee, getAssertContext()),
            assertArgs = callExpressionNode.arguments,
            lastArg = assertArgs[assertArgs.length - 1],
            mayHaveMessage = lastArg && lastArg.type === "Literal" && typeof lastArg.value === "string";

        if (mayHaveMessage && allowedArities.indexOf(assertArgs.length - 1) !== -1) {
            return;
        } else if (allowedArities.indexOf(assertArgs.length) !== -1) {
            return;
        }

        context.report({
            node: callExpressionNode,
            message: mayHaveMessage ? MESSAGE : MESSAGE_NO_ASSERT_MESSAGE,
            data: {
                callee: sourceCode.getText(callExpressionNode.callee),
                argCount: assertArgs.length
            }
        });
    }

    function getAssertContext () {
        assert.ok(testStack.length);

        return testStack[testStack.length - 1].assertContextVar;
    }

    return {
        "CallExpression": function (node) {
            if (utils.isTest(node.callee)) {
                testStack.push({
                    assertContextVar: utils.getAssertContextNameForTest(node.arguments)
                });
            } else if (utils.isAssertion(node.callee, getAssertContext())) {
                checkAssertArity(node);
            }
        },

        "CallExpression:exit": function (node) {
            if (utils.isTest(node.callee)) {
                testStack.pop();
            }
        }
    };
};