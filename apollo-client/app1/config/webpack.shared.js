const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
    optimization: {
        minimize: false,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', 'css', 'scss'],
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                type: 'javascript/auto',
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(js|ts)x?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,
                exclude: /node_modules/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]--[hash:base64:5]',
                            },
                            importLoaders: 2,
                        },
                    }, {loader: 'postcss-loader'}, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    }],
            },

        ],
    },
};

module.exports = webpackConfig;
