/**
 * @fileoverview Utility functions used by one or more rules.
 * @author Kevin Partington
 */
"use strict";

var SUPPORTED_IDENTIFIERS = ["test", "asyncTest"];

var ASSERTION_METADATA = {
    deepEqual: {
        allowedArities: [2],
        compareActualFirst: true
    },
    equal: {
        allowedArities: [2],
        compareActualFirst: true
    },
    notDeepEqual: {
        allowedArities: [2],
        compareActualFirst: true
    },
    notEqual: {
        allowedArities: [2],
        compareActualFirst: true
    },
    notOk: {
        allowedArities: [1]
    },
    notPropEqual: {
        allowedArities: [2],
        compareActualFirst: true
    },
    notStrictEqual: {
        allowedArities: [2],
        compareActualFirst: true
    },
    ok: {
        allowedArities: [1]
    },
    propEqual: {
        allowedArities: [2],
        compareActualFirst: true
    },
    strictEqual: {
        allowedArities: [2],
        compareActualFirst: true
    },
    raises: {
        allowedArities: [1, 2]
    },
    throws: {
        allowedArities: [1, 2]
    }
};

function getAssertionMetadata(calleeNode, assertVar) {
    if (calleeNode.type === "MemberExpression") {
        return calleeNode.object &&
            calleeNode.object.name === assertVar &&
            calleeNode.property &&
            Object.hasOwnProperty.call(ASSERTION_METADATA, calleeNode.property.name) &&
            ASSERTION_METADATA[calleeNode.property.name];
    } else if (calleeNode.type === "Identifier") {
        return Object.hasOwnProperty.call(ASSERTION_METADATA, calleeNode.name) &&
            ASSERTION_METADATA[calleeNode.name];
    }

    return null;
}

exports.isAsyncCallExpression = function (callExpressionNode, assertVar) {
    if (!assertVar) {
        assertVar = "assert";
    }

    return callExpressionNode &&
        callExpressionNode.type === "CallExpression" &&
        callExpressionNode.callee.type === "MemberExpression" &&
        callExpressionNode.callee.object.type === "Identifier" &&
        callExpressionNode.callee.object.name === assertVar &&
        callExpressionNode.callee.property.type === "Identifier" &&
        callExpressionNode.callee.property.name === "async";
};

exports.isStop = function (calleeNode) {
    var result = false;

    /* istanbul ignore else: will correctly return false */
    if (calleeNode.type === "Identifier") {
        result = calleeNode.name === "stop";
    } else if (calleeNode.type === "MemberExpression") {
        result = calleeNode.object.type === "Identifier" &&
            calleeNode.object.name === "QUnit" &&
            calleeNode.property.type === "Identifier" &&
            calleeNode.property.name === "stop";
    }

    return result;
};

exports.isStart = function (calleeNode) {
    var result = false;

    /* istanbul ignore else: will correctly return false */
    if (calleeNode.type === "Identifier") {
        result = calleeNode.name === "start";
    } else if (calleeNode.type === "MemberExpression") {
        result = calleeNode.object.type === "Identifier" &&
            calleeNode.object.name === "QUnit" &&
            calleeNode.property.type === "Identifier" &&
            calleeNode.property.name === "start";
    }

    return result;
};

exports.isTest = function (calleeNode) {
    var result = false;

    /* istanbul ignore else: will correctly return false */
    if (calleeNode.type === "Identifier") {
        result = SUPPORTED_IDENTIFIERS.indexOf(calleeNode.name) !== -1;
    } else if (calleeNode.type === "MemberExpression") {
        result = calleeNode.object.type === "Identifier" &&
            calleeNode.object.name === "QUnit" &&
            calleeNode.property.type === "Identifier" &&
            SUPPORTED_IDENTIFIERS.indexOf(calleeNode.property.name) !== -1;
    }

    return result;
};

exports.isAsyncTest = function (calleeNode) {
    var result = false;

    /* istanbul ignore else: will correctly return false */
    if (calleeNode.type === "Identifier") {
        result = calleeNode.name === "asyncTest";
    } else if (calleeNode.type === "MemberExpression") {
        result = calleeNode.object.type === "Identifier" &&
            calleeNode.object.name === "QUnit" &&
            calleeNode.property.type === "Identifier" &&
            calleeNode.property.name === "asyncTest";
    }

    return result;
};

exports.getAssertContextNameForTest = function (argumentsNodes) {
    var result;

    var functionExpr = argumentsNodes.filter(function (argNode) {
        return argNode.type === "FunctionExpression";
    })[0];

    if (functionExpr && functionExpr.params && functionExpr.params.length) {
        result = functionExpr.params[0].name;
    }

    return result;
};

exports.isAssertion = function (calleeNode, assertVar) {
    return !!getAssertionMetadata(calleeNode, assertVar);
};

exports.getAllowedArities = function (calleeNode, assertVar) {
    var assertionMetadata = getAssertionMetadata(calleeNode, assertVar);

    return assertionMetadata && assertionMetadata.allowedArities || /* istanbul ignore next */ [];
};

exports.isComparativeAssertion = function (calleeNode, assertVar) {
    var assertionMetadata = getAssertionMetadata(calleeNode, assertVar);

    return Object.hasOwnProperty.call(assertionMetadata, "compareActualFirst");
};

exports.shouldCompareActualFirst = function (calleeNode, assertVar) {
    var assertionMetadata = getAssertionMetadata(calleeNode, assertVar);

    return assertionMetadata && assertionMetadata.compareActualFirst;
};
