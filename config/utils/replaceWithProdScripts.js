const fs = require('fs');
const manifest = require('../../build/manifest');
const utils = require('../utils');

utils.copySync('./src/index.html', './build/index.html');

const scriptFileNames = [];
Object.keys(manifest).forEach((key) => {
  if (manifest[key].endsWith('.js')) {
    scriptFileNames.push(manifest[key]);
  }
});
const scripts = scriptFileNames.map((fileName) => `<script src="${fileName}"></script>`);
const indexHtml = fs.readFileSync('./build/index.html').toString();
const resultHtml = indexHtml.replace('<script src="/public/js/app.js"></script>', scripts.join('\n'));
fs.writeFileSync('./build/index.html', resultHtml);
