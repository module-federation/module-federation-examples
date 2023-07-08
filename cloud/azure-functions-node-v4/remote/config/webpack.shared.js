const path = require("path");

/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
	mode: "development",
	devtool: false,
	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
		alias: {
			shell: path.resolve(__dirname, "../../shell/client/src/components"),
		},
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				type: "javascript/auto",
				resolve: {
					fullySpecified: false,
				},
			},
			{
				test: /\.tsx?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				options: {
					presets: [
						["@babel/preset-react", { runtime: "automatic" }],
						"@babel/preset-typescript",
					],
				},
			},
		],
	},
};

module.exports = webpackConfig;
