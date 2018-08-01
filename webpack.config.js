const path = require('path');
const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_PATH = path.resolve(__dirname, 'src')
const BUILD_PATH = path.resolve(__dirname, 'build')
const vendor = require('./vendor.json')

module.exports = {

    entry : ['react-hot-loader/patch', 'webpack-hot-middleware/client', './src/app'],

    output : {
        publicPath : '/',
        path : BUILD_PATH,
        filename: 'bundle.js',
    },

    devtool : 'source-map',

    module : {
      loaders : [
        {
          test : /\.jsx?$/,
          include: SRC_PATH,
          loader : 'babel-loader'
        },
        {
          test : /\.css$/,
          loader : 'style-loader?sourceMap!css-loader?sourceMap'
        },
        {
          test : /\.less$/,
          include: SRC_PATH,
          loader : 'style-loader?sourceMap!css-loader?sourceMap!less-loader?sourceMap'
        },
        {
          test : /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)/,
          include : SRC_PATH,
          loader : 'url-loader?name=[path][name].[ext]?[hash]?limit=4096'
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
        modules: ['src', 'node_modules']
    },

    plugins : [
        new HardSourceWebpackPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
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
