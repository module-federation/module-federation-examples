var path = require("path");
const { dependencies } = require("./package.json");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const MiniCss = require("mini-css-extract-plugin");
const { override, babelInclude } = require("customize-cra");

module.exports = function (config, env) {
  config.plugins = config.plugins.filter(p=>["CaseSensitivePathsPlugin"].includes(p.constructor.name))
  config.plugins.push(
  new MiniCss(),
    new ModuleFederationPlugin(
      (module.exports = {
        name: "host",
        remotes: {
          remote: `remote@http://localhost:3001/remoteEntry.js`,
        },
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
      })
    )
  );
  config.output.publicPath = "auto";
  return Object.assign(
    config,
    override(
      babelInclude([
        /* transpile (converting to es5) code in src/ and shared component library */
        path.resolve("src"),
        path.resolve("../remote/src/components"),
      ])
    )(config, env)
  );
};
