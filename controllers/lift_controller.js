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
}

let newLift = new LiftController();

console.log(newLift.lift);

newLift.getInstructions();

console.log(newLift.lift.instructions);

module.exports = LiftController;
