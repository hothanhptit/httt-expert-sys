import { FuzzyValue } from '..';
import { DefuzzicationType } from './types';
export const defuzzify = (type: DefuzzicationType, values: FuzzyValue[]): number => {
  switch (type) {
    case DefuzzicationType.Centroid:
      return centroid(values);
    default:
      throw new Error('Unexpected defuzzification type');
  }
};
export const centroid = (values: FuzzyValue[]): number => {
  const sums = values.reduce(
    (acc, { value, membership }) => ({
      top: acc.top + membership * value,
      bottom: acc.bottom + membership,
    }),
    {
      top: 0,
      bottom: 0,
    }
  );

  return sums.top / sums.bottom;
};

