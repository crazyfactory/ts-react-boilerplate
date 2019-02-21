const fs = require('fs');

const createIfDoesntExist = (dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }
};

module.exports = createIfDoesntExist;
