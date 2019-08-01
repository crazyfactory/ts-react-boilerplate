const {resolve} = require('path');
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin');
const {
  generateCSSReferences,
  generateJSReferences
} = MiniHtmlWebpackPlugin;

module.exports = {
  webpackConfig: Object.assign({}, require('./config/webpack/dev'), {
    // quick fix for broken hmr. See https://github.com/styleguidist/react-styleguidist/issues/1206.
    cache: false
  }),
  template: ({css, js, title, publicPath}) =>
    `
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        ${generateCSSReferences({files: css, publicPath})}
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url(https://fonts.googleapis.com/css?family=Roboto);
      
          * {
            box-sizing: border-box;
          }
          
          html, body {
            font-family: Roboto;
            font-size: 15px;
            height: auto;
            margin: 0;
          }
      
          input[type="number"]::-webkit-outer-spin-button,
          input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
      
          input[type="number"] {
            -moz-appearance: textfield;
          }
      
          img {
            image-rendering: -webkit-optimize-contrast;
          }
          
          a {
            color: #000;
            text-decoration: none;
          }

          a:active, a:visited {
            color: #0095da;
          }

          :focus {
            outline-color: #0095da;
          }
          
          input, textarea, select, button {
            font-family: Roboto;
            font-size: 15px;
          }
          
          ul {
            list-style-type: none;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <div id="rsg-root"></div>
        ${generateJSReferences({files: js, publicPath})}
      </body>
      </html>
    `
  ,
  title: 'Crazy Components',
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  propsParser: require('react-docgen-typescript').parse,
  components: './src/app/components/**/*.tsx',
  skipComponentsWithoutExample: true,
  serverPort: 6060,
  context: {
    Constants: resolve(__dirname, './src/app/constants')
  }
};
