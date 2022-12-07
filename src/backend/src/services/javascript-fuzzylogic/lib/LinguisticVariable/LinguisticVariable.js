"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.LinguisticVariable = void 0;
var LinguisticVariable = /** @class */ (function () {
    function LinguisticVariable(name, fuzzySets) {
        if (fuzzySets === void 0) { fuzzySets = []; }
        var _this = this;
        this.indexedFuzzySets = {};
        this.indexSets = function () {
            _this.indexedFuzzySets = _this.fuzzySets.reduce(function (acc, fuzzySet) {
                var _a;
                return (__assign(__assign({}, acc), (_a = {}, _a[fuzzySet.name] = fuzzySet, _a)));
            }, {});
        };
        this.addSet = function (set) {
            if (_this.indexedFuzzySets[set.name] !== undefined) {
                throw new Error('A set with that name already exists');
            }
            _this.fuzzySets.push(set);
            _this.indexedFuzzySets[set.name] = set;
            return _this;
        };
        this.getSet = function (name) {
            if (_this.indexedFuzzySets[name] === undefined) {
                throw new Error('No set with that name exists');
            }
            return _this.indexedFuzzySets[name];
        };
        this.removeSet = function (name) {
            _this.fuzzySets = _this.fuzzySets.filter(function (set) { return set.name !== name; });
            _this.indexSets();
            return _this;
        };
        this.editSet = function (name, newSet) {
            var i = _this.fuzzySets.findIndex(function (set) { return set.name === name; });
            _this.fuzzySets = __spreadArray(__spreadArray(__spreadArray([], _this.fuzzySets.slice(0, i), true), [
                newSet
            ], false), _this.fuzzySets.slice(i + 1, _this.fuzzySets.length), true);
            _this.indexSets();
            return _this;
        };
        this.name = name;
        this.fuzzySets = fuzzySets;
        this.indexSets();
    }
    return LinguisticVariable;
}());
exports.LinguisticVariable = LinguisticVariable;
