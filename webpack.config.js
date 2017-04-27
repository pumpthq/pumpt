const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_PATH = path.resolve(__dirname, 'src')
const BUILD_PATH = path.resolve(__dirname, 'build')

module.exports = {

    entry : ['webpack-hot-middleware/client', './src/app'],

    output : {
        publicPath : '/',
        path : BUILD_PATH,
        filename: 'bundle.js',
    },

    devtool : 'source-map',

    module : {
        loaders : [
            {
                test : /\.(js|jsx)$/,
                include: SRC_PATH,
                loaders : ['react-hot','babel-loader']
            },
            {
                test : /\.css$/,
                include: SRC_PATH,
                loader : 'style!css?sourceMap'
            },
            {
                test : /\.less$/,
                include: SRC_PATH,
                loader : 'style!css!less'
            },
            {
                test : /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)/,
                include : /\/node_modules\//,
                loader : 'url?name=[1].[ext]?[hash]&regExp=node_modules/(.*)?limit=4096'
            },
            {
                test : /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)/,
                include: SRC_PATH,
                loader : 'url?name=[path][name].[ext]?[hash]?limit=4096'
            },
            {
                test : /\.json$/,
                include: SRC_PATH,
                loader : 'json'
            }
        ]
    },

    resolve : {
        extensions : ['', '.js', '.jsx'],
    },

    plugins : [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template : './src/index.html',
            inject : 'body'
        })

    ]
};
