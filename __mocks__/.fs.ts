// __mocks__/fs.js
"use strict";

export interface IStringifyable {
  toString: () => string;
}

export interface IFS {
  readFileSync: (filename: string) => IStringifyable;
  __setFileContents: (filename: string, content: string) => void;
  __clear: () => void;
}

const fs: IFS = (jest.genMockFromModule("fs") as IFS);
let files = {};
fs.readFileSync =  (filename) => {
  const match = Object.keys(files).filter((file: string) => {
    return filename.indexOf(file) !== -1;
  });
  return {
    toString: () => {
      return files[match[0]].content;
    }
  };
};

fs.__setFileContents = (filename, content) => {
  files[filename] = content;
};

fs.__clear = () => {
  files = {};
};

module.exports = fs;
