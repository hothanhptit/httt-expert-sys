"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FuzzySet_1 = require("../FuzzySet");
var defuzzify_1 = require("./defuzzify");
var types_1 = require("./types");
var values = [
    { membership: 0.0, value: 0 },
    { membership: 0.0, value: 10 },
    { membership: 0.0, value: 20 },
    { membership: 0.25, value: 30 },
    { membership: 1, value: 40 },
    { membership: 1, value: 50 },
    { membership: 1, value: 60 },
    { membership: 0.5, value: 70 },
    { membership: 0.5, value: 80 },
    { membership: 0.5, value: 90 },
    { membership: 0, value: 100 },
];
var fuzzySet = new FuzzySet_1.FuzzySet('Test set', values);
var smallerValues = [
    { membership: 0.0, value: 1 },
    { membership: 0.1, value: 2 },
    { membership: 0.7, value: 3 },
    { membership: 0.6, value: 4 },
    { membership: 0.7, value: 5 },
    { membership: 0.4, value: 6 },
    { membership: 0.1, value: 7 },
];
describe('defuzzify', function () {
    it('should defuzzify via centroid', function () {
        expect((0, defuzzify_1.defuzzify)(types_1.DefuzzicationType.Centroid, smallerValues)).toBe(4.346153846153847);
        expect((0, defuzzify_1.defuzzify)(types_1.DefuzzicationType.Centroid, fuzzySet.values)).toBe(58.421052631578945);
    });
    it('should defuzzify via mean of maxima', function () {
        expect((0, defuzzify_1.defuzzify)(types_1.DefuzzicationType.MeanOfMaxima, smallerValues)).toBe(4);
        expect((0, defuzzify_1.defuzzify)(types_1.DefuzzicationType.MeanOfMaxima, fuzzySet.values)).toBe(50);
    });
    it('should defuzzify via largest of maxima', function () {
        expect((0, defuzzify_1.defuzzify)(types_1.DefuzzicationType.LargestOfMaxima, smallerValues)).toBe(5);
        expect((0, defuzzify_1.defuzzify)(types_1.DefuzzicationType.LargestOfMaxima, fuzzySet.values)).toBe(60);
    });
    it('should defuzzify via smallest of maxima', function () {
        expect((0, defuzzify_1.defuzzify)(types_1.DefuzzicationType.SmallestOfMaxima, smallerValues)).toBe(3);
        expect((0, defuzzify_1.defuzzify)(types_1.DefuzzicationType.SmallestOfMaxima, fuzzySet.values)).toBe(40);
    });
});
describe('getMaxima', function () {
    it('should return the maxima for a given fuzzy set', function () {
        expect((0, defuzzify_1.getMaxima)(fuzzySet.values)).toStrictEqual([
            { membership: 1, value: 40 },
            { membership: 1, value: 50 },
            { membership: 1, value: 60 },
        ]);
    });
});
describe('centroid', function () {
    it('should return the balance point of the shape', function () {
        expect((0, defuzzify_1.centroid)(fuzzySet.values)).toBe(58.421052631578945);
    });
});
describe('meanOfMaxima', function () {
    it('should return the average value of those with the highest membership', function () {
        expect((0, defuzzify_1.meanOfMaxima)(fuzzySet.values)).toBe(50);
    });
});
describe('smallestOfMaxima', function () {
    it('should return the smallest value with the highest membership', function () {
        expect((0, defuzzify_1.smallestOfMaxima)(fuzzySet.values)).toBe(40);
    });
});
describe('largestOfMaxima', function () {
    it('should return the largest value with the highest membership', function () {
        expect((0, defuzzify_1.largestOfMaxima)(fuzzySet.values)).toBe(60);
    });
});
