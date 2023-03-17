const {getRemoteEntry, remotes} = require("../../expose-remotes/remotes.config");

module.exports = {
    name: 'next-jss-css-and-tailwind-module',
    remotes: {
         expose_css_module: getRemoteEntry(remotes.cssModule),
         expose_jss: getRemoteEntry(remotes.jss),
         expose_tailwind_css_module: getRemoteEntry(remotes.tailwindCssModule)
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
