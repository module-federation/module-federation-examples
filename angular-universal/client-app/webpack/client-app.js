const {resolve} = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {AngularCompilerPlugin} = require('@ngtools/webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ContainerPlugin = require('webpack/lib/container/ContainerPlugin');

module.exports = (env = {}) => {
    const buildFolder = resolve('./dist');

    return {
        entry: ['./src/polyfills.ts', './src/main.ts'],
        mode: 'production',
        output: {
            publicPath: 'http://localhost:5000/',
            path: resolve(__dirname, buildFolder),
        },
        plugins: [
            new ProgressPlugin(),
            new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: [buildFolder]}),
            new HtmlWebpackPlugin({template: resolve(__dirname, '../src/index.html')}),
            new ContainerPlugin({
                name: 'clientApp',
                filename: 'remoteEntry.js',
                exposes: {
                    Component: './src/app/client-weather/client-weather-city/client-weather-city.component.ts',
                    Module: './src/app/client-weather/client-weather.module.ts'
                },
                library: {type: 'var', name: 'clientApp'},
                overridables: ['@angular/core', '@angular/common', '@angular/router']
            }),
            new AngularCompilerPlugin({
                tsConfigPath: './tsconfig.app.json',
                entryModule: './src/app/app.module#AppModule',
                skipCodeGeneration: true,
                directTemplateLoading: false
            }),
        ],
        devServer: {
            contentBase: buildFolder,
            port: 5000
        },
        module: {
            rules: [ ...require('./_loaders') ]
        },
    };
};
