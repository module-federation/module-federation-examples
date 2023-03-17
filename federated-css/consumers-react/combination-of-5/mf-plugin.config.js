const {getRemoteEntry, remotes} = require("../../expose-remotes/remotes.config");

module.exports = {
    name: 'combination_of_5',
    remotes: {
         expose_tailwind_css_module: getRemoteEntry(remotes.tailwindCssModule),
         expose_jss: getRemoteEntry(remotes.jss),
         expose_css: getRemoteEntry(remotes.css),
         expose_less: getRemoteEntry(remotes.less),
         expose_scss: getRemoteEntry(remotes.scss)
    },
    shared: {
        react: {
            requiredVersion: false,
            singleton: true,
        },
    },
};
