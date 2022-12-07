import { DefuzzicationType } from '../defuzzify';
import { FuzzyValue } from '../FuzzySet';
import { LinguisticRule } from '../LinguisticRule';
import { LinguisticVariable } from '../LinguisticVariable';
export declare const mamdaniInference: (inputs: LinguisticVariable[], outputs: LinguisticVariable[], rules: LinguisticRule[], args: Record<string, number>, defuzzicationMethod: DefuzzicationType) => number;
export declare const combineSetsWithMaximum: (sets: FuzzyValue[][]) => FuzzyValue[];
