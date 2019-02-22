const defaultConfig = require('./main');
const localConfig = require('./main.local');
module.exports.config = {
  ...defaultConfig,
  ...localConfig
};
