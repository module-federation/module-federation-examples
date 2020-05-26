const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const path = require('path');
const ContainerPlugin = require('webpack/lib/container/ContainerPlugin');
const config = require('./common.conf');


module.exports = {
    entry: ['./projects/client/src/main.ts'],
    resolve: {
        mainFields: ['browser', 'module', 'main']
    },
    target: 'node',
    module: {
        rules: [
            ...config.loaders
        ]
    },
    plugins: [
        new ContainerPlugin({
            name: 'clientWeather',
            filename: 'remoteEntry.js',
            exposes: {
                Component: './projects/client/src/app/app.component.ts',
                Module: './projects/client/src/app/client-weather/client-weather.module.ts'
            },
            library: {type: 'commonjs2'},
            overridables: ['@angular/core', '@angular/common', '@angular/router']
        }),
        new AngularCompilerPlugin({
            tsConfigPath: './projects/client/tsconfig.app.json',
            skipCodeGeneration: true,
            directTemplateLoading: false,
            entryModule: path.resolve(__dirname, '../projects/client/src/app/app.module#AppModule')
        })
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist/client/server'),
        chunkFilename: '[id].[chunkhash].js',
        libraryTarget: 'commonjs2'
    },
    mode: config.mode
};
