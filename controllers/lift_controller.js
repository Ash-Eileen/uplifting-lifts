const Lift = require("../models/lift");
const LiftView = require("../views/lift_view");
let prompt = require("prompt-sync")();

class LiftController {
  constructor() {
    this.lift = new Lift();
    this.liftView = new LiftView();
    this.continueOperation = true;
  }

  getUpOrDownInstructions() {
    let response = this.liftView.shouldInstructionsBeAdded();
    if (response === "Y") {
      let numberOfInstructionsToAdd = this.liftView.numberOfInstructionsToAdd();
      while (numberOfInstructionsToAdd > 0) {
        let newestInstruction = this.liftView.newInstructionsToAdd();
        this.lift.addUpOrDownInstructions(newestInstruction);
        numberOfInstructionsToAdd--;
      }
    }
    if (response === "E") {
      console.log("Thank you for taking Uplifting Lifts.");
      this.continueOperation = false;
    }
  }

  getLevelInstructions() {
    this.lift.instructions.map((instruction) => {
      if (
        this.lift.direction === instruction.direction &&
        this.lift.currentFloor == instruction.level
      ) {
        let addFloor = this.liftView.addFloor();
        this.lift.addUpOrDownInstructions(addFloor);
      } else if (
        this.lift.currentFloor == this.lift.topFloorToVisit &&
        this.lift.currentFloor == instruction.level &&
        instruction.direction != "entered"
      ) {
        let addFloor = this.liftView.addFloor();
        this.lift.addUpOrDownInstructions(addFloor);
      }
      this.lift.direction === "up"
        ? this.lift.setTopFloorToVisit()
        : this.lift.setBottomFloorToVisit();
    });
  }

  setInstructionsAndTopAndBottomFloor() {
    this.getUpOrDownInstructions();
    this.lift.direction === "up"
      ? this.lift.setTopFloorToVisit()
      : this.lift.setBottomFloorToVisit();
  }

  startLiftAndSetInitialMovement() {
    this.liftView.displayLevelNumber(this.lift.currentFloor);
    this.getUpOrDownInstructions();
    this.lift.setTopFloorToVisit();
    if (this.shouldLiftOpen) {
      this.lift.openLift();
      this.getLevelInstructions();
    }
  }

  shouldLiftOpen() {
    return this.lift.openLift();
  }

  shouldLiftChangeDirections() {
    if (
      this.lift.direction === "up" &&
      this.lift.currentFloor == this.lift.topFloorToVisit
    ) {
      this.lift.changeDirection();
    } else if (
      this.lift.direction === "down" &&
      this.lift.currentFloor == this.lift.bottomFloorToVisit
    ) {
      this.lift.changeDirection();
    }
  }

  moveLift() {
    console.log(this.lift.instructions);
    if (
      this.lift.direction === "up" &&
      this.lift.topFloorToVisit != this.lift.currentFloor
    ) {
      this.lift.moveUp();
      this.liftView.displayLevelNumber(this.lift.currentFloor);
      this.setInstructionsAndTopAndBottomFloor();
      this.shouldLiftChangeDirections();
      if (this.shouldLiftOpen) {
        this.getLevelInstructions();
        this.lift.openLift();
      }
    } else if (
      this.lift.direction === "down" &&
      this.lift.bottomFloorToVisit != this.lift.currentFloor
    ) {
      this.lift.moveDown();
      this.liftView.displayLevelNumber(this.lift.currentFloor);
      this.setInstructionsAndTopAndBottomFloor();
      this.shouldLiftChangeDirections();
      if (this.shouldLiftOpen) {
        this.getLevelInstructions();
        this.lift.openLift();
      }
    }
  }

  moveLiftWithBasicUserInput() {
    if (
      this.lift.direction === "up" &&
      this.lift.topFloorToVisit != this.lift.currentFloor
    ) {
      this.lift.moveUp();
      this.liftView.displayLevelNumber(this.lift.currentFloor);
      this.shouldLiftChangeDirections();
      if (this.shouldLiftOpen) {
        this.getLevelInstructions();
        this.lift.openLift();
      }
    } else if (
      this.lift.direction === "down" &&
      this.lift.bottomFloorToVisit != this.lift.currentFloor
    ) {
      this.lift.moveDown();
      this.liftView.displayLevelNumber(this.lift.currentFloor);
      this.shouldLiftChangeDirections();
      if (this.shouldLiftOpen) {
        this.getLevelInstructions();
        this.lift.openLift();
      }
    }
  }

  operateLiftWithUserInput() {
    this.setInstructionsAndTopAndBottomFloor();
    while (this.continueOperation) {
      this.moveLift();
    }
  }

  operateLiftBasicUserInput() {
    let array = prompt("Please enter a list of instructions: ");
    this.liftView.displayLevelNumber(this.lift.currentFloor);
    this.lift.instructions = JSON.parse(array);
    this.lift.direction === "up"
      ? this.lift.setTopFloorToVisit()
      : this.lift.setBottomFloorToVisit();

    if (this.shouldLiftOpen) {
      this.getLevelInstructions();
      this.lift.openLift();
    }
    while (this.lift.instructions.length > 0) {
      this.moveLiftWithBasicUserInput();
    }
  }
}

let newLift = new LiftController();
newLift.operateLiftBasicUserInput();
// newLift.operateLiftBasicUserInput([
//   { level: 6, direction: "down" },
//   { level: 4, direction: "down" },
// ]);

module.exports = LiftController;
