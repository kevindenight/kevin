const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    'entry': {
        'app': [
            './src/app.js',
            'webpack-hot-middleware/client?name=app'
        ],
        'vendor': [
            'lodash',
            'react',
            'react-dom',
            'webpack-hot-middleware/client?name=vendor'
        ]
    },
    'watchOptions': {'poll': true},
    'devServer': {
        'contentBase': './dist',
        'hot': true
    },
    'devtool': 'inline-source-map',
    'module': {
        'rules': [
            {
                'enforce': 'pre',
                'exclude': /node_modules/,
                'loader': 'eslint-loader',
                'test': /\.js$/
            }
        ]
    },
    'output': {
        'chunkFilename': '[name].[hash].js',
        'filename': '[name].[hash].js'
    },
    'plugins': [new webpack.HotModuleReplacementPlugin()]
});