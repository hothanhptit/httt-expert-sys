import { Antecedent, Consequent, LinguisticRuleOperator } from './types';

export class LinguisticRule {
  readonly operator: LinguisticRuleOperator;
  readonly antecedents: Antecedent[];
  readonly consequent: Consequent;

  constructor(operator: LinguisticRuleOperator, antecedents: Antecedent[], consequent: Consequent) {
    this.operator = operator;
    this.antecedents = antecedents;
    this.consequent = consequent;
  }
}
