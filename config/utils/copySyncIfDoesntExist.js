const fs = require('fs');
const copySync = require('./copySync');

const copySyncIfDoesntExist = (src, dest) => {
  if (fs.existsSync(dest)) {
    return;
  }
  copySync(src, dest);
};

module.exports = copySyncIfDoesntExist;
