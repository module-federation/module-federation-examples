const {getRemoteEntry, remotes} = require("../../expose-remotes/remotes.config");

module.exports = {
    name: 'next-combination-of-4',
    remotes: {
         expose_css: getRemoteEntry(remotes.css),
         expose_scss: getRemoteEntry(remotes.scss),
         expose_less: getRemoteEntry(remotes.less),
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
