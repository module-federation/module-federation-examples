module.exports = {
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                include: /node_modules/,
                type: "javascript/auto",
            },
            {
                test: /\.(js|jsx|mjs)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: false,
                        },
                    },
                ],
            }
        ],
    },
};
