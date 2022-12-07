"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FuzzySet_1 = require("../FuzzySet");
var membershipFunction_1 = require("../membershipFunction");
var LinguisticVariable_1 = require("./LinguisticVariable");
var poorService = new FuzzySet_1.FuzzySet('Poor').generateMembershipValues({
    type: membershipFunction_1.MembershipFunctionType.Gaussian,
    parameters: {
        center: 0,
        standardDeviation: 1.5,
        minValue: 0,
        maxValue: 10,
        step: 0.5,
    },
});
var goodService = new FuzzySet_1.FuzzySet('Good').generateMembershipValues({
    type: membershipFunction_1.MembershipFunctionType.Gaussian,
    parameters: {
        center: 5,
        standardDeviation: 1.5,
        minValue: 0,
        maxValue: 10,
        step: 0.5,
    },
});
var greatService = new FuzzySet_1.FuzzySet('Great').generateMembershipValues({
    type: membershipFunction_1.MembershipFunctionType.Gaussian,
    parameters: {
        center: 10,
        standardDeviation: 1.5,
        minValue: 0,
        maxValue: 10,
        step: 0.5,
    },
});
describe('LinguisticVariable', function () {
    it('should able to be created with no sets', function () {
        var service = new LinguisticVariable_1.LinguisticVariable('Service');
        expect(service.fuzzySets).toHaveLength(0);
        expect(service.name).toBe('Service');
    });
    it('should be able to be created with some fuzzy sets', function () {
        var service = new LinguisticVariable_1.LinguisticVariable('Service', [poorService, goodService]);
        expect(service.fuzzySets).toHaveLength(2);
    });
    it('should be able to be add sets', function () {
        var service = new LinguisticVariable_1.LinguisticVariable('Service');
        expect(service.fuzzySets).toHaveLength(0);
        service.addSet(poorService);
        service.addSet(goodService);
        expect(service.fuzzySets).toHaveLength(2);
    });
    it('should be able to retrieve sets attached to it', function () {
        var service = new LinguisticVariable_1.LinguisticVariable('Service', [poorService, goodService]);
        var set = service.getSet('Poor');
        expect(set.name).toBe('Poor');
    });
    it('should error if a non existant set is attempted to be retrieved', function () {
        var service = new LinguisticVariable_1.LinguisticVariable('Service', [poorService, goodService]);
        expect(function () { return service.getSet('Fail'); }).toThrowError('No set with that name exists');
    });
    it('should be able to chain add fuzzy sets', function () {
        var service = new LinguisticVariable_1.LinguisticVariable('Service').addSet(poorService).addSet(goodService);
        expect(service.fuzzySets).toHaveLength(2);
    });
    it('should error if two sets with the same name are added', function () {
        var service = new LinguisticVariable_1.LinguisticVariable('Service').addSet(poorService);
        expect(function () { return service.addSet(poorService); }).toThrowError('A set with that name already exists');
    });
    it('should allow for removal of sets', function () {
        var service = new LinguisticVariable_1.LinguisticVariable('Service').addSet(poorService).addSet(goodService);
        expect(service.fuzzySets).toHaveLength(2);
        service.removeSet('Poor');
        expect(service.fuzzySets).toHaveLength(1);
        expect(service.fuzzySets[0].name).toBe('Good');
    });
    it('should allow editing of sets', function () {
        var service = new LinguisticVariable_1.LinguisticVariable('Service')
            .addSet(poorService)
            .addSet(goodService)
            .addSet(greatService);
        var good = service.fuzzySets[1];
        expect(good.name).toBe('Good');
        expect(good.initialisationParameters).toStrictEqual({
            center: 5,
            standardDeviation: 1.5,
            minValue: 0,
            maxValue: 10,
            step: 0.5,
        });
        service.editSet('Good', new FuzzySet_1.FuzzySet('Good (editted)').generateMembershipValues({
            type: membershipFunction_1.MembershipFunctionType.Gaussian,
            parameters: {
                center: 10,
                standardDeviation: 1.5,
                minValue: 0,
                maxValue: 10,
                step: 0.5,
            },
        }));
        var goodEditted = service.fuzzySets[1];
        expect(goodEditted.name).toBe('Good (editted)');
        expect(goodEditted.initialisationParameters).toStrictEqual({
            center: 10,
            standardDeviation: 1.5,
            minValue: 0,
            maxValue: 10,
            step: 0.5,
        });
    });
});
