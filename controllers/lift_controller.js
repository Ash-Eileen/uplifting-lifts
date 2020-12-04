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
        this.lift.addInstructions(newestInstruction);
        numberOfInstructionsToAdd--;
      }
    }
  }

  startLift() {
    this.liftView.displayLevelNumber(this.lift.current_floor);
    this.getInstructions();
    this.liftView.displayReceivedInstructions(this.lift.instructions);
    this.lift.setFloorsToVisit();
  }
}

let newLift = new LiftController();

newLift.startLift();

module.exports = LiftController;
