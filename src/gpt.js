import GPT4js from "gpt4js";

export async function getPromptRes(prompt) {
  const messages = [{ role: "user", content: prompt }];
  const options = {
    provider: "Nextway",
    model: "gpt-4o-free",
  };

  const provider = GPT4js.createProvider(options.provider);
  console.log("Making request with prompt:");
  console.log(prompt);
  let text = await provider.chatCompletion(messages, options, (data) => {
    console.log("Prompt result: ");
    console.log(data);
  });
  return text.replace(/```html/, "").replace(/```/, "");
}
