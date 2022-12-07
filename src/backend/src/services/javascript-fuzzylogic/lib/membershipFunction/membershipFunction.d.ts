import { FuzzyValue } from '../index';
import { GaussianMembershipFunctionParams, MembershipFunction, MembershipFunctionParameters, SigmoidalMembershipFunctionParams, TrapezoidalMembershipFunctionParams, TriangularMembershipFunctionParams } from './types';
/**
 * Given a particular membership function definition, generate all values for that
 * membership function between the range given, at each step interval
 */
export declare function generateMembershipValues<T extends keyof MembershipFunctionParameters>(mf: MembershipFunction<T>): FuzzyValue[];
/**
 * Generates a triangular shape.
 * All values before `left` are zero, `center` is one, and all values after `right` are zero
 */
export declare const triangularMembershipFunction: (xValue: number, { left, center, right }: TriangularMembershipFunctionParams) => number;
/**
 * Generates a trapezoidal shape.
 * All values because `bottomLeft` are zero, `topLeft` to `topRight` is one, and all values
 * after `bottomRight` are zero
 */
export declare const trapezoidalMembershipFunction: (xValue: number, { bottomLeft, topLeft, topRight, bottomRight }: TrapezoidalMembershipFunctionParams) => number;
export declare const gaussianMembershipFunction: (xValue: number, { center, standardDeviation }: GaussianMembershipFunctionParams) => number;
export declare const sigmoidalMembershipFunction: (xValue: number, { center, slope }: SigmoidalMembershipFunctionParams) => number;
