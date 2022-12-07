"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuzzySet = void 0;
var defuzzify_1 = require("../defuzzify");
var membershipFunction_1 = require("../membershipFunction");
var index_1 = require("./index");
var FuzzySet = /** @class */ (function () {
    function FuzzySet(name, initialValues) {
        if (initialValues === void 0) { initialValues = []; }
        var _this = this;
        this.alphacut = function (alpha, strong) { return (0, index_1.alphacut)(_this, alpha, strong); };
        this.support = function () { return (0, index_1.support)(_this); };
        this.height = function () { return (0, index_1.height)(_this); };
        this.isNormal = function () { return (0, index_1.isNormal)(_this); };
        this.complement = function () { return (0, index_1.complement)(_this); };
        this.union = function (fuzzySet) { return (0, index_1.union)(_this, fuzzySet); };
        this.intersection = function (fuzzySet) { return (0, index_1.intersection)(_this, fuzzySet); };
        this.defuzzify = function (type) { return (0, defuzzify_1.defuzzify)(type, _this.values); };
        this.getPlottableValues = function () { return (0, index_1.getPlottableValues)(_this); };
        this.getMembership = function (xValue) { return (0, index_1.getMembershipValue)(_this, xValue); };
        this.name = name;
        this.values = initialValues;
    }
    FuzzySet.prototype.generateMembershipValues = function (mf) {
        this.values = (0, membershipFunction_1.generateMembershipValues)(mf);
        this.membershipFunctionType = mf.type;
        this.initialisationParameters = mf.parameters;
        return this;
    };
    return FuzzySet;
}());
exports.FuzzySet = FuzzySet;
