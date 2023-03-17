const {getRemoteEntry, remotes} = require("../../expose-remotes/remotes.config");

module.exports = {
    name: 'any-combination',
    remotes: {
         expose_styled_component: getRemoteEntry(remotes.styledComponent), 
         expose_less: getRemoteEntry(remotes.less)
    },
    filename: 'static/chunks/remoteEntry.js',
    exposes: {
        './RemoteComponent': './components/nextjs-remote-page.js',
        './RemotePage': './pages/index.js',
    },
    shared: {
        react: {
            requiredVersion: false,
            singleton: true,
        },
    },
    extraOptions: {
        skipSharingNextInternals: true,
    },
};
