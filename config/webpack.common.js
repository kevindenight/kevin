const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
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
    'module': {
        'rules': [
            {
                'exclude': /node_modules/,
                'test': /\.js$/,
                'use': [
                    {
                        'loader': 'babel-loader',
                        'query': {
                            'presets': ['babel-preset-env'].
                                map(require.resolve)
                        }
                    }
                ]
            },
            {
                'test': /\.scss$/,
                'use': [
                    {'loader': 'style-loader'},
                    {'loader': 'css-loader'},
                    {'loader': 'postcss-loader'},
                    {'loader': 'sass-loader'}
                ]
            },
            {
                'test': /\.(png|svg|jpg|gif)$/,
                'use': ['file-loader']
            },
            {
                'test': /\.(woff|woff2|eot|ttf|otf)$/,
                'use': ['file-loader']
            }
        ]
    },
    'output': {
        'path': path.resolve(__dirname, '../dist'),
        'publicPath': '/'
    },
    'plugins': [
        new ManifestPlugin(),
        new HtmlWebpackPlugin({
            'template': 'index.html',
            'title': 'Kevin homepage'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.CommonsChunkPlugin({'name': 'vendor'}),
        new CopyWebpackPlugin(['./src/static']),
        new webpack.ProvidePlugin({'$': 'zepto-webpack'})
    ]

    /*
     * Externals: {
     *     'react': 'React',
     *     'react-dom': 'ReactDOM'
     * },
     */
};