const path = require('path');
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');

const config = require('./config');
const HOST = config.host;
const PORT = config.port;
const NODE_ENV = config.env;
const remoteApiUrl = config.remoteApi.url;

const app = express();

app.use(cors());
app.use(expressWinston.logger({
    transports : [
        new winston.transports.Console({
            json : true,
            colorize : true
        })
    ],
    meta : true,
    msg : 'HTTP {{req.method}} {{req.url}}',
    expressFormat : true,
    colorStatus : true,
    ignoreRoute : function (req, res) { return false; }
}));

switch (NODE_ENV) {
    case 'development' :
        const webpack = require('webpack');
        const webpackConfig = require('./../webpack.config.js');
        const compiler = webpack(webpackConfig);

        app.use(require('webpack-dev-middleware')(compiler, {
            withCredentials : false,
            noInfo : true,
            quiet : false,
            lazy : false,
            watchOptions : {
                aggregateTimeout : 300,
                poll : true
            },
            stats : {
                colors : true
            }
        }));
        app.use(require('webpack-hot-middleware')(compiler));

        break;
    default :
        const buildAppPath = path.join(__dirname, './../build').normalize();

        app.use('/', express.static(buildAppPath));
        break;
}

console.log(remoteApiUrl);

app.use('/api', proxy({
    target : remoteApiUrl,
    changeOrigin : true,
    ws : true,
    pathRewrite : {
        '^/api' : ''
    }
}));

app.listen(PORT, function () {
    console.log(`${NODE_ENV} server listening at ${HOST}:${PORT}`);
})
