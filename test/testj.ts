import * as a from "javascript-fuzzylogic";
import { DefuzzicationType, MembershipFunctionType, triangularMembershipFunction } from "javascript-fuzzylogic";

// We start by creating our fuzzy sets (or membership functions) that will make up our variables
// How to construct fuzzy sets is dealt with below
const serviceGood = new a.FuzzySet("good");

serviceGood.generateMembershipValues({
  type: MembershipFunctionType.Triangular,
  parameters: {
    left: 0,
    center: 4,
    right: 8,
    minValue: 0,
    maxValue: 10,
    step: 1,
  },
});

const serviceBad = new a.FuzzySet("bad");
serviceBad.generateMembershipValues({
    type: MembershipFunctionType.Triangular,
    parameters: {
      left: 2,
      center: 6,
      right: 10,
      minValue: 0,
      maxValue: 10,
      step: 1,
    },
  });


const foodTasty = new a.FuzzySet("tasty");
foodTasty.generateMembershipValues({
    type: MembershipFunctionType.Triangular,
    parameters: {
      left: 0,
      center: 4,
      right: 8,
      minValue: 0,
      maxValue: 10,
      step: 1,
    },
  });
const foodGross = new a.FuzzySet("gross";
foodGross.generateMembershipValues({
    type: MembershipFunctionType.Triangular,
    parameters: {
      left: 2,
      center: 6,
      right: 10,
      minValue: 0,
      maxValue: 10,
      step: 1,
    },
  });

const cheapTip = new a.FuzzySet("cheap");
cheapTip.generateMembershipValues({
    type: MembershipFunctionType.Triangular,
    parameters: {
      left: 0,
      center: 4,
      right: 8,
      minValue: 0,
      maxValue: 10,
      step: 1,
    },
  });
const generousTip = new a.FuzzySet("generous");
generousTip.generateMembershipValues({
    type: MembershipFunctionType.Triangular,
    parameters: {
      left: 2,
      center: 6,
      right: 10,
      minValue: 0,
      maxValue: 10,
      step: 1,
    },
  });

// Then, we tie these fuzzy sets to variables
const serviceVariable = new a.LinguisticVariable("service")
  .addSet(serviceGood)
  .addSet(serviceBad);

const foodVariable = new a.LinguisticVariable("food")
  .addSet(foodTasty)
  .addSet(foodGross);

const tipVariable = new a.LinguisticVariable("tip")
  .addSet(cheapTip)
  .addSet(generousTip);

// Now that we have variables with sets, we attach them to a fuzzy inference system
const exampleFIS = new a.FuzzyInferenceSystem("Example")
  .addInput(serviceVariable)
  .addInput(foodVariable)
  .addOutput(tipVariable);

// Finally we add rules to our system, written in natural language
// The values must match our variables and their fuzzy sets
exampleFIS.addRule("IF service IS good AND food IS tasty THEN tip IS generous");
exampleFIS.addRule("IF service IS bad OR food IS gross THEN tip IS cheap");

const a = exampleFIS.solve(
  "Mamdani",
  { service: 10, food: 10 },
  DefuzzicationType.Centroid
);
console.log(a);

