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
exports.combineSetsWithMaximum = exports.mamdaniInference = void 0;
var defuzzify_1 = require("../defuzzify");
var mamdaniInference = function (inputs, outputs, rules, args, defuzzicationMethod) {
    // Create an indexed object for all the inputs and outputs
    var variables = __spreadArray(__spreadArray([], inputs, true), outputs, true).reduce(function (acc, variable) {
        var _a;
        return __assign(__assign({}, acc), (_a = {}, _a[variable.name] = variable.indexedFuzzySets, _a));
    }, {});
    // Check all args have corresponding variables
    Object.keys(args).forEach(function (variableName) {
        if (variables[variableName] === undefined) {
            throw new Error("Argument ".concat(variableName, " does not relate to any variable in the system"));
        }
    });
    var outputSets = rules.map(function (rule) {
        // Get all membership values for the antecedents
        var inputMembershipValues = rule.antecedents.map(function (_a) {
            var linguisticVariable = _a.linguisticVariable, fuzzySet = _a.fuzzySet;
            var variable = variables[linguisticVariable][fuzzySet];
            if (variable === undefined) {
                throw new Error("Unable to find variable ".concat(linguisticVariable, " with set ").concat(fuzzySet));
            }
            var value = variable.getMembership(args[linguisticVariable]);
            if (value === undefined) {
                throw new Error("Unable to get find get membership for arg ".concat(linguisticVariable, " from ").concat(linguisticVariable, " with set ").concat(fuzzySet));
            }
            return value;
        });
        // Use the operator (AND => Min, OR => Max) to get a single value
        var singleInputValue = rule.operator === 'AND' ? Math.min.apply(Math, inputMembershipValues) : Math.max.apply(Math, inputMembershipValues);
        // Create a new FuzzyValue[] that uses the minimum value from the singleInputValue or
        // the membership of each xValue in the output set
        return variables[rule.consequent.linguisticVariable][rule.consequent.fuzzySet].values.map(function (_a) {
            var value = _a.value, membership = _a.membership;
            return {
                value: value,
                membership: Math.min(singleInputValue, membership),
            };
        });
    });
    // Combine all the output sets into a single set
    var singleOutputSet = (0, exports.combineSetsWithMaximum)(outputSets);
    return (0, defuzzify_1.defuzzify)(defuzzicationMethod, singleOutputSet);
};
exports.mamdaniInference = mamdaniInference;
var combineSetsWithMaximum = function (sets) {
    var firstSet = sets[0];
    var minimumOfSets = firstSet.map(function (_a, i) {
        var value = _a.value;
        var membershipForAllSets = sets.map(function (set) { return set[i].membership; });
        return {
            value: value,
            membership: Math.max.apply(Math, membershipForAllSets),
        };
    });
    return minimumOfSets;
};
exports.combineSetsWithMaximum = combineSetsWithMaximum;
