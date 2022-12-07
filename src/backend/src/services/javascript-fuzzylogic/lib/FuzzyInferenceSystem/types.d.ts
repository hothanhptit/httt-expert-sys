import { FuzzySet } from '../FuzzySet';
export interface EditLinguisticVariableArgs {
    name?: string;
    fuzzySets?: FuzzySet[];
}
export declare enum VariableType {
    'Input' = "Input",
    'Output' = "Output"
}
