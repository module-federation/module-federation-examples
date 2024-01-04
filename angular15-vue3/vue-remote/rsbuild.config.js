import {defineConfig} from '@rsbuild/core';
import {pluginVue} from '@rsbuild/plugin-vue';
import rspack from '@rspack/core';

export default defineConfig({
    server: {
        port: 3000,
    },
    source: {
        alias: {
            '@': './src/',
        },
    },
    performance: {
        chunkSplit: {
            override: {
                chunks: 'async',
                minSize: 30000,
            },
        },
    },
    tools: {
        rspack: {
            output: {
                publicPath: 'auto',
            },
            plugins: [new rspack.container.ModuleFederationPlugin({
                name: 'vue_remote',
                filename: 'remoteEntry.js',
                exposes: {
                    './customElement': './src/components/HelloWorld.web-component.js',
                    './app': './src/components/HelloWorld.bootstrap.js',
                },
                shared: {
                    vue: {
                        singleton: true,
                    },
                },
            })],
        },
    },
    plugins: [pluginVue()],
});
