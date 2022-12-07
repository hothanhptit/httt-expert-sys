import { FuzzySet } from '../FuzzySet';
export declare class LinguisticVariable {
    readonly name: string;
    fuzzySets: FuzzySet[];
    indexedFuzzySets: {
        [key: string]: FuzzySet;
    };
    constructor(name: string, fuzzySets?: FuzzySet[]);
    indexSets: () => void;
    addSet: (set: FuzzySet) => this;
    getSet: (name: string) => FuzzySet;
    removeSet: (name: string) => this;
    editSet: (name: string, newSet: FuzzySet) => this;
}
