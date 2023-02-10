const {getRemoteEntry, remotes} = require("../../expose-remotes/remotes.config");

module.exports = {
    name: 'any-combination',
    remotes: {
         expose_scss: getRemoteEntry(remotes.scss), 
         expose_styled_component: getRemoteEntry(remotes.styledComponent)
    },
    shared: {
        react: {
            requiredVersion: false,
            singleton: true,
        },
    },
};
