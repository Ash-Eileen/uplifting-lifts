const Lift = require("../models/lift");
const LiftView = require("../views/lift_view");

class LiftController {
  constructor() {
    this.lift = new Lift();
    this.liftView = new LiftView();
    this.continueOperation = true;
  }

  getUpOrDownInstructions() {
    let response = this.liftView.shouldInstructionsBeAdded();
    if (response === "Y") {
      let numberOfInstructionsToAdd = Number(
        this.liftView.numberOfInstructionsToAdd()
      );
      for (let i = 1; numberOfInstructionsToAdd > 0; i++) {
        console.log(`Passenger ${i}:`);
        let newestInstruction = this.liftView.newInstructionsToAdd();
        this.lift.addInstructions(newestInstruction);
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
        this.lift.addInstructions(addFloor);
      } else if (
        this.lift.currentFloor == this.lift.topFloorToVisit &&
        this.lift.currentFloor == instruction.level &&
        instruction.direction != "entered"
      ) {
        let addFloor = this.liftView.addFloor();
        this.lift.addInstructions(addFloor);
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
    if (this.lift.instructions.length === 0) {
      console.log("Idling on Ground Floor");
      this.lift.currentFloor = 1;
      this.startLiftAndSetInitialMovement();
    } else if (
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
        this.lift.open = false
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
        this.lift.open = false;
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
        this.lift.open = false
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
        this.lift.open = false
      }
    }
  }

  operateLiftWithUserInput() {
    this.setInstructionsAndTopAndBottomFloor();
    if (this.shouldLiftOpen) {
      this.getLevelInstructions();
      this.lift.openLift();
      this.lift.open = false;
    }
    while (this.continueOperation) {
      this.moveLift();
    }
    if (!this.continueOperation) {
      process.exit();
    }
  }

  operateLiftBasicUserInput() {
    let array = this.liftView.getFullInstructionsAtStart();
    this.liftView.displayLevelNumber(this.lift.currentFloor);
    this.lift.instructions = JSON.parse(array);
    this.lift.direction === "up"
      ? this.lift.setTopFloorToVisit()
      : this.lift.setBottomFloorToVisit();
    if (this.shouldLiftOpen) {
      this.getLevelInstructions();
      this.lift.openLift();
      this.lift.open = false;
    }
    while (this.lift.instructions.length > 0) {
      this.moveLiftWithBasicUserInput();
    }
    if (this.lift.instructions.length === 0) {
      process.exit();
    }
  }
}

module.exports = LiftController;
