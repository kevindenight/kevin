const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/app.js',
        vendor: [
            'lodash'
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: [
                            'babel-preset-env'
                        ].map(require.resolve)
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [ 'style', 'css', 'sass' ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [ 'file-loader' ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [ 'file-loader' ]
            }
        ]
    },
    plugins: [
        new ManifestPlugin(),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: "Kevin homepage"
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
};