const zip = (a, b) => a.map((k, i) => [k, b[i]]);

function createCard(word, data) {
  let card = { Word: word, Examples: "", Translations: "", Dictionary: "" };

  let examples = data.examples.map((item) => {
    return `<div class="example">${item}</div>`;
  }).join("\n");

  card.Examples = `
<div class="examples">
  ${examples}
</div>
  `;

  let translations = data.translations.map((item) => {
    return `<div class="translation">${item}</div>`;
  }).join("\n");

  card.Translations = `
<div class="translations">
  ${translations}
</div>
  `;

  let definitions = data.definitions.map((item) => {
    let defExamples = zip(item.examples, item.translations).map(([ex, trans]) => {
      return `
<div class="definition-example">
  <div class="example">${ex}</div>
  <div class="translation">${trans}</div>
</div>
`;
    }).join("\n");

    return `
<div class="definition-container">
  <div class="definition">${item.definition}</div>
  <div class="word-translate">${item.wordTranslate}</div>
  <div class="definition-examples-container">
    ${defExamples}
  </div>
</div>
`;
  }).join("\n");

  let dictionary = `
<div class="dictionary">
  ${definitions}
</div>
  `;

  card.Dictionary = dictionary;

  return card;
}

const fs = require('fs');

const filePath = './prompt_res.json';
const data = fs.readFileSync(filePath, 'utf8');
const jsonData = JSON.parse(data);
const card = createCard("persuade", jsonData);
console.log(card);

const serialized = JSON.stringify(card, null, 2);
console.log(serialized);

// Создание HTML-строки
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${card.Word}</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .examples, .translations, .dictionary { margin: 20px 0; }
        .example, .translation, .definition { margin: 5px 0; }
    </style>
</head>
<body>
    ${card.Word}
    ${card.Examples}
    ${card.Translations}
    ${card.Dictionary}
</body>
</html>
`;
// Запись HTML в файл
const outputHtmlFilePath = './output_card.html'; // Укажите путь к выходному HTML файлу
fs.writeFileSync(outputHtmlFilePath, htmlContent, 'utf8');

console.log(`HTML записан в файл: ${outputHtmlFilePath}`);
