var path = require('path');
var webpack = require('webpack');
var wallabyWebpack = require('wallaby-webpack');

module.exports = function (w) {

	var webpackPostprocessor = wallabyWebpack({
		devtool: 'source-map',

		resolve: {
			modules: [
				path.resolve(__dirname),
				'src',
				'src/app',
				'src/app/redux',
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
	});

	return {
		files: [
			{ pattern: 'src/**/*.ts', load: true },
			{ pattern: 'src/**/*.test.ts', ignore: true }
		],
		tests: [
			{ pattern: 'src/**/*.test.ts', load: true }
		],
		postprocessor: webpackPostprocessor,
		compilers: {
			'**/*.ts': w.compilers.typeScript({
				typescript: require('typescript')
			})
		},
		testFramework: 'mocha',
		setup: function () {
			window.__moduleBundler.loadTests();
		}
	};
};
