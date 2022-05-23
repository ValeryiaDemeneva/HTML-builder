const fs = require ('fs');
const path = require('path');
const readline = require('readline');
const { stdin, stdout } = process;

const Path = path.join(__dirname, 'text_file.txt');
const writeStream = fs.createWriteStream(Path, 'utf-8');

process.on('SIGINT', () => {
  stdout.write('До свидания!');
  process.exit();
});

stdout.write('Здравствуйте, введите текст:\n');


const reli = readline.createInterface({ input: stdin});


reli.on('line', (input) => {
  if (input.toString().trim() === 'exit'){
    reli.close();
    process.emit('SIGINT');
  } else {
    writeStream.write(input + '\n')
  }
});