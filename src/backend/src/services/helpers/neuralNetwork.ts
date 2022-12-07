import { bmi } from './activeFn';
export class NeuralNetwork {
  levels: Layer[];

  constructor(neuronCounts) {
    this.levels = [];
    for (let i = 0; i < neuronCounts.length - 1; i++) {
      this.levels.push(new Layer(neuronCounts[i], neuronCounts[i + 1]));
    }
  }

  static feedForward(givenInputs, network) {
    let outputs = Layer.feedForward(givenInputs, network.levels[0]);
    for (let i = 1; i < network.levels.length; i++) {
      outputs = Layer.feedForward(outputs, network.levels[i]);
    }
    return outputs;
  }
}

export class Layer {
  inputs: number[];
  outputs: number[];
  biases: number[];
  weights: any[];

  constructor(inputCount: number, outputCount: number) {
    this.inputs = new Array(inputCount);
    this.outputs = new Array(outputCount);
    this.biases = new Array(outputCount).fill(0);
    this.weights = new Array(inputCount);

    for (let i = 0; i < inputCount; i++) {
      this.weights[i] = new Array(outputCount).fill(0);
    }
    for (let i = 0; i < 1; i++) {
      this.weights[i][0] = 1;
      this.weights[i][1] = 1;
      this.weights[i][2] = 1;
    }
    for (let i = 1; i < 3; i++) {
      this.weights[i][3] = 1;
      this.weights[i][4] = 1;
      this.weights[i][5] = 1;
    }
    for (let i = 3; i < 4; i++) {
      this.weights[i][3] = 0.2;
      this.weights[i][4] = 0.2;
      this.weights[i][5] = 0.2;
    }
    for (let i = 4; i < 6; i++) {
      this.weights[i][6] = 1;
      this.weights[i][7] = 1;
      this.weights[i][8] = 1;
      this.weights[i][9] = 1;
      this.weights[i][10] = 1;
      this.weights[i][11] = 1;
    }
  }

  static feedForward(givenInputs, level) {
    for (let i = 0; i < level.inputs.length; i++) {
      level.inputs[i] = givenInputs[i];
    }

    for (let i = 0; i < level.outputs.length - 6; i++) {
      let sum = 0;

      for (let j = 0; j < level.inputs.length; j++) {
        sum += level.inputs[j] * level.weights[j][i];
      }

      // ham kich hoat x1
      if (sum <= 90) {
        level.outputs[0] = 1;
      } else if (90 >= sum && sum <= 110) {
        level.outputs[0] = -sum / 20 + 11 / 20;
      } else level.outputs[0] = 0;

      // ham kich hoat x2
      if (sum <= 90) {
        level.outputs[1] = 0;
      } else if (90 >= sum && sum <= 110) {
        level.outputs[1] = sum / 20 - 9 / 2;
      } else if (110 >= sum && sum <= 120) {
        level.outputs[1] = 1;
      } else level.outputs[1] = 0;

      // ham kich hoat x3
      if (sum <= 120) {
        level.outputs[2] = 0;
      } else if (120 >= sum && sum <= 130) {
        level.outputs[2] = sum / 10 - 12;
      } else level.outputs[2] = 1;

      // ham kich hoat x4
      if (sum <= 190) {
        level.outputs[3] = 1;
      } else if (190 >= sum && sum <= 210) {
        level.outputs[3] = -sum / 20 + 21 / 2;
      } else level.outputs[3] = 0;

      // ham kich hoat x5
      if (sum <= 190) {
        level.outputs[4] = 0;
      } else if (190 >= sum && sum <= 210) {
        level.outputs[4] = sum / 20 - 19 / 2;
      } else if (230 >= sum && sum <= 240) {
        level.outputs[4] = -sum / 10 + 24;
      } else level.outputs[4] = 0;

      // ham kich hoat x6
      if (sum <= 230) {
        level.outputs[5] = 0;
      } else if (230 >= sum && sum <= 240) {
        level.outputs[5] = sum / 10 - 23;
      } else level.outputs[5] = 1;
    }

    // tinh bmi
    for (let i = 6; i < level.outputs.length; i++) {
      let sum = 0;
      // for (let j = 0; j < level.inputs.length; j++) {
      // sum += level.inputs[j] * level.weights[j][i];
      // }
      // input 4 la can nang, 5 la chieu cao
      sum = parseFloat(bmi(level.inputs[4], level.inputs[5]));

      // ham kich hoat x7
      if (sum <= 18) {
        level.outputs[6] = 1;
      } else if (18 >= sum && sum <= 19) {
        level.outputs[6] = -sum + 19;
      } else level.outputs[6] = 0;

      // ham kich hoat x8
      if (sum <= 18) {
        level.outputs[7] = 0;
      } else if (180 > sum && sum < 19) {
        level.outputs[7] = sum - 18;
      } else if (sum >= 19 && sum <= 24.5) {
        level.outputs[7] = 1;
      } else if (sum >= 24.5 && sum <= 25.5) {
        level.outputs[7] = -sum + 81 / 2;
      } else level.outputs[7] = 0;

      // ham kich hoat x9
      if (sum < 24.5) {
        level.outputs[8] = 0;
      } else if (24.5 >= sum && sum <= 25.5) {
        level.outputs[8] = sum - 49 / 2;
      } else if (25.5 >= sum && sum <= 29.5) {
        level.outputs[8] = 1;
      } else if (29.5 >= sum && sum <= 30.5) {
        level.outputs[8] = -sum + 61 / 2;
      } else level.outputs[8] = 0;

      // ham kich hoat x10
      if (sum < 29.5) {
        level.outputs[9] = 0;
      } else if (29.5 >= sum && sum <= 30.5) {
        level.outputs[9] = sum - 59 / 2;
      } else if (30.5 >= sum && sum <= 34.5) {
        level.outputs[9] = 1;
      } else if (24.5 >= sum && sum <= 35.5) {
        level.outputs[9] = -sum + 71 / 2;
      } else level.outputs[9] = 0;

      // ham kich hoat x11
      if (sum < 34.5) {
        level.outputs[10] = 0;
      } else if (34.5 >= sum && sum <= 35.5) {
        level.outputs[10] = sum - 69 / 2;
      } else if (35.5 >= sum && sum <= 39.5) {
        level.outputs[10] = 1;
      } else if (39.5 >= sum && sum <= 40.5) {
        level.outputs[10] = -sum + 81 / 2;
      } else level.outputs[10] = 0;

      // ham kich hoat x12
      if (sum < 39.5) {
        level.outputs[11] = 0;
      } else if (39.5 >= sum && sum <=40.5) {
        level.outputs[11] = sum - 79 / 2;
      } else level.outputs[5] = 1;
    }

    return level.outputs;
  }
}
