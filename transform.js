

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
          allowDuplicate: true,
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

const fs = require('fs');

const filePath = './prompt_res.html';
const data = fs.readFileSync(filePath, 'utf8');
const card = {Dictionary: data, word: "persuade"}
exportToAnki(card);
