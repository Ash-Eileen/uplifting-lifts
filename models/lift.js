class Lift {
  constructor() {
    this.currentFloor = 1;
    this.instructions = [];
    this.direction = 'up';
    this.topFloorToVisit = 1;
    this.bottomFloorToVisit = 1;
  }

  addUpOrDownInstructions(newInstructions) {
    return this.instructions.push(newInstructions);
  }

  moveUp() {
    return this.currentFloor++;
  }

  moveDown() {
    return this.currentFloor--;
  }

  setTopFloorToVisit() {
    this.topFloorToVisit = this.instructions.reduce((acc, val) => (val.level > acc) ? val.level : acc , this.topFloorToVisit)
    return this.topFloorToVisit
  }

  setBottomFloorToVisit() {
    this.bottomFloorToVisit = this.instructions.reduce((acc, val) => (val.level < acc) ? val.level : acc , this.bottomFloorToVisit)
    return this.bottomFloorToVisit
  }

  changeDirection() {
    this.direction = "up" ? "down" : "up"
    (this.direction === "up") ? this.setTopFloorToVisit() : this.setBottomFloorToVisit()
    return this.direction
  }

  openLift() {
    this.instructions.map((instruction) => {
      if (this.direction === "up" && (instruction.direction === "up" || instruction.direction === "entered") && this.currentFloor == instruction.level) {
        this.removeInstruction(instruction)
        return true
      } else if (this.direction === "down" && (instruction.direction === "down" || instruction.direction === "entered") && this.currentFloor == instruction.level) {
        this.removeInstruction(instruction)
        return true
      } else {
        return false
      }
    })
  }

  removeInstruction(currentInstruction) {
    this.instructions = this.instructions.filter(instruction => instruction != currentInstruction)
    return this.instructions
  }

}

module.exports = Lift;
