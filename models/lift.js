class Lift {
  constructor() {
    this.current_floor = 1;
    this.instructions = [];
    this.direction = "";
    this.floorsToGoTo = [];
  }

  addInstructions(newInstructions) {
    return this.instructions.push(newInstructions);
  }
}

module.exports = Lift;
