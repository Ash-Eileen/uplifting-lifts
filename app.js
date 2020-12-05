const LiftController = require("./controllers/lift_controller");
var myArgs = process.argv.slice(2);

let newLift = new LiftController();
if (myArgs[0] == "basic") {
  newLift.operateLiftBasicUserInput();
} else {
  newLift.operateLiftWithUserInput();
}
