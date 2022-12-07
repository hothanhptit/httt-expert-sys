import { FuzzyValue, MembershipFunctionType } from '../index';
import {
  MembershipFunction,
  MembershipFunctionParameters, TrapezoidalMembershipFunctionParams
} from './types';

/**
 * Given a particular membership function definition, generate all values for that
 * membership function between the range given, at each step interval
 */
export function generateMembershipValues<T extends keyof MembershipFunctionParameters>(
  mf: MembershipFunction<T>
) {
  const { minValue, maxValue, step, ...rest } = mf.parameters;
  const values: FuzzyValue[] = [];

  const fn = (x: number): number => {
    switch (mf.type) {
      case MembershipFunctionType.Trapezoidal:
        return trapezoidalMembershipFunction(x, rest as unknown as TrapezoidalMembershipFunctionParams);
      default:
        throw new Error('Unexpected membership function type');
    }
  };

  for (let i = minValue; i <= maxValue; i += step) {
    values.push({
      value: i,
      membership: fn(i),
    });
  }

  return values;
}

export const trapezoidalMembershipFunction = (
  xValue: number,
  { bottomLeft, topLeft, topRight, bottomRight }: TrapezoidalMembershipFunctionParams
): number => {
  const values = [
    (xValue - bottomLeft) / (topLeft - bottomLeft),
    1,
    (bottomRight - xValue) / (bottomRight - topRight),
  ].filter((value) => !isNaN(value));

  return Math.max(Math.min(...values), 0);
};

