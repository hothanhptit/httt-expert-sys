"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.largestOfMaxima = exports.smallestOfMaxima = exports.meanOfMaxima = exports.centroid = exports.getMaxima = exports.defuzzify = void 0;
var types_1 = require("./types");
/**
 * Applies a defuzzification method (defined below) to an array of fuzzy values
 */
var defuzzify = function (type, values) {
    switch (type) {
        case types_1.DefuzzicationType.Centroid:
            return (0, exports.centroid)(values);
        case types_1.DefuzzicationType.MeanOfMaxima:
            return (0, exports.meanOfMaxima)(values);
        case types_1.DefuzzicationType.SmallestOfMaxima:
            return (0, exports.smallestOfMaxima)(values);
        case types_1.DefuzzicationType.LargestOfMaxima:
            return (0, exports.largestOfMaxima)(values);
        default:
            throw new Error('Unexpected defuzzification type');
    }
};
exports.defuzzify = defuzzify;
/**
 * Gets all fuzzy values with maximum membership in the given set
 */
var getMaxima = function (values) {
    var membershipMaxima = values.reduce(function (acc, _a) {
        var membership = _a.membership;
        return (membership > acc ? membership : acc);
    }, 0);
    return values.filter(function (fuzzyValue) { return fuzzyValue.membership === membershipMaxima; });
};
exports.getMaxima = getMaxima;
/**
 * The 'balance point' of the set, i.e, where the center of gravity
 * of the shape would be
 */
var centroid = function (values) {
    var sums = values.reduce(function (acc, _a) {
        var value = _a.value, membership = _a.membership;
        return ({
            top: acc.top + membership * value,
            bottom: acc.bottom + membership,
        });
    }, {
        top: 0,
        bottom: 0,
    });
    return sums.top / sums.bottom;
};
exports.centroid = centroid;
/*
 * The average value of all values with the highest membership
 */
var meanOfMaxima = function (values) {
    var maxima = (0, exports.getMaxima)(values);
    var sum = maxima.reduce(function (acc, _a) {
        var value = _a.value;
        return acc + value;
    }, 0);
    return sum / maxima.length;
};
exports.meanOfMaxima = meanOfMaxima;
/*
 * The smallest value of all values with the highest membership
 */
var smallestOfMaxima = function (values) { return (0, exports.getMaxima)(values)[0].value; };
exports.smallestOfMaxima = smallestOfMaxima;
/*
 * The largest value of all values with the highest membership
 */
var largestOfMaxima = function (values) {
    var maxima = (0, exports.getMaxima)(values);
    return maxima[maxima.length - 1].value;
};
exports.largestOfMaxima = largestOfMaxima;
