import { FuzzySet, FuzzyValue } from './index';
export declare const alphacut: (set: FuzzySet, alpha: number, strong?: boolean) => number[];
/**
 * The support of a fuzzy set, A, is a strong α-cut of A, where α = 0.
 * Thus, the support of a fuzzy set is all non zero values of that set.
 */
export declare const support: (set: FuzzySet) => number[];
/**
 * The height of a fuzzy set is the largest membership grade attained by any
 * element of that set.
 */
export declare const height: (set: FuzzySet) => number;
/**
 * A fuzzy set is said to be normalised if at least one its elements attains the
 * maximum possible membership grade (of 1).
 */
export declare const isNormal: (set: FuzzySet) => boolean;
export declare const isConvex: (set: FuzzySet) => boolean;
export declare const complement: (set: FuzzySet) => FuzzyValue[];
/**
 * The union of two fuzzy sets, A and B, is a new fuzzy set with all values
 * with the minimum membership value
 */
export declare const intersection: (setA: FuzzySet, setB: FuzzySet) => FuzzyValue[];
/**
 * The union of two fuzzy sets, A and B, is a new fuzzy set with all values
 * with the maximum membership value
 */
export declare const union: (setA: FuzzySet, setB: FuzzySet) => FuzzyValue[];
/**
 * Given a array of fuzzy values, return them as an object indexed by their `x` value
 */
export declare const indexByXValue: (values: FuzzyValue[]) => {
    [key: number]: number;
};
/**
 * For a fuzzy set, return two arrays: the x values, and the membership values,
 * so that they can be plotted on a graph
 */
export declare const getPlottableValues: (set: FuzzySet) => {
    xValues: number[];
    membershipValues: number[];
};
/**
 * For a given x value, find the membership value it possesses
 */
export declare const getMembershipValue: (set: FuzzySet, xValue: number) => number | undefined;
