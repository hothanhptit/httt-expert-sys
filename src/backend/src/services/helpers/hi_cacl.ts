import { FuzzySet } from '../helpers/fuzzy/FuzzySet';
import {
  DefuzzicationType,
  FuzzyInferenceSystem,
  LinguisticVariable,
} from './fuzzy';
import { MembershipFunctionType } from './fuzzy/membershipFunction/types';
import { Layer } from './neuralNetwork';

export const hi = (
  gi: number,
  ldl: number,
  hdl: number,
  triglyceride: number,
  weight: number,
  height: number
) => {
  let inputs = new Array<number>();
  inputs[0] = gi;
  inputs[1] = ldl;
  inputs[2] = hdl;
  inputs[3] = triglyceride;
  inputs[4] = weight;
  inputs[5] = height;

  let layer = new Layer(6, 12);
  layer.inputs = inputs;
  Layer.feedForward(inputs, layer);
  // console.log('in', layer.inputs);
  // console.log('bias', layer.biases);
  // console.log(layer.weights);
  // console.log('out', layer.outputs);

  const good_bmi = new FuzzySet('good_bmi');
  good_bmi.generateMembershipValues({
    type: MembershipFunctionType.Trapezoidal,
    parameters: {
      bottomLeft: 0,
      topLeft: 0,
      topRight: 3,
      bottomRight: 4,
      minValue: 0,
      maxValue: 1,
      step: 0.01,
    },
  });

  const overw_bmi = new FuzzySet('overw_bmi');

  const normal_gi = new FuzzySet('normal_gi');

  const bad_gi = new FuzzySet('bad_gi');

  const bad_chol = new FuzzySet('bad_chol');

  const nh = new FuzzySet('nh');
  nh.generateMembershipValues({
    type: MembershipFunctionType.Trapezoidal,
    parameters: {
      bottomLeft: 0,
      topLeft: 0,
      topRight: 3,
      bottomRight: 4,
      minValue: 0,
      maxValue: 1,
      step: 0.01,
    },
  });
  const snh = new FuzzySet('snh');
  snh.generateMembershipValues({
    type: MembershipFunctionType.Trapezoidal,
    parameters: {
      bottomLeft: 3,
      topLeft: 4,
      topRight: 6,
      bottomRight: 7,
      minValue: 0,
      maxValue: 1,
      step: 0.01,
    },
  });
  const sh = new FuzzySet('sh');
  sh.generateMembershipValues({
    type: MembershipFunctionType.Trapezoidal,
    parameters: {
      bottomLeft: 6,
      topLeft: 7,
      topRight: 8,
      bottomRight: 9,
      minValue: 0,
      maxValue: 1,
      step: 0.01,
    },
  });
  const h = new FuzzySet('h');
  h.generateMembershipValues({
    type: MembershipFunctionType.Trapezoidal,
    parameters: {
      bottomLeft: 8,
      topLeft: 9,
      topRight: 10,
      bottomRight: 10,
      minValue: 0,
      maxValue: 1,
      step: 0.05,
    },
  });
  const bmi = new LinguisticVariable('bmi').addSet(good_bmi).addSet(overw_bmi);

  const GI = new LinguisticVariable('gi').addSet(normal_gi).addSet(bad_gi);

  const chol = new LinguisticVariable('chol').addSet(bad_chol);

  const hi = new LinguisticVariable('hi')
    .addSet(nh)
    .addSet(snh)
    .addSet(sh)
    .addSet(h);

  const HI_RES = new FuzzyInferenceSystem('HI')
    .addInput(bmi)
    .addInput(GI)
    .addInput(chol)
    .addOutput(hi);
  HI_RES.addRule('IF bmi IS good_bmi AND gi IS normal_gi AND chol IS bad_chol THEN hi IS h');
  HI_RES.addRule('IF bmi IS overw_bmi AND gi IS bad_gi THEN hi IS nh');

  const re = HI_RES.solve(
    'Mamdani',
    { bmi: 0.5, gi: 0.213, chol: 0.23 },
    DefuzzicationType.Centroid
  );
  console.log(re);
  return re.toFixed(1);
};
