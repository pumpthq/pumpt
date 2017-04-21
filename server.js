const path = require('path');
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');

const { NODE_ENV, HOST, PORT, REMOTE_API_HOST, REMOTE_API_PORT } = require('./config');
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
        const webpackConfig = require('./webpack.config');
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
        const buildAppPath = path.join(__dirname, './build').normalize();

        app.use('/', express.static(buildAppPath));
        break;
}


app.use('/api', proxy({
    target : `${REMOTE_API_HOST}:${REMOTE_API_PORT}`,
    changeOrigin : true,
    ws : true,
    pathRewrite : {
        '^/api' : ''
    }
}));

app.listen(PORT, function () {
    console.log(`${NODE_ENV} server listening at ${HOST}:${PORT}`);
})
