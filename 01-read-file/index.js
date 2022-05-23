const path = require("path");
const fs = require("fs");

const reader = fs.createReadStream(path.join(__dirname, "text.txt"));

reader.on("data", function (buffer) {
  console.log(buffer.toString());
});
