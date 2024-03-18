const rspack = require("@rspack/core");
const isDev = process.env.NODE_ENV === "development";
const dependencies = require("./package.json").dependencies;
const { ModuleFederationPlugin } = require('@rspack/core').container;

const path = require("path");
/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
	context: __dirname,
	entry: {
		index: "./src/index.jsx"
	},
    devServer: {
        port: 3004,
        hot: true,
        historyApiFallback: true,
    },
	module: {
		rules: [
            {
				test: /\.svg$/,
				type: "asset"
			},
			{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                    loader: "babel-loader",            
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                    },
                ],
              },      
              {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
              },
		]
	},
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['*', '.js', '.jsx'],
    },
	plugins: [
		new rspack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
		}),
		new rspack.ProgressPlugin({}),
		new rspack.HtmlRspackPlugin({
			template: "./public/index.html"
		}),
		new ModuleFederationPlugin({
			name: "team",
			filename: "remoteEntry.js",
			exposes: {
				"./team":"./src/Team"
			},
			shared: {
				...dependencies,
				"react": {
					singleton: true,
					requiredVersion: dependencies.react
				},
				"react-dom": {
					singleton: true,
					requiredVersion: dependencies["react-dom"]
				},			  
				"@mui/material": {
					singleton: true,
					requiredVersion: dependencies["@mui/material"]
				},
				"@mui/icons-material": {
					singleton: true,
					requiredVersion: dependencies["@mui/icons-material"]
				},
				"@emotion/react": {
					singleton: true,
					requiredVersion: dependencies["@emotion/react"]
				},
			}
		  })
    ].filter(Boolean)
};