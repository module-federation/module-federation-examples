const deps = require("../package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
const {
	NodeFederationPlugin,
	StreamingTargetPlugin,
} = require("@module-federation/node");

module.exports = {
	client: new ModuleFederationPlugin({
		name: "remote",
		filename: "remote.js",
		remotes: {
			shell: "shell@http://localhost:7071/api/chunks/remote.js",
		},
		exposes: {
			"./Widget": "./src/components/Widget",
		},
		shared: {
			react: {
				singleton: true,
				requiredVersion: deps.react,
			},
			"react-dom": {
				singleton: true,
				requiredVersion: deps["react-dom"],
			},
		},
	}),
	server: [
		new NodeFederationPlugin({
			name: "remote",
			filename: "remote.js",
			library: { type: "commonjs-module" },
			exposes: {
				"./Widget": "./src/components/Widget",
			},
			shared: {
				react: {
					singleton: true,
					requiredVersion: deps.react,
				},
				"react-dom": {
					singleton: true,
					requiredVersion: deps["react-dom"],
				},
			},
		}),
		new StreamingTargetPlugin({
			name: "remote",
			library: { type: "commonjs-module" },
		}),
	],
};
