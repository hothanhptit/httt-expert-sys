"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipper = exports.tipVariable = exports.foodVariable = exports.serviceVariable = void 0;
var FuzzySet_1 = require("./FuzzySet");
var index_1 = require("./index");
var membershipFunction_1 = require("./membershipFunction");
var poorServiceMf = new FuzzySet_1.FuzzySet('Poor').generateMembershipValues({
    type: membershipFunction_1.MembershipFunctionType.Gaussian,
    parameters: {
        center: 0,
        standardDeviation: 1.5,
        minValue: 0,
        maxValue: 10,
        step: 0.5,
    },
});
var goodServiceMf = new FuzzySet_1.FuzzySet('Good').generateMembershipValues({
    type: membershipFunction_1.MembershipFunctionType.Gaussian,
    parameters: {
        center: 5,
        standardDeviation: 1.5,
        minValue: 0,
        maxValue: 10,
        step: 0.5,
    },
});
var excellentServiceMf = new FuzzySet_1.FuzzySet('Excellent').generateMembershipValues({
    type: membershipFunction_1.MembershipFunctionType.Gaussian,
    parameters: {
        center: 10,
        standardDeviation: 1.5,
        minValue: 0,
        maxValue: 10,
        step: 0.5,
    },
});
var rancidFoodMf = new FuzzySet_1.FuzzySet('Rancid').generateMembershipValues({
    type: membershipFunction_1.MembershipFunctionType.Trapezoidal,
    parameters: {
        bottomLeft: 0,
        topLeft: 0,
        topRight: 1,
        bottomRight: 3,
        minValue: 0,
        maxValue: 10,
        step: 0.5,
    },
});
var deliciousFoodMf = new FuzzySet_1.FuzzySet('Delicious').generateMembershipValues({
    type: membershipFunction_1.MembershipFunctionType.Trapezoidal,
    parameters: {
        bottomLeft: 7,
        topLeft: 9,
        topRight: 10,
        bottomRight: 10,
        minValue: 0,
        maxValue: 10,
        step: 0.5,
    },
});
var cheapTipMf = new FuzzySet_1.FuzzySet('Cheap').generateMembershipValues({
    type: membershipFunction_1.MembershipFunctionType.Triangular,
    parameters: {
        left: 0,
        center: 5,
        right: 10,
        minValue: 0,
        maxValue: 30,
        step: 0.5,
    },
});
var averageTipMf = new FuzzySet_1.FuzzySet('Average').generateMembershipValues({
    type: membershipFunction_1.MembershipFunctionType.Triangular,
    parameters: {
        left: 10,
        center: 15,
        right: 20,
        minValue: 0,
        maxValue: 30,
        step: 0.5,
    },
});
var generousTipMf = new FuzzySet_1.FuzzySet('Generous').generateMembershipValues({
    type: membershipFunction_1.MembershipFunctionType.Triangular,
    parameters: {
        left: 20,
        center: 25,
        right: 30,
        minValue: 0,
        maxValue: 30,
        step: 0.5,
    },
});
exports.serviceVariable = new index_1.LinguisticVariable('Service')
    .addSet(poorServiceMf)
    .addSet(goodServiceMf)
    .addSet(excellentServiceMf);
exports.foodVariable = new index_1.LinguisticVariable('Food').addSet(rancidFoodMf).addSet(deliciousFoodMf);
exports.tipVariable = new index_1.LinguisticVariable('Tip')
    .addSet(cheapTipMf)
    .addSet(averageTipMf)
    .addSet(generousTipMf);
exports.tipper = new index_1.FuzzyInferenceSystem('Tipper test')
    .addInput(exports.serviceVariable)
    .addInput(exports.foodVariable)
    .addOutput(exports.tipVariable)
    .addRule('IF Food IS Rancid OR Service IS Poor THEN Tip IS Cheap')
    .addRule('IF Service IS Good THEN Tip IS Average')
    .addRule('IF Food IS Delicious OR Service IS Excellent THEN Tip IS Generous');
