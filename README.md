# Uplifting Lifts

A coding challenge to design a program for an elevator company controlling the movemont of an elevator in a 10 storey building.

## Table of Contents

- [Challenge](#challenge)
- [Test Cases To Consider](#test-cases-to-consider)

<a name="challenge"></a>

## Challenge

"You are in charge of writing software for an elevator (lift) company.
Your task is to write a program to control the travel of a lift for a 10 storey building.

A passenger can summon the lift to go up or down from any floor. Once in the lift, they can choose the floor they'd like to travel to.

Your program needs to plan the optimal set of instructions for the lift to travel, stop, and open its doors."

<a name="test-cases-to-consider"></a>

## Test Cases To Consider

- Passenger summons lift on the ground floor. Once in, chooses to go to level 5.
Instructions in basic mode - `[ {"level":"1", "direction":"up"}]`
- Passenger summons lift on level 6 to go down. A passenger on level 4 summons the lift to go down. They both choose L1.
Instructions in basic mode - `[ {"level":"6", "direction":"down"}, {"level":"4", "direction":"down"}]`
- Passenger 1 summons lift to go up from L2. Passenger 2 summons lift to go down from L4. Passenger 1 chooses to go to L6. Passenger 2 chooses to go to Ground Floor
Instructions in basic mode - `[ {"level":"2", "direction":"up"}, {"level":"4", "direction":"down"}]`
- Passenger 1 summons lift to go up from Ground. They choose L5. Passenger 2 summons lift to go down from L4. Passenger 3 summons lift to go down from L10. Passengers 2 and 3 choose to travel to Ground.
Instructions in basic mode - `[ {"level":"1", "direction":"up"}, {"level":"4", "direction":"down"}, {"level":"10", "direction":"down"}]`

## Modes

### Basic

Runs with very little user input. The initial Instructions entered in JSON format, i.e. `[ {"level":"6", "direction":"down"}, {"level":"4", "direction":"down"}]`. When the lift arrives at the requested level the user is prompted for their destination.

### Interactive Mode

In this version the user is prompted for input at each level. Firstly they are asked if any instructions have been received if yes, the user will be prompted for the number of requests and then each request needs to be entered. This provides the option for exit when asked if new instructions were received.

### Tests - To Be Created
