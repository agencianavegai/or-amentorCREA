const fs = require('fs');
const csv = require('csv-parser');

const inputFile = process.argv[2];

if (!inputFile) {
  console.log("Forneça o caminho do arquivo");
  process.exit(1);
}

let count = 0;
fs.createReadStream(inputFile)
  .pipe(csv({ separator: ',' })) // SINAPI às vezes usa ';' - vou testar vírgula primeiro
  .on('headers', (headers) => {
    console.log("Headers:", headers);
  })
  .on('data', (data) => {
    if (count < 2) {
      console.log(`Row ${count + 1}:`, data);
      count++;
    } else {
      process.exit(0);
    }
  });
