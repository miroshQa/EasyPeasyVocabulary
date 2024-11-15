const prompt = `
Hi! I speak {Native} and I'm currently learning {Target}.
I need help with the {Target} word "{Word}".
Please give me information about this word in the following HTML format:

<div class="word-dictionary">
  <div class="part-of-speech-meaning">
    <div class="part-of-speech">The part of speech of the "{Word}" for which definitions will be given</div>
    <div class="definitions">
      <div class="definition">
        <div class="definition-text">Definition of the word in {Target}</div>
        <div class="word-translate">Translation of the word in {Native} based on the definition</div>
        <div class="synonymous">Synonyms (provide 2-3 if available)</div>
        <div class="cerf-level">A1 / A2 / B1 / B2 / C1 / C2</div>
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
        <!-- Repeat the above block for other definitions -->
      </div>
  </div>
  <!-- Repeat the above block for other parts of speech -->
</div>


Important Notes:
- Please provide the response in HTML format only, without any extra comments.
- Highlight the word using the <strong></strong> HTML tag.
- Include 2-3 popular definitions, with 2 examples for each definition. It's okay if there are fewer than 3 definitions.
- The translation should only be the word's translation according to the definition, not the translation of the definition
itself.
- If a word has different parts of speech, don't forget to add corresponding data
- Don't include very rare defitions or parts of speech for the word
`;


export function makePrompt(word, native, target) {
  return prompt.replace(/\{Word\}/g, word).replace(/\{Native\}/g, native).replace(/\{Target\}/g, target);
}
