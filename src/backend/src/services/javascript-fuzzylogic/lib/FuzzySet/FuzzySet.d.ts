import { DefuzzicationType } from '../defuzzify';
import { GenericMembershipFunctionParameters, MembershipFunction, MembershipFunctionParameters, MembershipFunctionType } from '../membershipFunction';
import { FuzzyValue } from './index';
export declare class FuzzySet {
    readonly name: string;
    values: FuzzyValue[];
    initialisationParameters?: GenericMembershipFunctionParameters;
    membershipFunctionType?: MembershipFunctionType;
    constructor(name: string, initialValues?: FuzzyValue[]);
    alphacut: (alpha: number, strong?: boolean) => number[];
    support: () => number[];
    height: () => number;
    isNormal: () => boolean;
    complement: () => FuzzyValue[];
    union: (fuzzySet: FuzzySet) => FuzzyValue[];
    intersection: (fuzzySet: FuzzySet) => FuzzyValue[];
    generateMembershipValues<T extends keyof MembershipFunctionParameters>(mf: MembershipFunction<T>): this;
    defuzzify: (type: DefuzzicationType) => number;
    getPlottableValues: () => {
        xValues: number[];
        membershipValues: number[];
    };
    getMembership: (xValue: number) => number | undefined;
}
