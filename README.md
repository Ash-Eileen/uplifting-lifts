# Uplifting Lifts

A coding challenge to design a program for an elevator company controlling the movemont of an elevator in a 10 storey building.

## Table of Contents

- [Challenge](#challenge)
- [Test Cases To Consider](#test-cases-to-consider)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [How To Run](#how-to-run)
- [Features](#features)
- [Tests](#tests)

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

<a name="tech-stack"></a>

## Tech Stack

This application was written in JavaScript using Nodejs. The testing has been done with Jest.

<a name="installation"></a>

## Installation

To run this program it is a requirement to have node and npm installed. To check if you have these dependencies please execute the commands:

`node -v`

`npm -v`

If you do not have these installed please follow this [link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and follow the instructions appropriate for your OS.

Once you have the required dependencies please clone the repo using your preferred method. Below I have included the command for HTTPS cloning, however, you can find each option on the [repository](https://github.com/Ash-Eileen/uplifting-lifts):

`git clone https://github.com/Ash-Eileen/uplifting-lifts.git`

After this to install the required dependencies for the app itself please run:

`npm install`

<a name="how-to-run"></a>

## How To Run

Two versions of this app can be run. Please ensure you are in the repository where you have cloned the repo.

To run the basic version:

`node app.js basic`

To run the interaction version:

`node app.js`

<a name="features"></a>

## Features

### Modes

Two different modes have been created. The basic version is designed to be quicker to test a full set of instructions and see which floors the elevator goes to, which it stops at and where passengers disembark. This only takes user input for the initial set of instructions and at the floors where passengers enter. The interactive mode takes user input at each floor and can be used to test more complex use cases and how adding instructions during the running of the app impact the steps taken.

By default the interactive mode will run, however, using command line arguments it is simple to acces the basic mode. More information on how to execute these commands is available in [how to run](#how-to-run).

Please note that in both of these modes no error handling has been implemented at this stage so it is important to ensure instructions are entered correctly. **Please note: both of these modes assume that for the ground floor the user will input 1.**

#### Basic

Runs with very little user input. The initial Instructions entered in JSON string format, i.e. `[ {"level":"6", "direction":"down"}, {"level":"4", "direction":"down"}]`. When the lift arrives at the requested level the user is prompted for their destination.

#### Interactive Mode

In this version the user is prompted for input at each level. Firstly they are asked if any instructions have been received if yes, the user will be prompted for the number of requests and then each request needs to be entered. This provides the option for exit when asked if new instructions were received.

### Movement

As with real world elevators this lift will move in one direction at a time and only open for passengers who are travelling in the same direction. For example, if a passenger gets on at level 1 to go to level 10 and a passenger requests the lift after this from level 4 to go down, then the lift will complete its passage to level 10 before returning to level 4 to collect the second passenger.

The lift will move only to the highest requested floor and lowest requested floor in the direction requested. This ensures that an entire circuit of the building does not need to be completed. Once all instruction are complete the lift returns to the ground floor and waits for user input.

<a name="tests"></a>

## Tests

The cases from [test cases to consider](#test-cases-to-consider) have each had a test written for them using Jest. These tests can be run from the main directory using the command:

`npm test`
