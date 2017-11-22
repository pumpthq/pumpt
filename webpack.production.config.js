const path = require('path');
const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SRC_PATH = path.resolve(__dirname, 'src')
const BUILD_PATH = path.resolve(__dirname, 'build')
const vendor = require('./vendor.json')

module.exports = {

    entry : {
        app: './src/app',
    },

    output : {
        path : BUILD_PATH,
        publicPath : '',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
    },

    module : {
        loaders : [
          {
              test : /\.jsx?$/,
              include: SRC_PATH,
              loaders : ['babel-loader']
          },
            {
                test : /\.css$/,
                loader : ExtractTextPlugin.extract({
                  fallback:'style-loader',
                  use: 'css-loader?minimize'
                })
            },
            {
                test : /\.less/,
                include: SRC_PATH,
                loader : ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: 'css-loader!less-loader'
                })
            },
            {
                test : /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)/,
                include : /\/node_modules\//,
                loader : 'file-loader?name=[1]?[hash]&regExp=node_modules/(.*)'
            },
            {
                test : /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)/,
                include: SRC_PATH,
                loader : 'file-loader?name=[path][name].[ext]?[hash]'
            },
            {
                test : /\.json$/,
                include: SRC_PATH,
                loader : 'json-loader'
            }
        ]
    },

    resolve : {
        extensions : ['.js', '.jsx'],
        modules : ['src', 'node_modules']
    },

    plugins : [
        new HardSourceWebpackPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('styles.css'),
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
        }),
        new AutoDllPlugin({
          inject: true, // will inject the DLL bundles to index.html
          filename: '[name]_[hash].js',
          entry: {vendor}
      })
    ]
};
