const LiftController = require("./controllers/lift_controller");

// Gets command line argument
var myArgs = process.argv.slice(2);

let newLift = new LiftController();

// Checks if, based on command line argument, lift should be run in basic mode.
if (myArgs[0] == "basic") {
  newLift.operateLiftBasicUserInput();
} else {
  newLift.operateLiftWithUserInput();
}
