const {getRemoteEntry, remotes} = require("../../expose-remotes/remotes.config");

module.exports = {
    name: 'jss_and_tailwind_component_next',
    remotes: {
        expose_jss: getRemoteEntry(remotes.jss),
        expose_tailwind_css_global: getRemoteEntry(remotes.tailwindCssGlobal)
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
