// const prompts = require("prompts");

// const addInstructions = async () => {
//   const liftInstructionQuestions = [
//     {
//       type: "number",
//       name: "level",
//       message: "What level was the lift called from?",
//     },
//     {
//       type: "text",
//       name: "direction",
//       message: "Up or down?",
//     },
//   ];

//   const response = await prompts({
//     type: "text",
//     name: "newInstructionsToAdd",
//     message: "New instructions received? (Y or N)",
//   });

//   if (response.newInstructionsToAdd.toUpperCase() === "Y") {
//     const numberOfInstructions = await prompts({
//       type: "number",
//       name: "numberOfInstructions",
//       message: "Please enter the number of instructions received",
//     });

//     while (numberOfInstructions.numberOfInstructions > 0) {
//       const newInstructions = await prompts(liftInstructionQuestions);
//       instructions.push(newInstructions);
//       numberOfInstructions.numberOfInstructions--;
//     }
//   }
//   return instructions
// };

// addInstructions();
