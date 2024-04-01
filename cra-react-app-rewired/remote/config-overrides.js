var path = require("path");
const { dependencies } = require("./package.json");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ModuleFederationPlugin =
  require("@module-federation/enhanced").ModuleFederationPlugin;
const MiniCss = require("mini-css-extract-plugin");
const { override, babelInclude } = require("customize-cra");

module.exports = function (config, env) {
  config.plugins = config.plugins.filter(p=>["CaseSensitivePathsPlugin"].includes(p.constructor.name))
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
      new MiniCss(),
      new ModuleFederationPlugin(
      {
        name: "remote",
        exposes: {
          "./Card": "./src/components/Card",
        },
        filename: "remoteEntry.js",
        shared: {
          ...dependencies,
          react: {
            singleton: true,
            requiredVersion: dependencies["react"],
          },
          "react-dom": {
            singleton: true,
            requiredVersion: dependencies["react-dom"],
          },
        },
      }
    )
  );
  config.output.publicPath = "auto";
  return Object.assign(
    config,
    override(
      babelInclude([
        /* transpile (converting to es5) code in src/ and shared component library */
        path.resolve("src"),
        path.resolve("../host/src/components"),
      ])
    )(config, env)
  );
};
