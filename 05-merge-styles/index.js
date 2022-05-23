const path = require("path");
const fs = require("fs");
const BASE = "utf-8";
const BANDLE_PATH = path.join(__dirname, "project-dist", "bundle.css");
const READ_PATH = path.join(__dirname, ".\\styles", file.name);
//Create a path
fs.writeFile(BANDLE_PATH, "", (err) => {
  if (err) throw err;
});

// Add Stream readdir
fs.readdir(
  path.join(__dirname, ".\\styles"),
  { withFileTypes: true },
  (err, files) => {
    if (err) {
      throw err;
    } else {
      files.forEach((file) => {
        if (path.extname(file.name) === ".css" && file.isFile() === true) {
          fs.readFile(READ_PATH, BASE, (err, data) => {
            if (err) throw err;
            fs.appendFile(BANDLE_PATH, data, (err) => {
              if (err) throw err;
            });
          });
        }
      });
    }
  }
);
