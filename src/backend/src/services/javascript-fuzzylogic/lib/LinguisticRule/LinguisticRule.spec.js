"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LinguisticRule_1 = require("./LinguisticRule");
var operator = 'AND';
var antecedents = [
    {
        linguisticVariable: 'Food',
        fuzzySet: 'Good',
    },
    {
        linguisticVariable: 'Service',
        fuzzySet: 'Good',
    },
];
var consequent = {
    linguisticVariable: 'Tip',
    fuzzySet: 'Good',
};
describe('LinguisticRule', function () {
    it('should be able to initialise with antecedents and a consequent', function () {
        var r = new LinguisticRule_1.LinguisticRule(operator, antecedents, consequent);
        expect(r.antecedents).toHaveLength(2);
        expect(r.consequent).toBeDefined();
        expect(r.operator).toBe('AND');
    });
    it('should be able to print itself in plain english', function () {
        var r = new LinguisticRule_1.LinguisticRule(operator, antecedents, consequent);
        expect(r.prettyPrint()).toBe('IF Food IS Good AND Service IS Good THEN Tip IS Good');
    });
});
