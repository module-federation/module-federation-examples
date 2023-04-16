const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
	entry: ["@babel/polyfill", path.resolve(__dirname, "./src/index")],
	mode: "development",
	devtool: false,
	output: {
		path: path.join(__dirname, "../api/dist/client"),
		publicPath: "http://localhost:7071/api/chunks/",
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		plugins: [new TsconfigPathsPlugin()],
	},
	target: "web",
	module: {
		rules: [
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
	plugins: [
		new ModuleFederationPlugin({
			name: "shell",
			filename: "remote.js",
			remotes: {
				remote: "remote@http://localhost:8080/client/remote.js",
			},
			exposes: {
				"./Provider": "./src/components/Provider",
			},
			shared: {
				react: {
					requiredVersion: false,
				},
				"react-dom": {
					requiredVersion: false,
				},
			},
		}),
	],
};
