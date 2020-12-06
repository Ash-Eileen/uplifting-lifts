const Lift = require("../models/lift");

// Passenger summons lift on the ground floor. Once in, chooses to go to level 5.
describe("Lift summoned level 1, passenger gets in level 1 and gets out at level 5", () => {
  it("Doors should open level 1 and 5, doors should not open at level 4", () => {
    let lift = new Lift();
    lift.addInstructions({ level: 1, direction: "up" });
    lift.openLift();
    expect(lift.open).toBeTruthy();
    lift.addInstructions({ level: 5, direction: "entered" });
    lift.open = false;
    lift.moveUp();
    lift.moveUp();
    lift.moveUp();
    lift.openLift();
    expect(lift.open).toBeFalsy();
    lift.moveUp();
    lift.openLift();
    expect(lift.open).toBeTruthy();
  });
});

// Passenger summons lift on level 6 to go down. A passenger on level 4 summons the lift to go down. They both choose L1.
describe("Lift summoned level 6 to go down, lift summoned level 4 to go down, both passengers choose level 1", () => {
  it("Doors do not open at level 4 on way up, doors open level 6, then level 4 and then level 1", () => {
    let lift = new Lift();
    lift.addInstructions({ level: 6, direction: "down" });
    lift.addInstructions({ level: 4, direction: "down" });
    lift.moveUp();
    lift.moveUp();
    lift.moveUp();
    lift.openLift();
    expect(lift.open).toBeFalsy();
    lift.moveUp();
    lift.moveUp();
    lift.changeDirection();
    lift.openLift();
    expect(lift.open).toBeTruthy();
    expect(lift.direction).toBe("down");
    lift.addInstructions({ level: 1, direction: "entered" });
    lift.open = false;
    lift.moveDown();
    lift.moveDown();
    lift.openLift();
    expect(lift.open).toBeTruthy();
    lift.addInstructions({ level: 1, direction: "entered" });
    lift.open = false;
    lift.moveDown();
    lift.moveDown();
    lift.moveDown();
    lift.openLift();
    expect(lift.open).toBeTruthy();
  });
});

// Passenger 1 summons lift to go up from L2. Passenger 2 summons lift to go down from L4. Passenger 1 chooses to go to L6. Passenger 2 chooses to go to Ground Floor
describe("Lift summoned level 2 to go up, lift summoned level 4 to go down, first passenger goes to level 6, second goes to level 1", () => {
  it("Lift goes to level 2, level 6, level 4 and level 1 in that order", () => {
    let lift = new Lift();
    lift.addInstructions({ level: 2, direction: "up" });
    lift.addInstructions({ level: 4, direction: "down" });
    lift.moveUp();
    lift.openLift();
    expect(lift.open).toBeTruthy();
    lift.addInstructions({ level: 6, direction: "entered" });
    lift.open = false;
    lift.moveUp();
    lift.moveUp();
    lift.openLift();
    expect(lift.open).toBeFalsy();
    lift.moveUp();
    lift.moveUp();
    lift.openLift();
    expect(lift.open).toBeTruthy();
    lift.open = false;
    expect(lift.instructions.length).toBe(1);
    lift.changeDirection();
    lift.moveDown();
    lift.moveDown();
    lift.openLift();
    expect(lift.open).toBeTruthy();
    lift.addInstructions({ level: 1, direction: "entered" });
    lift.open = false;
    lift.moveDown();
    lift.moveDown();
    lift.moveDown();
    lift.openLift();
    expect(lift.open).toBeTruthy();
  });
});

// Passenger 1 summons lift to go up from Ground. They choose L5. Passenger 2 summons lift to go down from L4. Passenger 3 summons lift to go down from L10. Passengers 2 and 3 choose to travel to Ground.
describe("Lift summoned level 1 to go up, lift summoned level 4 to go down, lift summoned from level 10 to go down, first passenger goes to level 5, second and third go to level 1", () => {
  it("Lift open at level 1, level 5, level 10, level and level 1 in that order", () => {
    let lift = new Lift();
    lift.addInstructions({ level: 1, direction: "up" });
    lift.addInstructions({ level: 4, direction: "down" });
    lift.addInstructions({ level: 10, direction: "down" });
    lift.openLift();
    expect(lift.open).toBeTruthy();
    lift.addInstructions({ level: 5, direction: "entered" });
    lift.open = false;
    lift.moveUp();
    lift.moveUp();
    lift.moveUp();
    lift.openLift();
    expect(lift.open).toBeFalsy();
    lift.moveUp();
    lift.openLift();
    expect(lift.open).toBeTruthy();
    lift.open = false;
    lift.moveUp();
    lift.moveUp();
    lift.moveUp();
    lift.moveUp();
    lift.moveUp();
    lift.changeDirection();
    lift.openLift();
    expect(lift.open).toBeTruthy();
    lift.addInstructions({ level: 1, direction: "entered" });
    lift.open = false;
    lift.moveDown();
    lift.moveDown();
    lift.moveDown();
    lift.moveDown();
    lift.moveDown();
    lift.moveDown();
    lift.openLift();
    expect(lift.open).toBeTruthy();
    lift.addInstructions({ level: 1, direction: "entered" });
    lift.open = false;
    lift.moveDown();
    lift.moveDown();
    lift.moveDown();
    lift.openLift();
    expect(lift.open).toBeTruthy();
  });
});
