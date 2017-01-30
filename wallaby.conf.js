var path = require('path');
var webpack = require('webpack');
var wallabyWebpack = require('wallaby-webpack');

module.exports = function (w) {

	var webpackPostprocessor = wallabyWebpack({

		resolve: {
			modules: [
				// as described at
				// https://wallabyjs.com/docs/integration/webpack.html#absolute-paths-for-wallaby-cache-folder
				// path.resolve(__dirname),
				path.join(w.projectCacheDir, 'src'),
				path.join(w.projectCacheDir, 'src/app'),
				path.join(w.projectCacheDir, 'src/app/redux'),
				'node_modules'
			],
			// as described at
			// https://wallabyjs.com/docs/integration/webpack.html#typescript-and-coffeescript
			extensions: ['.json', '.js', '.jsx']
		},

		module: {
			rules: [
				{
					test: /\.(jpe?g|png|gif)$/i,
					loader: 'url-loader?limit=1000&name=images/[hash].[ext]'
				},
				{
					test: /\.json$/,
					loader: 'json-loader'
				}
			],
		},

		externals: {
			'react/lib/ExecutionEnvironment': true,
			'react/lib/ReactContext': 'window'
		},

		plugins: [
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
	});

	return {
		files: [
			// There are not only .ts files, also .tsx, .png used.
			// also config/main.js is used from one the files
			{pattern: 'config/main.js', load: false},
			{pattern: 'src/**/*.ts*', load: false},
			{pattern: 'src/**/*.png', load: false},
			{pattern: 'src/**/*.test.ts*', ignore: true}
		],
		tests: [
			{pattern: 'src/**/*.test.ts*', load: false}
		],
		// as described at
		// https://wallabyjs.com/docs/integration/electron.html
		env: {
			kind: 'electron'
		},
		postprocessor: webpackPostprocessor,
		testFramework: 'mocha',
		setup: function () {
			window.__moduleBundler.loadTests();
		},
		debug: true
	};
};
