const {AngularCompilerPlugin, PLATFORM} = require('@ngtools/webpack');
const {resolve} = require('path');
const ContainerReferencePlugin = require('webpack/lib/container/ContainerReferencePlugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const {ContextReplacementPlugin} = require('webpack');

module.exports = (env = {}) => {
    const buildFolder = resolve('./dist/server');

    return {
        entry: ['./server.js'],
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
            // ContainerReferencePlugin for Host allows to statically import shared libs
            // new ContainerReferencePlugin({
            //     remoteType: 'commonjs2',
            //     remotes: {clientWeather: `${config.buildRoot}/client/server/remoteEntry.js`},
            //     overrides: ['@angular/core', '@angular/common', '@angular/router']
            // }),

            // OR:

            // new ModuleFederationPlugin({
            //   name: 'mfe1',
            //   library: { type: 'commonjs2' },
            //   filename: 'remoteEntry.js',
            //   remotes: {
            //     mfe1: path.resolve(__dirname, 'dist/mfe1/server/remoteEntry.js')
            //   },
            //   shared: ['@angular/core', '@angular/common', '@angular/router']
            // }),

            new ContextReplacementPlugin(/@?hapi(\\|\/)/),
            new ContextReplacementPlugin(/express(\\|\/)/),
            new AngularCompilerPlugin({
                entryModule: resolve(
                    __dirname,
                    '../src/app/app.server.module#AppServerModule'
                ),
                tsConfigPath: './tsconfig.server.json',
                platform: PLATFORM.Server,
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
