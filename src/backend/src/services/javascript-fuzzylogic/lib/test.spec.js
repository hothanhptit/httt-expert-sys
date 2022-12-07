"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FuzzyInferenceSystem_1 = require("./FuzzyInferenceSystem");
var FuzzySet_1 = require("./FuzzySet");
var LinguisticVariable_1 = require("./LinguisticVariable");
var membershipFunction_1 = require("./membershipFunction");
var tipperExample_1 = require("./tipperExample");
var _1 = require(".");
describe('scenario', function () {
    it('should not NaN', function () {
        var f = new FuzzyInferenceSystem_1.FuzzyInferenceSystem('Tipper');
        f.addInput(tipperExample_1.tipper.inputs[0]).addInput(tipperExample_1.tipper.inputs[1]);
        f.addOutput(new LinguisticVariable_1.LinguisticVariable('Tip')
            .addSet(new FuzzySet_1.FuzzySet('Cheap').generateMembershipValues({
            type: membershipFunction_1.MembershipFunctionType.Triangular,
            parameters: {
                left: 0,
                center: 0,
                right: 15,
                minValue: 0,
                maxValue: 30,
                step: 0.5,
            },
        }))
            .addSet(new FuzzySet_1.FuzzySet('Average').generateMembershipValues({
            type: membershipFunction_1.MembershipFunctionType.Triangular,
            parameters: {
                left: 7.5,
                center: 15,
                right: 22.5,
                minValue: 0,
                maxValue: 30,
                step: 0.5,
            },
        }))
            .addSet(new FuzzySet_1.FuzzySet('Generous').generateMembershipValues({
            type: membershipFunction_1.MembershipFunctionType.Triangular,
            parameters: {
                left: 15,
                center: 30,
                right: 30,
                minValue: 0,
                maxValue: 30,
                step: 0.5,
            },
        })));
        f.addRule(tipperExample_1.tipper.rules[0].prettyPrint())
            .addRule(tipperExample_1.tipper.rules[1].prettyPrint())
            .addRule(tipperExample_1.tipper.rules[2].prettyPrint());
        expect(f.solve('Mamdani', { Food: 5, Service: 5 }, _1.DefuzzicationType.Centroid)).not.toBeNaN();
    });
});
