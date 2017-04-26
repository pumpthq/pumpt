const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry : {
        hot: 'webpack-hot-middleware/client',
        app: path.resolve(__dirname, 'src/app.js')
    },

    output : {
        publicPath : '/',
        path : path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },

    devtool : 'source-map',

    module : {
        loaders : [
            {
                test : /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'src'),
                loaders : ['react-hot','babel-loader']
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
    },

    plugins : [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template : './src/index.html',
            inject : 'body'
        })
    ]
};
