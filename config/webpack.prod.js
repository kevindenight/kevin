const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    'entry': {
        'app': ['./src/app.js'],
        'vendor': [
            'lodash',
            'react',
            'react-dom'
        ]
    },
    'devtool': 'source-map',
    'output': {
        'chunkFilename': '[name].[chunkhash].js',
        'filename': '[name].[chunkhash].js'
    },
    'plugins': [
        new CleanWebpackPlugin(['dist']),
        new UglifyJSPlugin({'sourceMap': true}),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')})
    ]
});