const Lift = require("../models/lift");
const LiftView = require("../views/lift_view");

class LiftController {
  constructor() {
    this.lift = new Lift();
    this.liftView = new LiftView();
  }

  getInstructions() {
    let response = this.liftView.shouldInstructionsBeAdded();
    if (response === "Y") {
      let numberOfInstructionsToAdd = this.liftView.numberOfInstructionsToAdd();
      while (numberOfInstructionsToAdd > 0) {
        let newestInstruction = this.liftView.newInstructionsToAdd();
        this.lift.addUpOrDownInstructions(newestInstruction);
        numberOfInstructionsToAdd--;
      }
    }

    this.lift.instructions.map(instruction => {
      console.log(this.lift.direction);
      console.log(instruction.direction);
      if (this.lift.direction === instruction.direction && this.lift.currentFloor == instruction.level) {
        let addFloor = this.liftView.addFloor()
        this.lift.addUpOrDownInstructions(addFloor);       
      } else if (this.lift.currentFloor == instruction.level) {
        this.lift.currentFloor === instruction.level
      }
    })
  }

  setInstructionsAndLiftMovement(){
    this.getInstructions();
    this.lift.direction === "up" ? this.lift.setTopFloorToVisit() : this.lift.setBottomFloorToVisit()
  }

  startLiftAndSetInitialMovement() {
    this.liftView.displayLevelNumber(this.lift.currentFloor);
    this.getInstructions();
    this.lift.setTopFloorToVisit();
    if (this.shouldLiftOpen) {this.lift.openLift()}
    // this.liftView.displayReceivedInstructions(this.lift.instructions);
  }

  shouldLiftOpen() {
    return this.lift.openLift()
  }

  shouldLiftChangeDirections() {
    if (this.lift.direction === "up" && this.lift.currentFloor == this.lift.topFloorToVisit) {
      this.lift.changeDirection()
    } else if (this.lift.direction === "down" && this.lift.currentFloor == this.lift.bottomFloorToVisit) {
      this.lift.changeDirection()
    }
  }

  moveLift() {
    if (this.lift.direction === "up" && this.lift.topFloorToVisit != this.lift.currentFloor) {
      this.lift.moveUp()
      if (this.shouldLiftOpen) {this.lift.openLift()}
      this.liftView.displayLevelNumber(this.lift.currentFloor)
      this.shouldLiftChangeDirections()
      this.setInstructionsAndLiftMovement()
    } else if (this.lift.direction === "down" && this.lift.bottomFloorToVisit != this.lift.currentFloor) {
      this.lift.moveDown()
      if (this.shouldLiftOpen) {this.lift.openLift()}
      this.liftView.displayLevelNumber(this.lift.currentFloor)
      this.shouldLiftChangeDirections()
      this.setInstructionsAndLiftMovement()
    }
  }

  operateLift() {
    this.startLiftAndSetInitialMovement()
    while (this.lift.instructions.length > 0 ) {
      console.log(this.lift.instructions)
      this.moveLift()
    }
  }
}

let newLift = new LiftController();

newLift.operateLift()

module.exports = LiftController;
