const path = require('path');
const fs = require('fs');
const folder = path.join(__dirname, 'secret-folder');

let NameFiles = [];

fs.readdir(folder, { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  
  files.forEach((f) => {
    if (f.isFile()) {
      NameFiles.push(f.name);
    }
  });

  
  for (let i = 0; i < NameFiles.length; i += 1) {
    let CheckPath = path.join(__dirname, 'secret-folder', `${NameFiles[i]}`);
    fs.stat(CheckPath, (err, stats) => {
      if (err) throw err;
      console.log(NameFiles[i].replace('.', ' - ') + ' - ' + stats.size + 'b');
    });
  }
});