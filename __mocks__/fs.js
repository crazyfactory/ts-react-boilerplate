// __mocks__/fs.js
"use strict";
var fs = jest.genMockFromModule("fs");
var files = {};
fs.readFileSync = function (filename) {
  let match = Object.keys(files).filter((file) => {
    return filename.indexOf(file) !== -1
  });
  return {
    toString: function () {
      return files[match[0]];
    }
  };
};

fs.__setFileContents = function (filename, content) {
  files[filename] = content;
};

fs.__clear = function() {
  files = {};
};
module.exports = fs;
