module.exports = function(config) {
	config.set({

		frameworks: ["mocha", "karma-typescript"],

		basePath: "../../",

		files: [
			{ pattern: "node_modules/es6-shim/es6-shim.js" }, // needed for PhantomJS
			{ pattern: "src/**/*.+(ts|tsx)" }
		],

		preprocessors: {
			"**/*.+(ts|tsx)": ["karma-typescript"]
		},

		karmaTypescriptConfig: {
			bundlerOptions: {
				entrypoints: /\.test\.tsx$/,
				exclude: [
					// dynamic requires or stuff that breaks PhantomJS
					"node-pre-gyp",
					"react/addons",
					"react/lib/ExecutionEnvironment",
					"react/lib/ReactContext",
					"send",
					// webpack stuff, can be removed if webpack imports are removed from dev setup
					"../config/webpack/dev",
					"webpack",
					"webpack-manifest-plugin"
				]
			},
			compilerOptions: {
				target: "es5",
				lib: ["es2015", "dom"]
			},
			tsconfig: "tsconfig.json"
		},

		reporters: ["progress", "karma-typescript"],

		browsers: ["PhantomJS"]
	});
};
