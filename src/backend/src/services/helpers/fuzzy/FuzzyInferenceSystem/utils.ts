import { FuzzySet, FuzzyValue } from '..';
import { DefuzzicationType, defuzzify } from '../defuzzify';
import { LinguisticRule } from '../LinguisticRule';
import { LinguisticVariable } from '../LinguisticVariable';


export const mamdaniInference = (
  inputs: LinguisticVariable[],
  outputs: LinguisticVariable[],
  rules: LinguisticRule[],
  args: Record<string, number>,
  defuzzicationMethod: DefuzzicationType
): number => {
  const variables: Record<string, { [key: string]: FuzzySet }> = [
    ...inputs,
    ...outputs,
  ].reduce((acc, variable) => {
    return {
      ...acc,
      [variable.name]: variable.indexedFuzzySets,
    };
  }, {});


  const outputSets = rules.map((rule) => {
    // Get all membership values for the antecedents
    const inputMembershipValues: number[] = rule.antecedents.map(
      ({ linguisticVariable, fuzzySet }) => {
        const variable = variables[linguisticVariable][fuzzySet];
        if (variable === undefined) {
          throw new Error(
            `Unable to find variable ${linguisticVariable} with set ${fuzzySet}`
          );
        }
        const value =args[linguisticVariable];
        // const value = variable.getMembership(args[linguisticVariable]);
        console.log('12', value);
        if (value === undefined) {
          throw new Error(
            `Unable to get find get membership for arg ${linguisticVariable} from ${linguisticVariable} with set ${fuzzySet}`
          );
        }
        return value;
      }
    );

    const singleInputValue = Math.min(...inputMembershipValues)
    console.log("as",singleInputValue);
    
        
    // Create a new FuzzyValue[] that uses the minimum value from the singleInputValue or
    // the membership of each xValue in the output set
    return variables[rule.consequent.linguisticVariable][
      rule.consequent.fuzzySet
    ].values.map(({ value, membership }) => {


      // console.log(value, membership);
      
      return {
        value,
        membership: Math.min(singleInputValue, membership),
      };
    });
  });

  // Combine all the output sets into a single set
  const singleOutputSet = combineSetsWithMaximum(outputSets);
  console.log('out',singleOutputSet);
  
  
  return defuzzify(defuzzicationMethod, singleOutputSet);
};

export const combineSetsWithMaximum = (sets: FuzzyValue[][]): FuzzyValue[] => {
  const firstSet = sets[0];
  const minimumOfSets = firstSet.map(({ value }, i) => {
    const membershipForAllSets = sets.map((set) => set[i].membership);
    return {
      value,
      membership: Math.max(...membershipForAllSets),
    };
  });
  return minimumOfSets;
};
