import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'test.json');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
