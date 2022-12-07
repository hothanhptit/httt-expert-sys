import { DefuzzicationType } from '../defuzzify';
import { LinguisticVariable } from '../index';
import { LinguisticRule } from '../LinguisticRule';
import { EditLinguisticVariableArgs, VariableType } from './types';
import { mamdaniInference } from './utils';

export class FuzzyInferenceSystem {
  name: string;
  inputs: LinguisticVariable[];
  outputs: LinguisticVariable[];
  rules: LinguisticRule[];

  constructor(
    name: string,
    inputs: LinguisticVariable[] = [],
    outputs: LinguisticVariable[] = []
  ) {
    this.name = name;
    this.inputs = inputs;
    this.outputs = outputs;
    this.rules = [];
  }

  addVariable = (variable: LinguisticVariable, type: VariableType) => {
    if (type === 'Input') {
      this.inputs.push(variable);
    } else {
      this.outputs.push(variable);
    }
    return this;
  };

  addInput = (newVariable: LinguisticVariable) => {
    if (this.inputs.find((variable) => variable.name === newVariable.name)) {
      throw new Error('An input with that name already exists');
    }
    return this.addVariable(newVariable, VariableType.Input);
  };

  addOutput = (newVariable: LinguisticVariable) => {
    if (this.outputs.find((variable) => variable.name === newVariable.name)) {
      throw new Error('An output with that name already exists');
    }
    return this.addVariable(newVariable, VariableType.Output);
  };

  addRule = (rule: string) => {
    const operator = rule.match('AND') ? 'AND' : 'OR';
    const parts = rule.split(/IF|IS|THEN|AND|OR| /).filter(Boolean);

    if (parts.length % 2 !== 0) {
      throw new Error('Rule string is malformed');
    }

    const antecedents: string[][] = [];
    const consequent: string[] = [];
    for (let i = 0; i < parts.length; i += 2) {
      if (i === parts.length - 2) {
        consequent.push(parts[i]);
        consequent.push(parts[i + 1]);
      } else {
        antecedents.push([parts[i], parts[i + 1]]);
      }
    }

    if (antecedents.length === 0) {
      throw new Error('No antecedents (inputs) specified');
    }

    if (consequent.length === 0) {
      throw new Error('No consequent (output) specified');
    }

    const linguisticRule = new LinguisticRule(
      operator,
      antecedents.map((antecedentParts) => ({
        linguisticVariable: antecedentParts[0],
        fuzzySet: antecedentParts[1],
      })),
      {
        linguisticVariable: consequent[0],
        fuzzySet: consequent[1],
      }
    );

    this.rules.push(linguisticRule);
    return this;
  };

  solve = (
    type: 'Mamdani',
    args: Record<string, number>,
    defuzzicationMethod: DefuzzicationType
  ): number => {
    if (type === 'Mamdani') {
      return mamdaniInference(
        this.inputs,
        this.outputs,
        this.rules,
        args,
        defuzzicationMethod
      );
    }
    throw new Error('Unknown defuzzification method specified');
  };
}
