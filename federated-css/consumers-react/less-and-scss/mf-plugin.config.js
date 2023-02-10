const {getRemoteEntry, remotes} = require("../../expose-remotes/remotes.config");

module.exports = {
    name: 'less_and_scss',
    remotes: {
        expose_scss: getRemoteEntry(remotes.scss),
        expose_less: getRemoteEntry(remotes.less),
    },
    shared: {
        react: {
            requiredVersion: false,
            singleton: true,
        },
    },
};
