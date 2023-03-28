module.exports = {
    remotes: {
        css: {
            port: 4000,
            name: 'expose_css'
        },
        cssModule: {
            port: 4001,
            name: 'expose_css_modules'
        },
        jss: {
            port: 4002,
            name: 'expose_jss'
        },
        less: {
            port: 4003,
            name: 'expose_less'
        },
        scss: {
            port: 4004,
            name: 'expose_scss'
        },
        styledComponent: {
            port: 4005,
            name: 'expose_styled_component'
        },
        tailwindCssGlobal: {
            port: 4006,
            name: 'expose_tailwind_css_global'
        },
        tailwindCssModule: {
            port: 4007,
            name: 'expose_tailwind_css_module'
        },
    },
    getRemoteEntry: (remote) => `${remote.name}@//localhost:${remote.port}/remoteEntry.js`,
    mfeBaseConfig: {
        filename: 'remoteEntry.js',
        shared: {
            react: {
                requiredVersion: false,
                singleton: true,
            },
        },
    }
};
