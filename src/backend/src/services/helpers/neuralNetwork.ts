class NeuralNetwork {
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

class Layer {
  inputs: number[];
  outputs: number[];
  biases: number[];
  weights: any[];

  constructor(inputCount: number, outputCount: number) {
    this.inputs = new Array(inputCount);
    this.outputs = new Array(outputCount);
    this.biases = new Array(outputCount);
    this.weights = new Array(inputCount);

    for (let i = 0; i < inputCount; i++) {
      this.weights[i] = new Array(outputCount);
    }

    // Layer.#randomize(this);
  }

  static feedForward(givenInputs, level) {
    for (let i = 0; i < level.inputs.length; i++) {
      level.inputs[i] = givenInputs[i];
    }

    for (let i = 0; i < level.outputs.length; i++) {
      let sum = 0;
      for (let j = 0; j < level.inputs.length; j++) {
        sum += level.inputs[j] * level.weights[j][i];
      }

      if (sum > level.biases[i]) {
        level.outputs[i] = 1;
      } else {
        level.outputs[i] = 0;
      }
    }

    return level.outputs;
  }
}

// static #randomize(level) {
//   for (let i = 0; i < level.inputs.length; i++) {
//     for (let j = 0; j < level.outputs.length; j++) {
//       level.weights[i][j] = Math.random() * 2 - 1;
//     }
//   }

//   for (let i = 0; i < level.biases.length; i++) {
//     level.biases[i] = Math.random() * 2 - 1;
//   }
// }
