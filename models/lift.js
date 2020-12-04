class Lift {
  constructor() {
    this.currentFloor = 1;
    this.initialInstructions = [];
    this.direction = 'stationary';
  }

  addInstructions(newInstructions) {
    return this.instructions.push(newInstructions);
  }

  moveUp() {
    return this.currentFloor++;
  }

  moveDown() {
    return this.currentFloor--;
  }
}

module.exports = Lift;
