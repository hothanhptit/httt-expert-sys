import { DefuzzicationType } from '../defuzzify';
import { LinguisticVariable } from '../index';
import { LinguisticRule } from '../LinguisticRule';
import { EditLinguisticVariableArgs, VariableType } from './types';
export declare class FuzzyInferenceSystem {
    name: string;
    inputs: LinguisticVariable[];
    outputs: LinguisticVariable[];
    rules: LinguisticRule[];
    constructor(name: string, inputs?: LinguisticVariable[], outputs?: LinguisticVariable[]);
    addVariable: (variable: LinguisticVariable, type: VariableType) => this;
    removeVariable: (name: string, type: VariableType) => this;
    removeInput: (name: string) => this;
    removeOutput: (name: string) => this;
    editVariable: (name: string, { name, fuzzySets }: EditLinguisticVariableArgs, type: VariableType) => this;
    editInput: (name: string, { name, fuzzySets }: EditLinguisticVariableArgs) => this;
    editOutput: (name: string, { name, fuzzySets }: EditLinguisticVariableArgs) => this;
    addInput: (newVariable: LinguisticVariable) => this;
    addOutput: (newVariable: LinguisticVariable) => this;
    addRule: (rule: string) => this;
    checkAntecedentsAndConsequentAreValid: (antecedents: string[][], consequent: string[]) => void;
    solve: (type: 'Mamdani', args: Record<string, number>, defuzzicationMethod: DefuzzicationType) => number;
}
