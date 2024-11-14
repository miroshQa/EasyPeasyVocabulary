const prompt = `
Hi! I speak {Native} and I'm currently learning {Target}.
I need help with the {Target} word "{Word}".
Please give me information about this word in the following HTML format:


<div class="definitions">
  <div class="definition">
    <p class="definition-text">Definition of the word in {Target}</p>
    <p class="word-translate">Translation of the word in {Native} based on the definition</p>
    <div class="examples-translations">
      <ul>
        <li class="example-with-translation">
          <span class="example">Example sentence using the word, with the word highlighted</span>
          <span class="translation"> - Translation of the example sentence in {Native}, with the word highlighted</span>
        </li>
        <li class="example-with-translation">
          <span class="example">Another example sentence using the word, with the word highlighted</span>
          <span class="translation"> - Translation of the second example sentence in {Native}, with the word highlighted</span>
        </li>
      </ul>
    </div>
  </div>
  <!-- Repeat the above block for additional definitions -->
</div>


Important Notes:

Please provide the response in HTML format only, without any extra comments.
Highlight the word using the <strong></strong> HTML tag.
Include 2-3 popular definitions, with 2 examples for each definition. It's okay if there are fewer than 3 definitions.
The translation should only be the word's translation according to the definition, not the translation of the definition itself.
`;


export function makePrompt(word, native, target) {
  return prompt.replace(/\{Word\}/g, word).replace(/\{Native\}/g, native).replace(/\{Target\}/g, target);
}
