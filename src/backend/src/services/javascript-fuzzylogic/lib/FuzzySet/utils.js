"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMembershipValue = exports.getPlottableValues = exports.indexByXValue = exports.union = exports.intersection = exports.complement = exports.isConvex = exports.isNormal = exports.height = exports.support = exports.alphacut = void 0;
/*
 * An α-cut of a fuzzy set, A, is a crisp set, Aα, that contains all elements of A,
 * with membership greater than or equal to the specified value of α.
 * A *strong* α-cut is the same, but only those values that have membership greater
 * than α, instead of those greater or equal.
 */
var alphacut = function (set, alpha, strong) {
    if (strong === void 0) { strong = false; }
    return set.values
        .filter(function (fuzzyValue) { return (strong ? fuzzyValue.membership > alpha : fuzzyValue.membership >= alpha); })
        .map(function (_a) {
        var value = _a.value;
        return value;
    });
};
exports.alphacut = alphacut;
/**
 * The support of a fuzzy set, A, is a strong α-cut of A, where α = 0.
 * Thus, the support of a fuzzy set is all non zero values of that set.
 */
var support = function (set) { return (0, exports.alphacut)(set, 0, true); };
exports.support = support;
/**
 * The height of a fuzzy set is the largest membership grade attained by any
 * element of that set.
 */
var height = function (set) {
    if (set.values.length === 0) {
        throw new Error('Cannot process, this set has no values');
    }
    return set.values.reduce(function (acc, _a) {
        var membership = _a.membership;
        return (membership > acc ? membership : acc);
    }, 0);
};
exports.height = height;
/**
 * A fuzzy set is said to be normalised if at least one its elements attains the
 * maximum possible membership grade (of 1).
 */
var isNormal = function (set) { return (0, exports.height)(set) === 1; };
exports.isNormal = isNormal;
/*
 * A set is convex if we cannot draw a line from two points on
 * the set that cross the set at any point.
 */
var isConvex = function (set) {
    throw new Error('Not yet implemented');
};
exports.isConvex = isConvex;
/*
 * The complement,of a fuzzy set is a fuzzy set in which the value of membership
 * for each member is (1 - μ) (where μ is the membership grade in the original set)
 */
var complement = function (set) {
    return set.values.map(function (_a) {
        var value = _a.value, membership = _a.membership;
        return ({
            value: value,
            membership: (1000 - membership * 1000) / 1000,
        });
    });
};
exports.complement = complement;
/**
 * The union of two fuzzy sets, A and B, is a new fuzzy set with all values
 * with the minimum membership value
 */
var intersection = function (setA, setB) {
    // Check both sets are of the same length
    if (setA.values.length !== setB.values.length) {
        throw new Error('Sets do not have the same length');
    }
    // Check both sets have matching x values
    if (JSON.stringify(setA.values.map(function (_a) {
        var value = _a.value;
        return value;
    })) !==
        JSON.stringify(setB.values.map(function (_a) {
            var value = _a.value;
            return value;
        }))) {
        throw new Error('Sets do not have matching x values (make sure minValue, maxValue and step are the same)');
    }
    var setAindexedByXValue = (0, exports.indexByXValue)(setA.values);
    var setBindexedByXValue = (0, exports.indexByXValue)(setB.values);
    return Object.keys(setAindexedByXValue).map(function (key) {
        var numericKey = parseInt(key, 10);
        return setAindexedByXValue[numericKey] < setBindexedByXValue[numericKey]
            ? { membership: setAindexedByXValue[numericKey], value: numericKey }
            : { membership: setBindexedByXValue[numericKey], value: numericKey };
    });
};
exports.intersection = intersection;
/**
 * The union of two fuzzy sets, A and B, is a new fuzzy set with all values
 * with the maximum membership value
 */
var union = function (setA, setB) {
    // Check both sets are of the same length
    if (setA.values.length !== setB.values.length) {
        throw new Error('Sets do not have the same length');
    }
    // Check both sets have matching x values
    if (JSON.stringify(setA.values.map(function (_a) {
        var value = _a.value;
        return value;
    })) !==
        JSON.stringify(setB.values.map(function (_a) {
            var value = _a.value;
            return value;
        }))) {
        throw new Error('Sets do not have matching x values (make sure minValue, maxValue and step are the same)');
    }
    var setAindexedByXValue = (0, exports.indexByXValue)(setA.values);
    var setBindexedByXValue = (0, exports.indexByXValue)(setB.values);
    return Object.keys(setAindexedByXValue).map(function (key) {
        var numericKey = parseInt(key, 10);
        return setAindexedByXValue[numericKey] > setBindexedByXValue[numericKey]
            ? { membership: setAindexedByXValue[numericKey], value: numericKey }
            : { membership: setBindexedByXValue[numericKey], value: numericKey };
    });
};
exports.union = union;
/**
 * Given a array of fuzzy values, return them as an object indexed by their `x` value
 */
var indexByXValue = function (values) {
    return values.reduce(function (acc, _a) {
        var _b;
        var value = _a.value, membership = _a.membership;
        return (__assign(__assign({}, acc), (_b = {}, _b[value] = membership, _b)));
    }, {});
};
exports.indexByXValue = indexByXValue;
/**
 * For a fuzzy set, return two arrays: the x values, and the membership values,
 * so that they can be plotted on a graph
 */
var getPlottableValues = function (set) {
    return set.values.reduce(function (acc, _a) {
        var membership = _a.membership, value = _a.value;
        return {
            xValues: __spreadArray(__spreadArray([], acc.xValues, true), [value], false),
            membershipValues: __spreadArray(__spreadArray([], acc.membershipValues, true), [membership], false),
        };
    }, {
        xValues: [],
        membershipValues: [],
    });
};
exports.getPlottableValues = getPlottableValues;
/**
 * For a given x value, find the membership value it possesses
 */
var getMembershipValue = function (set, xValue) { var _a; return (_a = set.values.find(function (_a) {
    var value = _a.value;
    return value === xValue;
})) === null || _a === void 0 ? void 0 : _a.membership; };
exports.getMembershipValue = getMembershipValue;
