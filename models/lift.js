class Lift {
  constructor() {
    this.currentFloor = 1;
    this.instructions = [];
    this.direction = "up";
    this.topFloorToVisit = 1;
    this.bottomFloorToVisit = 1;
    this.open = false;
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

  // Updates topFloorToVisit
  setTopFloorToVisit() {
    this.topFloorToVisit = this.instructions.reduce(
      (acc, val) => (Number(val.level) > Number(acc) ? val.level : acc),
      this.topFloorToVisit
    );
    return this.topFloorToVisit;
  }

  // Updates bottomFloorToVisit
  setBottomFloorToVisit() {
    this.bottomFloorToVisit = this.instructions.reduce(
      (acc, val) => (Number(val.level) < Number(acc) ? val.level : acc),
      this.bottomFloorToVisit
    );
    return this.bottomFloorToVisit;
  }

  // Changes lift direction
  changeDirection() {
    this.direction = "up"
      ? "down"
      : "up"(this.direction === "up")
      ? this.setTopFloorToVisit()
      : this.setBottomFloorToVisit();
    return this.direction;
  }

  // Opens lift and removes old instructions calling removeInstruction. Also logs that passenger disembarked.
  openLift() {
    this.instructions.map((instruction) => {
      switch (this.direction) {
        case "up":
          if (
            (instruction.direction === "up" ||
              instruction.direction === "entered") &&
            this.currentFloor == instruction.level
          ) {
            if (instruction.direction === "entered") {
              console.log("Passenger disembarked");
            }
            this.removeInstruction(instruction);
            this.open = true;
          }
          break;
        case "down":
          if (
            (instruction.direction === "down" ||
              instruction.direction === "entered") &&
            this.currentFloor == instruction.level
          ) {
            if (instruction.direction === "entered") {
              console.log("Passenger disembarked");
            }
            this.removeInstruction(instruction);
            this.open = true;
          }
        default:
      }
    });
    return this.open;
  }

  // Removes instructions that are no longer needed.
  removeInstruction(currentInstruction) {
    this.instructions = this.instructions.filter(
      (instruction) => instruction != currentInstruction
    );
    return this.instructions;
  }
}

module.exports = Lift;
