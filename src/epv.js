#!/usr/bin/env node

import { makePrompt } from "./prompt_gen.js"
import { getPromptRes } from "./gpt.js"
import { exportToAnki } from "./export.js"


async function main() {
  const variables = process.argv;
  if (variables.length != 3) {
    console.log("Error. Invalid arguments. Usage: epv <word>")
    return;
  }
  let word = variables[2];
  const prompt = makePrompt(word, "Russian", "English");
  const promptRes = await getPromptRes(prompt);
  console.log(promptRes);
  const card = {Dictionary: promptRes, word: word}
  exportToAnki(card);
  console.log("exported");
}


main();
