const {getRemoteEntry, remotes} = require("../../expose-remotes/remotes.config");

module.exports = {
    name: 'less_and_scss',
    remotes: {
        expose_css_module: getRemoteEntry(remotes.cssModule),
        expose_jss: getRemoteEntry(remotes.jss),
    },
    shared: {
        react: {
            requiredVersion: false,
            singleton: true,
        },
    },
};
