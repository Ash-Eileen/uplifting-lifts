const Lift = require("../models/lift");
const LiftView = require("../views/lift_view");

class LiftController {
  constructor() {
    this.lift = new Lift();
    this.liftView = new LiftView();
    this.continueOperation = true;
  }

  // Gets instructions for the floor and direction before a passenger enters the lift.
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

  // When passenger enters the lift it gets their desired level and sets their direction as "entered"
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

  // Uses get up or down instructions and sets the highest floor or lowest floor needed to travel to.
  setInstructionsAndTopAndBottomFloor() {
    this.getUpOrDownInstructions();
    this.lift.direction === "up"
      ? this.lift.setTopFloorToVisit()
      : this.lift.setBottomFloorToVisit();
  }

  // Used at startup for interface mode
  startLiftAndSetInitialMovement() {
    this.liftView.displayLevelNumber(this.lift.currentFloor);
    this.getUpOrDownInstructions();
    this.lift.setTopFloorToVisit();
    if (this.shouldLiftOpen) {
      this.lift.openLift();
      this.getLevelInstructions();
    }
  }

  // Tests if lift should open
  shouldLiftOpen() {
    return this.lift.openLift();
  }

  // If lift should open gets the level for the passenger, removes old instructions and then sets this.lift.open back to false.
  openingLiftSteps() {
    if (this.shouldLiftOpen) {
      this.getLevelInstructions();
      this.lift.openLift();
      this.lift.open = false;
    }
  }

  // Tests if lift should change direction and if so changes direction
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

  // Controls movement of lift and gets further instructions as required
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
      this.openingLiftSteps();
    } else if (
      this.lift.direction === "down" &&
      this.lift.bottomFloorToVisit != this.lift.currentFloor
    ) {
      this.lift.moveDown();
      this.liftView.displayLevelNumber(this.lift.currentFloor);
      this.setInstructionsAndTopAndBottomFloor();
      this.shouldLiftChangeDirections();
      this.openingLiftSteps();
    }
  }

  // As per above function but in the basic mode
  moveLiftWithBasicUserInput() {
    if (
      this.lift.direction === "up" &&
      this.lift.topFloorToVisit != this.lift.currentFloor
    ) {
      this.lift.moveUp();
      this.liftView.displayLevelNumber(this.lift.currentFloor);
      this.shouldLiftChangeDirections();
      this.openingLiftSteps();
    } else if (
      this.lift.direction === "down" &&
      this.lift.bottomFloorToVisit != this.lift.currentFloor
    ) {
      this.lift.moveDown();
      this.liftView.displayLevelNumber(this.lift.currentFloor);
      this.shouldLiftChangeDirections();
      this.openingLiftSteps();
    }
  }

  // Operates Lift with full user input
  operateLiftWithUserInput() {
    this.setInstructionsAndTopAndBottomFloor();
    this.openingLiftSteps();
    while (this.continueOperation) {
      this.moveLift();
    }
    if (!this.continueOperation) {
      process.exit();
    }
  }

  // Operates Lift in basic mode.
  operateLiftBasicUserInput() {
    let array = this.liftView.getFullInstructionsAtStart();
    this.liftView.displayLevelNumber(this.lift.currentFloor);
    this.lift.instructions = JSON.parse(array);
    this.lift.direction === "up"
      ? this.lift.setTopFloorToVisit()
      : this.lift.setBottomFloorToVisit();
    this.openingLiftSteps();
    while (this.lift.instructions.length > 0) {
      this.moveLiftWithBasicUserInput();
    }
    if (this.lift.instructions.length === 0) {
      process.exit();
    }
  }
}

module.exports = LiftController;
