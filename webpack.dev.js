const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    module: {
        rules: [{
            test: /\.js$/, // include .js files
            enforce: "pre", // preload the jshint loader
            exclude: /node_modules/, // exclude any and all files in the node_modules folder
            use: [{
                loader: "jshint-loader",
                options: {
                    camelcase: true,
                    emitErrors: false,
                    failOnHint: false,
                    undef: true,
                    unused: true,
                    globals: [
                        'console'
                    ],
                    esversion: '6'
                }
            }]
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js'
    }
});