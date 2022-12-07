import { DefuzzicationType } from './fuzzy/src/defuzzify/types';
import { FuzzyInferenceSystem } from './fuzzy/src/FuzzyInferenceSystem/FuzzyInferenceSystem';
import { FuzzySet } from './fuzzy/src/FuzzySet/FuzzySet';
import { LinguisticVariable } from './fuzzy/src/LinguisticVariable/LinguisticVariable';
import { MembershipFunctionType } from './fuzzy/src/membershipFunction/types';

export const hi = (
  gi: number,
  hdl: number,
  ldl: number,
  weight: number,
  height: number,
  triglyceride: number
) => {
  let inputs = new Array<number>;
  inputs[0] = gi;
  inputs[1] = hdl;
  inputs[2] = ldl;
  inputs[3] = weight;
  inputs[4] = height;
  inputs[5] = triglyceride;
  let layer = new Layer(6,12);
  // layler.add(inputs)

};

// good_bmi.generateMembershipValues({
//   type: MembershipFunctionType.Trapezoidal,
//   parameters: {
//     bottomLeft: 0,
//     topLeft: 0,
//     topRight: 1,
//     bottomRight: 1,
//     minValue: 0,
//     maxValue: 100,
//     step: 0.5,
//   },
// });

// const overw_bmi = new FuzzySet('overw_bmi');
// overw_bmi.generateMembershipValues({
//   type: MembershipFunctionType.Trapezoidal,
//   parameters: {
//     bottomLeft: 2,
//     topLeft: 2,
//     topRight: 3,
//     bottomRight: 3,
//     minValue: 0,
//     maxValue: 100,
//     step: 0.5,
//   },
// });

// const normal_gi = new FuzzySet('normal_gi');
// normal_gi.generateMembershipValues({
//   type: MembershipFunctionType.Trapezoidal,
//   parameters: {
//     bottomLeft: 0,
//     topLeft: 0,
//     topRight: 1,
//     bottomRight: 1,
//     minValue: 0,
//     maxValue: 100,
//     step: 0.5,
//   },
// });
// const bad_gi = new FuzzySet('bad_gi');
// bad_gi.generateMembershipValues({
//   type: MembershipFunctionType.Trapezoidal,
//   parameters: {
//     bottomLeft: 2,
//     topLeft: 2,
//     topRight: 3,
//     bottomRight: 3,
//     minValue: 0,
//     maxValue: 100,
//     step: 0.5,
//   },
// });

// const uh = new FuzzySet('unhealthy');
// uh.generateMembershipValues({
//   type: MembershipFunctionType.Trapezoidal,
//   parameters: {
//     bottomLeft: 0,
//     topLeft: 0,
//     topRight: 1,
//     bottomRight: 1,
//     minValue: 0,
//     maxValue: 100,
//     step: 0.5,
//   },
// });
// const healthy = new FuzzySet('healthy');
// healthy.generateMembershipValues({
//   type: MembershipFunctionType.Trapezoidal,
//   parameters: {
//     bottomLeft: 2,
//     topLeft: 2,
//     topRight: 3,
//     bottomRight: 3,
//     minValue: 0,
//     maxValue: 10,
//     step: 0.5,
//   },
// });
// const bmi = new LinguisticVariable('bmi')
//   .addSet(good_bmi)
//   .addSet(overw_bmi);

// const gi = new LinguisticVariable('gi').addSet(normal_gi).addSet(bad_gi);

// const hi = new LinguisticVariable('hi').addSet(uh).addSet(healthy);
// const HI_RES = new FuzzyInferenceSystem('HI')
//   .addInput(bmi)
//   .addInput(gi)
//   .addOutput(hi);
// HI_RES.addRule('IF bmi IS good_bmi AND gi IS normal_gi THEN hi IS healthy');
// HI_RES.addRule('IF bmi IS overw_bmi AND gi IS bad_gi THEN hi IS unhealthy');

// const re = HI_RES.solve(
//   'Mamdani',
//   { bmi: 1, gi: 1 },
//   DefuzzicationType.Centroid,
// );
// console.log(re);
// return re;
