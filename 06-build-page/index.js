const fs = require("fs");
const path = require("path");
const PATH_PROJECT_DIST = path.join(__dirname, "project-dist");
const PATH_TEMPLATE = path.join(__dirname, "template.html");
const PATH_DIST_HTML = path.join(__dirname, "project-dist", "index.html");
const PATH_ASSESTS = path.join(__dirname, "assets");
const PATH_STYLE = path.join(__dirname, "project-dist", "style.css");
const PATH_ASSEST = path.join(__dirname, "project-dist", "assets");

const initFunction = async () => {
  fs.mkdir(PATH_PROJECT_DIST, { recursive: true }, (err) => {
    if (err) throw new Error();
  });
  let resulst = "";
  await fs.promises
    .readFile(PATH_TEMPLATE)
    .then((item) => (resulst = item.toString()));

  let data = await fs.promises.readdir(path.join(__dirname, "components"));

  for (let i = 0; i < data.length; i++) {
    const read = await fs.promises.readFile(
      path.join(__dirname, "components", `${data[i]}`)
    );
    dataName = data[i].split(".");
    resulst = resulst.replace("{{" + `${dataName[0]}` + "}}", read);
  }
  fs.createWriteStream(PATH_DIST_HTML).write(resulst);
  fs.readdir(
    path.join(__dirname, "styles"),
    { withFileTypes: true },
    (error, files) => {
      if (error) throw new Error();
      let res = fs.createWriteStream(PATH_STYLE);
      files.forEach((item) => {
        if (path.extname(`${item.name}`) == ".css") {
          fs.createReadStream(
            path.join(__dirname, "styles", `${item.name}`)
          ).on("data", (data) => res.write(data + "\n\n"));
        }
      });
    }
  );
  fs.readdir(PATH_ASSESTS, (error, dirs) => {
    if (error) throw new Error();
    fs.mkdir(PATH_ASSEST, { recursive: true }, (err) => {
      if (err) throw new Error();
    });
    dirs.forEach((item) => {
      fs.mkdir(
        path.join(__dirname, "project-dist", "assets", `${item}`),
        { recursive: true },
        (err) => {
          if (err) throw new Error();
        }
      );
      fs.readdir(path.join(__dirname, "assets", `${item}`), (error, files) => {
        if (error) throw new Error();
        files.forEach((i) => {
          fs.promises.copyFile(
            path.join(__dirname, "assets", `${item}`, `${i}`),
            path.join(__dirname, "project-dist", "assets", `${item}`, `${i}`)
          );
        });
      });
    });
  });
};

initFunction();
