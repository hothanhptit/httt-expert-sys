import { FuzzySet } from '../FuzzySet';

export class LinguisticVariable {
  readonly name: string;
  fuzzySets: FuzzySet[];
  indexedFuzzySets: { [key: string]: FuzzySet } = {};

  constructor(name: string, fuzzySets: FuzzySet[] = []) {
    this.name = name;
    this.fuzzySets = fuzzySets;
    this.indexSets();
  }

  indexSets = () => {
    this.indexedFuzzySets = this.fuzzySets.reduce(
      (acc, fuzzySet) => ({
        ...acc,
        [fuzzySet.name]: fuzzySet,
      }),
      {}
    );
  };

  addSet = (set: FuzzySet) => {
    if (this.indexedFuzzySets[set.name] !== undefined) {
      throw new Error('A set with that name already exists');
    }
    this.fuzzySets.push(set);
    this.indexedFuzzySets[set.name] = set;
    return this;
  };

}
