#! /usr/bin/env node

import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";

let res = await inquirer.prompt({
  name: "userInput",
  type: "input",
  message: "Please enter seconds",
  validate: (input) => {
    const parsedInput = parseInt(input, 10);
    if (isNaN(parsedInput)) {
      return "Please enter a valid number";
    } else if (parsedInput > 60) {
      return "Seconds must be in 60";
    } else {
      return true;
    }
  }
});

let input = parseInt(res.userInput, 10);

function startTimer(value: number) {
  const initialTime = new Date().setSeconds(new Date().getSeconds() + value);
  const intervalTime = new Date(initialTime);
  setInterval(() => {
    const currentTime = new Date();
    const timeDiff = differenceInSeconds(intervalTime, currentTime);
    if (timeDiff <= 0) {
      console.log("Timer has expired");
      process.exit();
    }
    const min = Math.floor(timeDiff / 60);
    const sec = timeDiff % 60;
    console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
  }, 1000);
}

startTimer(input);
