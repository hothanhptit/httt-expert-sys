"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinguisticRule = void 0;
var LinguisticRule = /** @class */ (function () {
    function LinguisticRule(operator, antecedents, consequent) {
        var _this = this;
        this.prettyPrint = function () {
            var antecedents = _this.antecedents
                .map(function (_a) {
                var linguisticVariable = _a.linguisticVariable, fuzzySet = _a.fuzzySet;
                return "".concat(linguisticVariable, " IS ").concat(fuzzySet);
            })
                .join(" ".concat(_this.operator, " "));
            var consequent = "".concat(_this.consequent.linguisticVariable, " IS ").concat(_this.consequent.fuzzySet);
            return "IF ".concat(antecedents, " THEN ").concat(consequent);
        };
        this.operator = operator;
        this.antecedents = antecedents;
        this.consequent = consequent;
    }
    return LinguisticRule;
}());
exports.LinguisticRule = LinguisticRule;
