var path = require('path');
var webpack = require('webpack');
var appConfig = require('../main');

module.exports = function (config) {
  const conf = {
    frameworks: ['mocha', 'chai', 'es6-shim'],

    browsers: ['PhantomJS'],

    files: ['../webpack/test.js'],

    preprocessors: {
      '../src/**/*.ts': ['coverage'],
      '../src/**/*.tsx': ['coverage'],
      '../webpack/test.js': ['webpack']
    },

    plugins: ['karma-*'],

    reporters: ['mocha', 'coverage'],

    coverageReporter: {
      dir: '../../coverage',
      reporters: [{
          type: 'lcov',
          subdir: '.'
      }]
    },

    hostname: appConfig.host,

    port: appConfig.karmaPort,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    singleRun: false,

    concurrency: Infinity,

    webpack: {
      devtool: 'inline-source-map',

      resolve: {
        modules: [
          path.resolve(__dirname),
          '../../src',
          '../../src/app',
          '../../src/app/redux',
          'node_modules'
        ],
        extensions: ['.json', '.js', '.ts', '.tsx', '.jsx']
      },

      module: {
        rules: [{
            enforce: 'pre',
            test: /\.tsx?$/,
            loader: 'tslint-loader'
          },
          {
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader?useCache=false'
          },
          {
            test: /\.(jpe?g|png|gif)$/i,
            loader: 'url-loader?limit=1000&name=images/[hash].[ext]'
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            enforce: 'post',
            test: /\.tsx?$/,
            loader: 'istanbul-instrumenter-loader',
            include: path.resolve('./src/app')
          }
        ],
      },

      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window'
      },

      plugins: [
        new webpack.LoaderOptionsPlugin({
          options: {
            tslint: {
              failOnHint: true
            },
          }
        }),
        new webpack.IgnorePlugin(/^fs$/),
        new webpack.IgnorePlugin(/^react\/addons$/),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            BROWSER: JSON.stringify(true),
            NODE_ENV: JSON.stringify('development')
          }
        })
      ]
    },

    webpackServer: {
      noInfo: true
    }
  };

  if (process.env.NODE_ENV === 'ci') {
    conf.autoWatch = false;
    conf.singleRun = true;
    conf.browsers.push('Firefox');
  } else {
    conf.browsers.push('Chrome');
  }

  config.set(conf);
};
