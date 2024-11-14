

function WriteToHtml(card, filePath) {
  const htmlContent = `
${card.Sentences}
${card.Dictionary}`;
  fs.writeFileSync(filePath, htmlContent, 'utf8');
};

async function exportToAnki(card) {
  const ankiConnectUrl = "http://localhost:8765";
  let req = {
    action: "addNote",
    version: 6,
    params: {
      note: {
        deckName: "1. EngVocabulary::TranslateItToLearnNewWordWithContext",
        modelName: "TranslateFromNativeToTarget",
        fields: card,
        options: {
          allowDuplicate: false,
          duplicateScope: this.ankiDeckName,
          duplicateScopeOptions: {
            deckName: "1. EngVocabulary::TranslateItToLearnNewWordWithContext",
            checkChildren: false,
            checkAllModels: false
          }
        },
      }
    }
  }

  let res = await fetch(ankiConnectUrl, { method: "POST", body: JSON.stringify(req) });
  let body = await res.json();
  console.log(body);
}

const zip = (a, b) => a.map((k, i) => [k, b[i]]);

function createCard(word, data) {
  let card = { Word: word, Sentences: "", Dictionary: "" };

  let sentences = zip(data.examples, data.translations).map(([ex, tr]) => {
    return `
  <div class="sentence">
    <div class="example">${ex}</div>
    <div class="translation">${tr}</div>
  </div>`;
  }).join("\n");

  card.Sentences = `
<div class="sentences">
  ${sentences}
</div>
  `;

  let definitions = data.definitions.map((item) => {
    let defSentences = zip(item.examples, item.translations).map(([ex, trans]) => {
      return `
      <div class="definition-sentence">
        <div class="example">${ex}</div>
        <div class="translation">${trans}</div>
      </div>`;
    }).join("\n");

    return `
  <div class="definition-container">
    <div class="definition">${item.definition}</div>
    <div class="word-translate">${item.wordTranslate}</div>
    <div class="definition-sentences-container">
      ${defSentences}
    </div>
  </div>`;
  }).join("\n");

  let dictionary = `
<div class="dictionary">
${definitions}
</div>`;

  card.Dictionary = dictionary;

  return card;
}

const fs = require('fs');

const filePath = './prompt_res.json';
const data = fs.readFileSync(filePath, 'utf8');
const jsonData = JSON.parse(data);
const card = createCard("persuade", jsonData);
WriteToHtml(card, "./out.html")
//exportToAnki(card);
