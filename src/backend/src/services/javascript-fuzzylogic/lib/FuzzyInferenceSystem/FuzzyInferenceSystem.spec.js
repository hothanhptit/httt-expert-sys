"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var tipperExample_1 = require("../tipperExample");
var FuzzyInferenceSystem_1 = require("./FuzzyInferenceSystem");
describe('FuzzyInferenceSystem', function () {
    it('should able to be created with no sets', function () {
        var tipper = new FuzzyInferenceSystem_1.FuzzyInferenceSystem('Tipper');
        expect(tipper.inputs).toHaveLength(0);
        expect(tipper.outputs).toHaveLength(0);
        expect(tipper.name).toBe('Tipper');
    });
    it('should be able to be created with some fuzzy sets', function () {
        var tipper = new FuzzyInferenceSystem_1.FuzzyInferenceSystem('Tipper', [tipperExample_1.serviceVariable], [tipperExample_1.tipVariable]);
        expect(tipper.inputs).toHaveLength(1);
        expect(tipper.outputs).toHaveLength(1);
    });
    it('should be able to be add sets', function () {
        var tipper = new FuzzyInferenceSystem_1.FuzzyInferenceSystem('Tipper');
        expect(tipper.inputs).toHaveLength(0);
        expect(tipper.outputs).toHaveLength(0);
        tipper.addInput(tipperExample_1.serviceVariable);
        tipper.addOutput(tipperExample_1.tipVariable);
        expect(tipper.inputs).toHaveLength(1);
        expect(tipper.outputs).toHaveLength(1);
    });
    it('should be able to chain add variables', function () {
        var tipper = new FuzzyInferenceSystem_1.FuzzyInferenceSystem('Tipper').addInput(tipperExample_1.serviceVariable).addOutput(tipperExample_1.tipVariable);
        expect(tipper.inputs).toHaveLength(1);
        expect(tipper.outputs).toHaveLength(1);
    });
    it('should throw an error if two variables with the same names are attempted to be added', function () {
        var tipper = new FuzzyInferenceSystem_1.FuzzyInferenceSystem('Tipper').addInput(tipperExample_1.serviceVariable).addOutput(tipperExample_1.tipVariable);
        expect(function () { return tipper.addInput(tipperExample_1.serviceVariable); }).toThrowError('An input with that name already exists');
    });
    it('should be able to remove variables', function () {
        var tipper = new FuzzyInferenceSystem_1.FuzzyInferenceSystem('Tipper')
            .addInput(tipperExample_1.serviceVariable)
            .addInput(tipperExample_1.foodVariable)
            .addOutput(tipperExample_1.tipVariable);
        expect(tipper.inputs.length).toBe(2);
        tipper.removeInput('Service');
        expect(tipper.inputs.length).toBe(1);
        expect(tipper.inputs[0].name).toBe('Food');
    });
    it('should be able to edit variables', function () {
        var tipper = new FuzzyInferenceSystem_1.FuzzyInferenceSystem('Tipper')
            .addInput(tipperExample_1.serviceVariable)
            .addInput(tipperExample_1.foodVariable)
            .addOutput(tipperExample_1.tipVariable);
        expect(tipper.inputs.length).toBe(2);
        expect(tipper.inputs[1].name).toBe('Food');
        expect(tipper.inputs[1].fuzzySets[0].name).toBe('Rancid');
        expect(tipper.inputs[1].fuzzySets.length).toBe(2);
        tipper.editInput('Food', { name: 'Flood', fuzzySets: [new index_1.FuzzySet('Flancid')] });
        expect(tipper.inputs[1].name).toBe('Flood');
        expect(tipper.inputs[1].fuzzySets[0].name).toBe('Flancid');
        expect(tipper.inputs[1].fuzzySets.length).toBe(1);
    });
    it('should throw an error if an editted variable has a name the same as another variable (except the source)', function () {
        var tipper = new FuzzyInferenceSystem_1.FuzzyInferenceSystem('Tipper')
            .addInput(tipperExample_1.serviceVariable)
            .addInput(tipperExample_1.foodVariable)
            .addOutput(tipperExample_1.tipVariable);
        expect(function () { return tipper.editInput('Food', { name: 'Service' }); }).toThrowError('An input with that name already exists');
    });
    it('should be able to add a rule', function () {
        var tipper = new FuzzyInferenceSystem_1.FuzzyInferenceSystem('Tipper').addInput(tipperExample_1.serviceVariable).addOutput(tipperExample_1.tipVariable);
        tipper.addRule('IF Service IS Good THEN Tip IS Average');
        expect(tipper.rules[0].prettyPrint()).toBe('IF Service IS Good THEN Tip IS Average');
        tipper.addRule('IF Service IS Good AND Service IS Good THEN Tip IS Average');
        expect(tipper.rules[1].prettyPrint()).toBe('IF Service IS Good AND Service IS Good THEN Tip IS Average');
    });
    it('should throw an error if the antecedent or consequent are malformed', function () {
        var tipper = new FuzzyInferenceSystem_1.FuzzyInferenceSystem('Tipper').addInput(tipperExample_1.serviceVariable).addOutput(tipperExample_1.tipVariable);
        expect(function () { return tipper.addRule('IF THEN Tip IS Good'); }).toThrowError('No antecedents (inputs) specified');
        expect(function () { return tipper.addRule('IF Food IS Good AND Service IS THEN Tip IS Average'); }).toThrowError('Rule string is malformed');
        expect(function () { return tipper.addRule('IF Food IS Good THEN Tip IS'); }).toThrowError('Rule string is malformed');
    });
    it('should throw an error if a rule does not contain valid variables/sets', function () {
        var tipper = new FuzzyInferenceSystem_1.FuzzyInferenceSystem('Tipper').addInput(tipperExample_1.serviceVariable).addOutput(tipperExample_1.tipVariable);
        expect(function () { return tipper.addRule('IF Service IS Good THEN Tipx IS Average'); }).toThrowError('Consequent cannot be created (variable Tipx or set Average do not exist');
        expect(function () { return tipper.addRule('IF Service IS Great THEN Tip IS Average'); }).toThrowError('Antecedents could not be be created (at least one set or variable does not exist)');
        expect(function () { return tipper.addRule('IF Food IS Good THEN Tip IS Average'); }).toThrowError('Antecedents could not be be created (at least one set or variable does not exist)');
    });
    it('should error if not all input variables are given an argument', function () {
        var tipper = new FuzzyInferenceSystem_1.FuzzyInferenceSystem('Tipper')
            .addInput(tipperExample_1.serviceVariable)
            .addInput(tipperExample_1.foodVariable)
            .addOutput(tipperExample_1.tipVariable);
        expect(function () { return tipper.solve('Mamdani', { Service: 5 }, index_1.DefuzzicationType.Centroid); }).toThrowError('Not all input variables have an argument provided');
    });
    it('should error if inputs, outputs or rules are missing', function () {
        var tipper = new FuzzyInferenceSystem_1.FuzzyInferenceSystem('Tipper');
        expect(function () { return tipper.solve('Mamdani', { Service: 5, Food: 5 }, index_1.DefuzzicationType.Centroid); }).toThrowError('Cannot solve: No inputs defined');
        tipper.addInput(tipperExample_1.serviceVariable);
        tipper.addInput(tipperExample_1.foodVariable);
        expect(function () { return tipper.solve('Mamdani', { Service: 5, Food: 5 }, index_1.DefuzzicationType.Centroid); }).toThrowError('Cannot solve: No outputs defined');
        tipper.addOutput(tipperExample_1.tipVariable);
        expect(function () { return tipper.solve('Mamdani', { Service: 5, Food: 5 }, index_1.DefuzzicationType.Centroid); }).toThrowError('Cannot solve: No rules defined');
        tipper.addRule('Service IS Good THEN Tip IS Average');
        expect(function () {
            return tipper.solve('Mamdani', { Service: 5, Food: 5 }, index_1.DefuzzicationType.Centroid);
        }).not.toThrowError();
    });
    it('should be solvable', function () {
        var tipper = new FuzzyInferenceSystem_1.FuzzyInferenceSystem('Tipper')
            .addInput(tipperExample_1.serviceVariable)
            .addInput(tipperExample_1.foodVariable)
            .addOutput(tipperExample_1.tipVariable)
            .addRule('IF Food IS Rancid OR Service IS Poor THEN Tip IS Cheap')
            .addRule('IF Service IS Good THEN Tip IS Average')
            .addRule('IF Food IS Delicious OR Service IS Excellent THEN Tip IS Generous');
        expect(tipper.solve('Mamdani', { Service: 5, Food: 5 }, index_1.DefuzzicationType.Centroid)).toBe(14.999999999999988);
    });
});
