var prompt = require("prompt-sync")();

class LiftView {
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
}

module.exports = LiftView;
