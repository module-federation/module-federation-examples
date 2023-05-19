const {getRemoteEntry, remotes} = require("../../expose-remotes/remotes.config");

module.exports = {
    name: 'combination_of_4',
    remotes: {
         expose_css: getRemoteEntry(remotes.css),
         expose_scss: getRemoteEntry(remotes.scss),
         expose_less: getRemoteEntry(remotes.less),
         expose_tailwind_css_global: getRemoteEntry(remotes.tailwindCssGlobal)
    },
    shared: {
        react: {
            requiredVersion: false,
            singleton: true,
        },
    },
};
