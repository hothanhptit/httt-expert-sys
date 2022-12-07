import { FuzzyValue } from '../FuzzySet';
import { DefuzzicationType } from './types';
/**
 * Applies a defuzzification method (defined below) to an array of fuzzy values
 */
export declare const defuzzify: (type: DefuzzicationType, values: FuzzyValue[]) => number;
/**
 * Gets all fuzzy values with maximum membership in the given set
 */
export declare const getMaxima: (values: FuzzyValue[]) => FuzzyValue[];
/**
 * The 'balance point' of the set, i.e, where the center of gravity
 * of the shape would be
 */
export declare const centroid: (values: FuzzyValue[]) => number;
export declare const meanOfMaxima: (values: FuzzyValue[]) => number;
export declare const smallestOfMaxima: (values: FuzzyValue[]) => number;
export declare const largestOfMaxima: (values: FuzzyValue[]) => number;
