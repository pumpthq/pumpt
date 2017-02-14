const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackConfig = require('./webpack.config');

module.exports = {

    entry : {
        app: './src/app',
        shared: webpackConfig.entry.shared
    },

    output : {
        path : __dirname + '/build',
        publicPath : '',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
    },

    module : {
        loaders : [
            {
                test : /\.(js|jsx)?$/,
                exclude : /(node_modules|bower_components)/,
                loader : 'babel'
            },
            {
                test : /\.css$/,
                loader : ExtractTextPlugin.extract('style', 'css?minimize')
            },
            {
                test : /\.less/,
                loader : ExtractTextPlugin.extract('style', 'css!less')
            },
            {
                test : /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)/,
                include : /\/node_modules\//,
                loader : 'file?name=[1]?[hash]&regExp=node_modules/(.*)'
            },
            {
                test : /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)/,
                exclude : /\/node_modules\//,
                loader : 'file?name=[path][name].[ext]?[hash]'
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
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.CommonsChunkPlugin('shared.js'),
        new webpack.optimize.UglifyJsPlugin({
            compress : {
                warnings : false,
                drop_console : true,
                unsafe : true
            }
        }),
        new HtmlWebpackPlugin({
            template : './src/index.html',
            inject : 'body'
        })
    ]
};
