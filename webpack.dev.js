const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    'module': {
        'rules': [
            {
                'enforce': 'pre',
                'test': /\.js$/,
                'exclude': /node_modules/,
                'loader': 'eslint-loader'
            }
        ]
    },
    'plugins': [new webpack.HotModuleReplacementPlugin()],
    'devtool': 'inline-source-map',
    'devServer': {
        'contentBase': './dist',
        'hot': true
    },
    'output': {
        'filename': '[name].[hash].js',
        'chunkFilename': '[name].[hash].js'
    }
});