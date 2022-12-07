import { Antecedent, Consequent, LinguisticRuleOperator } from './types';
export declare class LinguisticRule {
    readonly operator: LinguisticRuleOperator;
    readonly antecedents: Antecedent[];
    readonly consequent: Consequent;
    constructor(operator: LinguisticRuleOperator, antecedents: Antecedent[], consequent: Consequent);
    prettyPrint: () => string;
}
