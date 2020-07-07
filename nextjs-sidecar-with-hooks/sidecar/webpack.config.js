const { ModuleFederationPlugin } = require('webpack').container;
const { dependencies } = require('../package.json');

module.exports = {
    output: {
        publicPath: 'http://localhost:8081/'
    },
    resolve: {
        extensions: [ '.js' ]
    },
    devServer: {
        port: 8081
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/preset-react', '@babel/preset-env' ]
                    }
                }
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'app1',
            library: { type: 'var', name: 'app1' },
            filename: 'remoteEntry.js',
            exposes: {
                './Header': '../src/components/Header'
            },
            shared: {
                ...dependencies,
                react: {
                    import: false,
                    singleton: true
                }
            }
        })
    ]
};