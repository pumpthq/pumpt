const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry : {
        hot: 'webpack-hot-middleware/client',
        app: path.join(__dirname, './src/app').normalize(),
        shared: [
            'axios',
            'babel-polyfill',
            'bluebird',
            'bson-objectid',
            'co',
            'compact-object',
            'deep-copy',
            'deep-equal',
            'email-validator',
            'lodash',
            'lodash.pick',
            'moment',
            'number-to-words',
            'react',
            'react-dom',
            'react-redux',
            'react-restricted-input',
            'react-router',
            'react-router-redux',
            'react-slick',
            'react-textarea-autosize',
            'redux',
            'redux-actions',
            'redux-form',
            'redux-localstorage',
            'redux-logger',
            'redux-saga',
            'redux-thunk',
            'shortid',
            'slick-carousel',
            'uuid',
            'valid-url',
            'validate.js',
            'year-range-regex'
        ]
    },

    output : {
        publicPath : '/',
        path : path.join(__dirname, './build').normalize(),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
    },

    devtool : 'source-map',

    module : {
        loaders : [
            {
                test : /\.(js|jsx)$/,
                exclude : /(node_modules|bower_components)/,
                loaders : ['react-hot', 'babel-loader?cacheDirectory']
            },
            {
                test : /\.css$/,
                loader : 'style!css?sourceMap'
            },
            {
                test : /\.less$/,
                loader : 'style!css!less'
            },
            {
                test : /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)/,
                include : /\/node_modules\//,
                loader : 'url?name=[1].[ext]?[hash]&regExp=node_modules/(.*)?limit=4096'
            },
            {
                test : /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)/,
                exclude : /\/node_modules\//,
                loader : 'url?name=[path][name].[ext]?[hash]?limit=4096'
            },
            {
                test : /\.json$/,
                exclude : /\/node_modules\//,
                loader : 'json'
            }
        ]
    },

    resolve : {
        extensions : ['', '.js', '.jsx'],
        modulesDirectories : ['src', 'node_modules']
    },

    plugins : [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('shared.js'),
        new HtmlWebpackPlugin({
            template : './src/index.html',
            inject : 'body'
        })
    ]
};
