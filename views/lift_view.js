var prompt = require("prompt-sync")();

class LiftView {
  displayLevelNumber(level) {
    console.log(`Lift now on level: ${level}`);
  }

  shouldInstructionsBeAdded() {
    let response = prompt("New instructions received? (Y or N) ");
    return response;
  }

  numberOfInstructionsToAdd() {
    let numberOfInstructions = prompt("How many instructions were received? ");
    return numberOfInstructions;
  }

  newInstructionsToAdd() {
    let level = prompt("What level was the lift called from? ");
    let direction = prompt("Which direction? (Up or Down) ").toLowerCase();
    return { level: level, direction: direction };
  }

  addFloor() {
    let floor = prompt("Which floor would you like to go to? ");
    return { level: floor, direction: "entered" };
  }

  displayReceivedInstructions(instructions) {
    instructions.map((instruction) => {
      console.log(
        `Instruction received from level ${instruction.level} to go ${instruction.direction}.`
      );
    });
  }
}

module.exports = LiftView;
