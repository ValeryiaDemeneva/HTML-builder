const path = require("path");
const fs = require("fs");
const fsProm = fs.promises;
const dirN = path.join(__dirname, "files");
const dirCopN = path.join(__dirname, "files-copy");

async function createDir(dirCopN) {
  await fsProm.mkdir(dirCopN, { recursive: true });
}

async function removeDir(dirCopN) {
  try {
    await fsProm.rm(dirCopN, { force: true, recursive: true });
    return;
  } catch (err) {
    console.error(err);
  }
}

const func = async (dirN, dirCopN) => {
  try {
    await removeDir(dirCopN);
    await createDir(dirCopN);
    const files = await fsProm.readdir(dirN, { withFileTypes: true });
    for (const file of files) {
      const fileN = path.join(dirN, file.name);
      const fileCopN = path.join(dirCopN, file.name);
      if (file.isFile()) {
        fs.copyFile(fileN, fileCopN, (err) => {
          if (err) throw err;
        });
      } else {
        func(fileN, fileCopN);
      }
    }
    return;
  } catch (err) {
    console.error(err);
  }
};

func(dirN, dirCopN);
