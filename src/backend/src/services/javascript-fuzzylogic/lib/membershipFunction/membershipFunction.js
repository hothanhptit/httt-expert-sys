"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sigmoidalMembershipFunction = exports.gaussianMembershipFunction = exports.trapezoidalMembershipFunction = exports.triangularMembershipFunction = exports.generateMembershipValues = void 0;
var index_1 = require("../index");
/**
 * Given a particular membership function definition, generate all values for that
 * membership function between the range given, at each step interval
 */
function generateMembershipValues(mf) {
    var _a = mf.parameters, minValue = _a.minValue, maxValue = _a.maxValue, step = _a.step, rest = __rest(_a, ["minValue", "maxValue", "step"]);
    var values = [];
    var fn = function (x) {
        switch (mf.type) {
            case index_1.MembershipFunctionType.Triangular:
                return (0, exports.triangularMembershipFunction)(x, rest);
            case index_1.MembershipFunctionType.Trapezoidal:
                return (0, exports.trapezoidalMembershipFunction)(x, rest);
            case index_1.MembershipFunctionType.Gaussian:
                return (0, exports.gaussianMembershipFunction)(x, rest);
            case index_1.MembershipFunctionType.Sigmoidal:
                return (0, exports.sigmoidalMembershipFunction)(x, rest);
            default:
                throw new Error('Unexpected membership function type');
        }
    };
    for (var i = minValue; i <= maxValue; i += step) {
        values.push({
            value: i,
            membership: fn(i),
        });
    }
    return values;
}
exports.generateMembershipValues = generateMembershipValues;
/**
 * Generates a triangular shape.
 * All values before `left` are zero, `center` is one, and all values after `right` are zero
 */
var triangularMembershipFunction = function (xValue, _a) {
    var left = _a.left, center = _a.center, right = _a.right;
    var values = [(xValue - left) / (center - left), (right - xValue) / (right - center)].filter(function (value) { return !isNaN(value); });
    return Math.max(Math.min.apply(Math, values), 0);
};
exports.triangularMembershipFunction = triangularMembershipFunction;
/**
 * Generates a trapezoidal shape.
 * All values because `bottomLeft` are zero, `topLeft` to `topRight` is one, and all values
 * after `bottomRight` are zero
 */
var trapezoidalMembershipFunction = function (xValue, _a) {
    var bottomLeft = _a.bottomLeft, topLeft = _a.topLeft, topRight = _a.topRight, bottomRight = _a.bottomRight;
    var values = [
        (xValue - bottomLeft) / (topLeft - bottomLeft),
        1,
        (bottomRight - xValue) / (bottomRight - topRight),
    ].filter(function (value) { return !isNaN(value); });
    return Math.max(Math.min.apply(Math, values), 0);
};
exports.trapezoidalMembershipFunction = trapezoidalMembershipFunction;
/*
 * Generate a bell curve centered around `center`, and
 * width based on `standardDeviation`
 */
var gaussianMembershipFunction = function (xValue, _a) {
    var center = _a.center, standardDeviation = _a.standardDeviation;
    return Math.exp(-0.5 * Math.pow((xValue - center) / standardDeviation, 2));
};
exports.gaussianMembershipFunction = gaussianMembershipFunction;
/*
 * Generate a curve with degree of slope, `slope`, center `half point`
 */
var sigmoidalMembershipFunction = function (xValue, _a) {
    var center = _a.center, slope = _a.slope;
    return 1 / (1 + Math.exp(-slope * (xValue - center)));
};
exports.sigmoidalMembershipFunction = sigmoidalMembershipFunction;
