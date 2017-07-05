const fs = require("fs");

const copySync = (src, dest, overwrite) => {
  if (overwrite && fs.existsSync(dest)) {
    fs.unlinkSync(dest);
  }
  const data = fs.readFileSync(src);
  fs.writeFileSync(dest, data);
};

const createIfDoesntExist = (dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }
};

const copySyncIfDoesntExist = (src, dest) => {
  if(fs.existsSync(dest)) return;
  copySync(src, dest);
};

module.exports = {
  copySync,
  createIfDoesntExist,
  copySyncIfDoesntExist
};
