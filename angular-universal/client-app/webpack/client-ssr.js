const {AngularCompilerPlugin, PLATFORM} = require('@ngtools/webpack');
const {resolve} = require('path');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const ContainerPlugin = require('webpack/lib/container/ContainerPlugin');

module.exports = (env = {}) => {
    const buildFolder = resolve('./dist/server');

    return {
        entry: ['./src/main.ts'],
        mode: 'development',
        resolve: {
            mainFields: ['es2015', 'module', 'main']
        },
        target: 'node',
        optimization: {minimize: false},
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ['raw-loader', 'sass-loader']
                },
                {
                    test: /\.css$/,
                    loader: 'raw-loader'
                },
                {
                    test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                    loader: '@ngtools/webpack',
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader'
                },
            ]
        },
        externals: ['enhanced-resolve'],
        plugins: [
            new ProgressPlugin(),
            new ContainerPlugin({
                name: 'clientApp',
                filename: 'remoteEntry.js',
                exposes: {
                    Component: './src/app/client-weather/client-weather-city/client-weather-city.component.ts',
                    Module: './src/app/client-weather/client-weather.module.ts'
                },
                library: {type: 'commonjs2', name: 'clientApp'},
                overridables: ['@angular/core', '@angular/common', '@angular/router']
            }),
            new AngularCompilerPlugin({
                entryModule: resolve(__dirname, '../src/app/app.module#AppModule'),
                tsConfigPath: './tsconfig.app.json',
                platform: PLATFORM.Browser,
                skipCodeGeneration: true,
                directTemplateLoading: false,
            })
        ],

        output: {
            filename: '[name].js',
            path: resolve(__dirname, buildFolder),
            chunkFilename: '[id].[chunkhash].js',
            libraryTarget: 'commonjs2',
        },
    };
}


