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
exports.FuzzyInferenceSystem = void 0;
var index_1 = require("../index");
var LinguisticRule_1 = require("../LinguisticRule");
var types_1 = require("./types");
var utils_1 = require("./utils");
var FuzzyInferenceSystem = /** @class */ (function () {
    function FuzzyInferenceSystem(name, inputs, outputs) {
        if (inputs === void 0) { inputs = []; }
        if (outputs === void 0) { outputs = []; }
        var _this = this;
        this.addVariable = function (variable, type) {
            if (type === 'Input') {
                _this.inputs.push(variable);
            }
            else {
                _this.outputs.push(variable);
            }
            return _this;
        };
        this.removeVariable = function (name, type) {
            if (type === 'Input') {
                _this.inputs = _this.inputs.filter(function (variable) { return variable.name !== name; });
            }
            else {
                _this.outputs = _this.outputs.filter(function (variable) { return variable.name !== name; });
            }
            return _this;
        };
        this.removeInput = function (name) {
            return _this.removeVariable(name, types_1.VariableType.Input);
        };
        this.removeOutput = function (name) {
            return _this.removeVariable(name, types_1.VariableType.Output);
        };
        this.editVariable = function (name, _a, type) {
            var newName = _a.name, fuzzySets = _a.fuzzySets;
            var oldVariableIndex;
            var oldVariable;
            if (type === types_1.VariableType.Input) {
                oldVariableIndex = _this.inputs.findIndex(function (variable) { return variable.name === name; });
                oldVariable = _this.inputs[oldVariableIndex];
            }
            else {
                oldVariableIndex = _this.outputs.findIndex(function (variable) { return variable.name === name; });
                oldVariable = _this.outputs[oldVariableIndex];
            }
            var newVariableName = newName ? newName : name;
            var newVariableSets = fuzzySets ? fuzzySets : (oldVariable === null || oldVariable === void 0 ? void 0 : oldVariable.fuzzySets) || [];
            var newVariable = new index_1.LinguisticVariable(newVariableName, newVariableSets);
            if (type === types_1.VariableType.Input) {
                _this.inputs = __spreadArray(__spreadArray(__spreadArray([], _this.inputs.slice(0, oldVariableIndex), true), [
                    newVariable
                ], false), _this.inputs.slice(oldVariableIndex + 1, _this.inputs.length), true);
            }
            else {
                _this.outputs = __spreadArray(__spreadArray(__spreadArray([], _this.outputs.slice(0, oldVariableIndex), true), [
                    newVariable
                ], false), _this.outputs.slice(oldVariableIndex + 1, _this.outputs.length), true);
            }
            return _this;
        };
        this.editInput = function (name, _a) {
            var newName = _a.name, fuzzySets = _a.fuzzySets;
            if (newName && newName !== name && _this.inputs.find(function (variable) { return variable.name === newName; })) {
                throw new Error('An input with that name already exists');
            }
            return _this.editVariable(name, { name: newName, fuzzySets: fuzzySets }, types_1.VariableType.Input);
        };
        this.editOutput = function (name, _a) {
            var newName = _a.name, fuzzySets = _a.fuzzySets;
            if (newName && newName !== name && _this.inputs.find(function (variable) { return variable.name === newName; })) {
                throw new Error('An output with that name already exists');
            }
            return _this.editVariable(name, { name: newName, fuzzySets: fuzzySets }, types_1.VariableType.Output);
        };
        this.addInput = function (newVariable) {
            if (_this.inputs.find(function (variable) { return variable.name === newVariable.name; })) {
                throw new Error('An input with that name already exists');
            }
            return _this.addVariable(newVariable, types_1.VariableType.Input);
        };
        this.addOutput = function (newVariable) {
            if (_this.outputs.find(function (variable) { return variable.name === newVariable.name; })) {
                throw new Error('An output with that name already exists');
            }
            return _this.addVariable(newVariable, types_1.VariableType.Output);
        };
        this.addRule = function (rule) {
            var operator = rule.match('AND') ? 'AND' : 'OR';
            var parts = rule.split(/IF|IS|THEN|AND|OR| /).filter(Boolean);
            if (parts.length % 2 !== 0) {
                throw new Error('Rule string is malformed');
            }
            var antecedents = [];
            var consequent = [];
            for (var i = 0; i < parts.length; i += 2) {
                if (i === parts.length - 2) {
                    consequent.push(parts[i]);
                    consequent.push(parts[i + 1]);
                }
                else {
                    antecedents.push([parts[i], parts[i + 1]]);
                }
            }
            if (antecedents.length === 0) {
                throw new Error('No antecedents (inputs) specified');
            }
            if (consequent.length === 0) {
                throw new Error('No consequent (output) specified');
            }
            try {
                _this.checkAntecedentsAndConsequentAreValid(antecedents, consequent);
            }
            catch (_a) {
                var message = _a.message;
                throw new Error(message);
            }
            var linguisticRule = new LinguisticRule_1.LinguisticRule(operator, antecedents.map(function (antecedentParts) { return ({
                linguisticVariable: antecedentParts[0],
                fuzzySet: antecedentParts[1],
            }); }), {
                linguisticVariable: consequent[0],
                fuzzySet: consequent[1],
            });
            _this.rules.push(linguisticRule);
            return _this;
        };
        this.checkAntecedentsAndConsequentAreValid = function (antecedents, consequent) {
            var _a;
            var allAntecedentsExist = antecedents.every(function (antecedent) {
                var _a;
                return (((_a = _this.inputs.find(function (input) { return antecedent[0] === input.name; })) === null || _a === void 0 ? void 0 : _a.indexedFuzzySets[antecedent[1]]) !==
                    undefined);
            });
            if (!allAntecedentsExist) {
                throw new Error('Antecedents could not be be created (at least one set or variable does not exist)');
            }
            var consequentExists = ((_a = _this.outputs.find(function (output) { return consequent[0] === output.name; })) === null || _a === void 0 ? void 0 : _a.indexedFuzzySets[consequent[1]]) !==
                undefined;
            if (!consequentExists) {
                throw new Error("Consequent cannot be created (variable ".concat(consequent[0], " or set ").concat(consequent[1], " do not exist)"));
            }
        };
        this.solve = function (type, args, defuzzicationMethod) {
            var allInputsHaveArg = _this.inputs.every(function (input) { return args[input.name] !== undefined; });
            if (!allInputsHaveArg) {
                throw new Error('Not all input variables have an argument provided');
            }
            if (_this.inputs.length === 0) {
                throw new Error('Cannot solve: No inputs defined');
            }
            if (_this.outputs.length === 0) {
                throw new Error('Cannot solve: No outputs defined');
            }
            if (_this.rules.length === 0) {
                throw new Error('Cannot solve: No rules defined');
            }
            if (type === 'Mamdani') {
                return (0, utils_1.mamdaniInference)(_this.inputs, _this.outputs, _this.rules, args, defuzzicationMethod);
            }
            throw new Error('Unknown defuzzification method specified');
        };
        this.name = name;
        this.inputs = inputs;
        this.outputs = outputs;
        this.rules = [];
    }
    return FuzzyInferenceSystem;
}());
exports.FuzzyInferenceSystem = FuzzyInferenceSystem;
