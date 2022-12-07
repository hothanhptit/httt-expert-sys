"use strict";
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
var index_1 = require("./index");
var utils_1 = require("./utils");
var __1 = require("..");
var values = [
    { membership: 0.0, value: 1 },
    { membership: 0.1, value: 2 },
    { membership: 0.7, value: 3 },
    { membership: 0.6, value: 4 },
    { membership: 0.7, value: 5 },
    { membership: 0.4, value: 6 },
    { membership: 0.1, value: 7 },
];
var setWithValues = new index_1.FuzzySet('setWithValues', values);
var setWithNoValues = new index_1.FuzzySet('setWithNoValues', []);
var normalisedSet = new index_1.FuzzySet('normalisedSet', __spreadArray(__spreadArray([], values, true), [{ membership: 1, value: 8 }], false));
describe('FuzzySet', function () {
    it('should store initialisation parameters if a membership function is used', function () {
        var f1 = new index_1.FuzzySet('Fuzzy set');
        expect(f1.initialisationParameters).toBe(undefined);
        expect(f1.membershipFunctionType).toBe(undefined);
        var initParams = {
            type: __1.MembershipFunctionType.Triangular,
            parameters: {
                left: 0,
                center: 5,
                right: 10,
                minValue: 0,
                maxValue: 10,
                step: 1,
            },
        };
        f1.generateMembershipValues(initParams);
        expect(f1.initialisationParameters).toStrictEqual(initParams.parameters);
        expect(f1.membershipFunctionType).toBe(initParams.type);
    });
});
describe('alphacut', function () {
    it('should return empty array if the fuzzy set has no values', function () {
        expect((0, index_1.alphacut)(setWithNoValues, 0.2)).toStrictEqual([]);
        expect((0, index_1.alphacut)(setWithNoValues, 0.6)).toStrictEqual([]);
        expect((0, index_1.alphacut)(setWithNoValues, 1)).toStrictEqual([]);
        expect(setWithNoValues.alphacut(0.2)).toStrictEqual([]);
    });
    it('should return all values with greater or equal membership than the alpha', function () {
        expect((0, index_1.alphacut)(setWithValues, 0.2)).toStrictEqual([3, 4, 5, 6]);
        expect((0, index_1.alphacut)(setWithValues, 0.6)).toStrictEqual([3, 4, 5]);
        expect((0, index_1.alphacut)(setWithValues, 1)).toStrictEqual([]);
        expect(setWithValues.alphacut(0.2)).toStrictEqual([3, 4, 5, 6]);
    });
    it('should return all values with greater member than the alpha, if strong is specified', function () {
        expect((0, index_1.alphacut)(setWithValues, 0.2, true)).toStrictEqual([3, 4, 5, 6]);
        expect((0, index_1.alphacut)(setWithValues, 0.6, true)).toStrictEqual([3, 5]);
        expect((0, index_1.alphacut)(setWithValues, 1, true)).toStrictEqual([]);
        expect(setWithValues.alphacut(0.2, true)).toStrictEqual([3, 4, 5, 6]);
    });
});
describe('support', function () {
    it('should return empty array if the fuzzy set has no values', function () {
        expect((0, index_1.support)(setWithNoValues)).toStrictEqual([]);
        expect(setWithNoValues.support()).toStrictEqual([]);
    });
    it('should return all values with greater member than 0', function () {
        expect((0, index_1.support)(setWithValues)).toStrictEqual([2, 3, 4, 5, 6, 7]);
        expect(setWithValues.support()).toStrictEqual([2, 3, 4, 5, 6, 7]);
    });
});
describe('height', function () {
    it('should return an error if an empty values array is used', function () {
        expect(function () { return (0, index_1.height)(setWithNoValues); }).toThrowError('Cannot process, this set has no values');
        expect(function () { return setWithNoValues.height(); }).toThrowError('Cannot process, this set has no values');
    });
    it('should return the highest membership for a given fuzzy set', function () {
        expect((0, index_1.height)(setWithValues)).toStrictEqual(0.7);
        expect(setWithValues.height()).toStrictEqual(0.7);
        expect((0, index_1.height)(normalisedSet)).toStrictEqual(1);
        expect(normalisedSet.height()).toStrictEqual(1);
    });
});
describe('isNormal', function () {
    it('should return an error if an empty values array is used', function () {
        expect(function () { return (0, index_1.isNormal)(setWithNoValues); }).toThrowError('Cannot process, this set has no values');
        expect(function () { return setWithNoValues.isNormal(); }).toThrowError('Cannot process, this set has no values');
    });
    it('should return true if the highest membership grade of a set is 1', function () {
        expect((0, index_1.isNormal)(normalisedSet)).toStrictEqual(true);
        expect(normalisedSet.isNormal()).toStrictEqual(true);
    });
    it('should return false if the highest membership grade of a set is not 1', function () {
        expect((0, index_1.isNormal)(setWithValues)).toStrictEqual(false);
        expect(setWithValues.isNormal()).toStrictEqual(false);
    });
});
describe('complement', function () {
    it('should return an empty set if no values are provided', function () {
        expect((0, index_1.complement)(setWithNoValues)).toStrictEqual([]);
        expect(setWithNoValues.complement()).toStrictEqual([]);
    });
    it('should return a new set of values with 1-m of the original set', function () {
        var result = [
            { membership: 1, value: 1 },
            { membership: 0.9, value: 2 },
            { membership: 0.3, value: 3 },
            { membership: 0.4, value: 4 },
            { membership: 0.3, value: 5 },
            { membership: 0.6, value: 6 },
            { membership: 0.9, value: 7 },
        ];
        expect((0, index_1.complement)(setWithValues)).toStrictEqual(result);
        expect(setWithValues.complement()).toStrictEqual(result);
    });
});
var middleAged = new index_1.FuzzySet('middleAged', [
    {
        membership: 0,
        value: 0,
    },
    {
        membership: 0,
        value: 10,
    },
    {
        membership: 0,
        value: 20,
    },
    {
        membership: 0.5,
        value: 30,
    },
    {
        membership: 1,
        value: 40,
    },
    {
        membership: 0.5,
        value: 50,
    },
    {
        membership: 0,
        value: 60,
    },
    {
        membership: 0,
        value: 70,
    },
    {
        membership: 0,
        value: 80,
    },
]);
var young = new index_1.FuzzySet('young', [
    {
        membership: 1,
        value: 0,
    },
    {
        membership: 1,
        value: 10,
    },
    {
        membership: 1,
        value: 20,
    },
    {
        membership: 0.5,
        value: 30,
    },
    {
        membership: 0,
        value: 40,
    },
    {
        membership: 0,
        value: 50,
    },
    {
        membership: 0,
        value: 60,
    },
    {
        membership: 0,
        value: 70,
    },
    {
        membership: 0,
        value: 80,
    },
]);
describe('union', function () {
    it('should return an error if sets are not of equal length', function () {
        var badYoungValues = Array.from(young.values).slice(0, 3);
        var badYoungSet = new index_1.FuzzySet('Bad young', badYoungValues);
        expect(function () { return (0, index_1.union)(badYoungSet, middleAged); }).toThrowError('Sets do not have the same length');
    });
    it('should return an error if sets do not have the same x values', function () {
        var badYoungSet = new index_1.FuzzySet('Bad young', __spreadArray([{ membership: 1, value: -5 }], young.values, true));
        var badMiddleAgeSet = new index_1.FuzzySet('Bad young', __spreadArray([{ membership: 1, value: -1 }], young.values, true));
        expect(function () { return (0, index_1.union)(badYoungSet, badMiddleAgeSet); }).toThrowError('Sets do not have matching x values (make sure minValue, maxValue and step are the same)');
    });
    it('should return union of two fuzzy sets', function () {
        expect((0, index_1.union)(young, middleAged)).toStrictEqual([
            { membership: 1, value: 0 },
            { membership: 1, value: 10 },
            { membership: 1, value: 20 },
            { membership: 0.5, value: 30 },
            { membership: 1, value: 40 },
            { membership: 0.5, value: 50 },
            { membership: 0, value: 60 },
            { membership: 0, value: 70 },
            { membership: 0, value: 80 },
        ]);
    });
});
describe('intersection', function () {
    it('should return an error if sets are not of equal length', function () {
        var badYoungValues = Array.from(young.values).slice(0, 3);
        var badYoungSet = new index_1.FuzzySet('Bad young', badYoungValues);
        expect(function () { return (0, index_1.intersection)(badYoungSet, middleAged); }).toThrowError('Sets do not have the same length');
    });
    it('should return an error if sets do not have the same x values', function () {
        var badYoungSet = new index_1.FuzzySet('Bad young', __spreadArray([{ membership: 1, value: -5 }], young.values, true));
        var badMiddleAgeSet = new index_1.FuzzySet('Bad young', __spreadArray([{ membership: 1, value: -1 }], young.values, true));
        expect(function () { return (0, index_1.intersection)(badYoungSet, badMiddleAgeSet); }).toThrowError('Sets do not have matching x values (make sure minValue, maxValue and step are the same)');
    });
    it('should return intersection of two fuzzy sets', function () {
        expect((0, index_1.intersection)(young, middleAged)).toStrictEqual([
            { membership: 0, value: 0 },
            { membership: 0, value: 10 },
            { membership: 0, value: 20 },
            { membership: 0.5, value: 30 },
            { membership: 0, value: 40 },
            { membership: 0, value: 50 },
            { membership: 0, value: 60 },
            { membership: 0, value: 70 },
            { membership: 0, value: 80 },
        ]);
    });
});
describe('indexByXValue', function () {
    it('should index by x value', function () {
        expect((0, utils_1.indexByXValue)(young.values)).toStrictEqual({
            '0': 1,
            '10': 1,
            '20': 1,
            '30': 0.5,
            '40': 0,
            '50': 0,
            '60': 0,
            '70': 0,
            '80': 0,
        });
    });
});
describe('getPlottableValues', function () {
    it('should return two empty arrays for an empty fuzzy set', function () {
        expect((0, __1.getPlottableValues)(setWithNoValues)).toStrictEqual({
            xValues: [],
            membershipValues: [],
        });
    });
    it('should return two arrays for a given fuzzy set', function () {
        expect((0, __1.getPlottableValues)(setWithValues)).toStrictEqual({
            membershipValues: [0, 0.1, 0.7, 0.6, 0.7, 0.4, 0.1],
            xValues: [1, 2, 3, 4, 5, 6, 7],
        });
    });
});
describe('getMembershipValue', function () {
    it('should return the undefined if the xValue does not exist', function () {
        expect((0, index_1.getMembershipValue)(setWithNoValues, 1)).toBe(undefined);
        expect(setWithNoValues.getMembership(1)).toBe(undefined);
    });
    it('should return the membership value if that xValue exists', function () {
        expect((0, index_1.getMembershipValue)(setWithValues, 1)).toBe(0);
        expect(setWithValues.getMembership(1)).toBe(0);
    });
});
