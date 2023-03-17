const {getRemoteEntry, remotes} = require("../../expose-remotes/remotes.config");

module.exports = {
    name: 'jss_tailwind',
    remotes: {
        expose_css: getRemoteEntry(remotes.css),
        expose_styled_component: getRemoteEntry(remotes.styledComponent),
    },
    shared: {
        react: {
            requiredVersion: false,
            singleton: true,
        },
    },
};
