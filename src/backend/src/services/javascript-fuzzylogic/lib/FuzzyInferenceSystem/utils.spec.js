"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tipperExample_1 = require("../tipperExample");
var utils_1 = require("./utils");
var __1 = require("..");
describe('combineSetsWithMaximum', function () {
    it('should combine a single set', function () {
        expect((0, utils_1.combineSetsWithMaximum)([[{ membership: 0, value: 1 }]])).toStrictEqual([
            { membership: 0, value: 1 },
        ]);
    });
    it('should combine two sets', function () {
        expect((0, utils_1.combineSetsWithMaximum)([[{ membership: 0.5, value: 1 }], [{ membership: 0, value: 1 }]])).toStrictEqual([{ membership: 0.5, value: 1 }]);
    });
    it('should combine multiple sets', function () {
        expect((0, utils_1.combineSetsWithMaximum)([
            [
                { membership: 0.5, value: 1 },
                { membership: 0.5, value: 2 },
                { membership: 0.5, value: 3 },
            ],
            [
                { membership: 0.75, value: 1 },
                { membership: 0.75, value: 2 },
                { membership: 0.25, value: 3 },
            ],
            [
                { membership: 1, value: 1 },
                { membership: 0, value: 2 },
                { membership: 0, value: 3 },
            ],
            [
                { membership: 0, value: 1 },
                { membership: 0, value: 2 },
                { membership: 1, value: 3 },
            ],
        ])).toStrictEqual([
            { membership: 1, value: 1 },
            { membership: 0.75, value: 2 },
            { membership: 1, value: 3 },
        ]);
    });
});
describe('mamdaniInference', function () {
    it('should throw an error if the arguments do not match the variables', function () {
        expect(function () {
            return (0, utils_1.mamdaniInference)(tipperExample_1.tipper.inputs, tipperExample_1.tipper.outputs, tipperExample_1.tipper.rules, {
                service: 5,
                food: 5,
            }, __1.DefuzzicationType.SmallestOfMaxima);
        }).toThrowError('Argument service does not relate to any variable in the system');
    });
    it('should return a single crisp value for a given fuzzy inference system', function () {
        expect((0, utils_1.mamdaniInference)(tipperExample_1.tipper.inputs, tipperExample_1.tipper.outputs, tipperExample_1.tipper.rules, {
            Service: 8,
            Food: 3,
        }, __1.DefuzzicationType.SmallestOfMaxima)).toBe(22.5);
        expect((0, utils_1.mamdaniInference)(tipperExample_1.tipper.inputs, tipperExample_1.tipper.outputs, tipperExample_1.tipper.rules, {
            Service: 8,
            Food: 3,
        }, __1.DefuzzicationType.LargestOfMaxima)).toBe(27.5);
        expect((0, utils_1.mamdaniInference)(tipperExample_1.tipper.inputs, tipperExample_1.tipper.outputs, tipperExample_1.tipper.rules, {
            Service: 8,
            Food: 3,
        }, __1.DefuzzicationType.MeanOfMaxima)).toBe(25);
        expect((0, utils_1.mamdaniInference)(tipperExample_1.tipper.inputs, tipperExample_1.tipper.outputs, tipperExample_1.tipper.rules, {
            Service: 8,
            Food: 3,
        }, __1.DefuzzicationType.Centroid)).toBe(22.228483184636442);
    });
});
