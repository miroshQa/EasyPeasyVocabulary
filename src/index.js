import { makePrompt } from "./prompt_gen.js"
import { getPromptRes } from "./gpt.js"
import { exportToAnki } from "./export.js"


async function main() {
  let word = "temper"
  const prompt = makePrompt(word, "Russian", "English");
  console.log(prompt);
  const promptRes = await getPromptRes(prompt);
  console.log(promptRes);
  const card = {Dictionary: promptRes, word: word}
  exportToAnki(card);
  console.log("exported");
}


main();
