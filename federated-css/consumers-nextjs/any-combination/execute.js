const process = require('process');
const fs = require('fs');
const path = require('path');

const exposeScopesMap = {
    'expose-css': {
        page: 'consume-css-page',
        mfConfig: {
            key: 'expose_css',
            dep: 'getRemoteEntry(remotes.css)',
        }
    },
    'expose-css-module': {
        page: 'consume-css-module-page',
        mfConfig: {
            key: 'expose_css_module',
            dep: 'getRemoteEntry(remotes.cssModule)',
        }
    },
    'expose-jss': {
        page: 'consume-jss-page',
        mfConfig: {
            key: 'expose_jss',
            dep: 'getRemoteEntry(remotes.jss)',
        }
    },
    'expose-less': {
        page: 'consume-less-page',
        mfConfig: {
            key: 'expose_less',
            dep: 'getRemoteEntry(remotes.less)',
        }
    },
    'expose-scss': {
        page: 'consume-scss-page',
        mfConfig: {
            key: 'expose_scss',
            dep: 'getRemoteEntry(remotes.scss)',
        }
    },
    'expose-styled-component': {
        page: 'consume-styled-component-page',
        mfConfig: {
            key: 'expose_styled_component',
            dep: 'getRemoteEntry(remotes.styledComponent)',
        }
    },
    'expose-tailwind-component': {
        page: 'consume-tailwind-component-page',
        mfConfig: {
            key: 'expose_tailwind_component',
            dep: 'getRemoteEntry(remotes.tailwindComponent)',
        }
    },
    'expose-tailwind-css-global': {
        page: 'consume-tailwind-global-css-page',
        mfConfig: {
            key: 'expose_tailwind_css_global',
            dep: 'getRemoteEntry(remotes.tailwindCssGlobal)',
        }
    },
    'expose-tailwind-css-module': {
        page: 'consume-tailwind-module-css-page',
        mfConfig: {
            key: 'expose_tailwind_css_module',
            dep: 'getRemoteEntry(remotes.tailwindCssModule)',
        }
    },
};

const consumedRoutes = (pages) => `import React from 'react';
${pages.map((page, idx) => `import Page${idx} from './${page}';`).join('\n')}

const consumedRoutes = [
${pages.map((page, idx) => `    {
        path: '${page}',
        component: Page${idx},
    }`).join(', \n')}
];

export default consumedRoutes;
`;


const mfPluginConfig = (configs) => `const {getRemoteEntry, remotes} = require("../../expose-remotes/remotes.config");

module.exports = {
    name: 'any-combination',
    remotes: {
${configs.map(conf => `         ${conf.key}: ${conf.dep}`).join(', \n')}
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
`

const routeIndex = (page) => (`import Navigation from '../../components/Navigation';
import Container from '../../components/pages/${page}';
import React from 'react';

export default function Home() {
    return (
        <div>
            <Navigation />
            <Container />
        </div>
    );
}`);

const argv = JSON.parse(process.env.npm_config_argv);
const scopes = argv.original.filter(arg => arg.includes('--scope'));
const mapped = scopes.map(scope => scope.replace('--scope=@federated-css/', ''));
const pages = mapped.map(s => exposeScopesMap[s].page);
const mfConfigs = mapped.map(s => exposeScopesMap[s].mfConfig);

fs.writeFile(path.join(__dirname, '/components/pages/consumed-routes.js'), consumedRoutes(pages), (err) => {
    if(err) {
        console.log(err);
    }
    console.info('Consumed routes generated');

    pages.forEach(page => {
        fs.copyFile(
            path.join(__dirname, `../boilerplates/${page}.js`),
            path.join(__dirname, `/components/pages/${page}.js`), (err) => {
            if (err) throw err;
            console.log(`${page}.js copied from boilerplates to pages`);
        });
        fs.mkdirSync(path.join(__dirname, `/pages/${page}`), { recursive: true });
        fs.writeFile(path.join(__dirname, `/pages/${page}/index.js`), routeIndex(page), (err) => {
            if(err) {
                console.log(err)
            }
            console.log(`${page} route index created`);
        });
    });


    fs.writeFile(path.join(__dirname, '/mf-plugin.config.js'), mfPluginConfig(mfConfigs), (err) => {
        if(err) {
            console.log(err);
        }
        console.info('Module Federation Plugin Config  generated');

    });
});


