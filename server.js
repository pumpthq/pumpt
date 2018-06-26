require('./config')
require('./config/api')

const path = require('path');
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan')
const fallback = require('express-history-api-fallback');

const { NODE_ENV, HOST, PORT, REMOTE_API_HOST, REMOTE_API_PORT } = process.env

const app = express();

// app.use(cors());
app.use(morgan('dev'))
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/', express.static(path.join(__dirname, 'letsencrypt')));
app.use('/api', proxy({
    target : `${REMOTE_API_HOST}:${REMOTE_API_PORT}`,
    changeOrigin : true,
    ws : true,
    pathRewrite : {
        '^/api' : ''
    }
}));

switch (NODE_ENV) {
    case 'development' :
        const webpack = require('webpack');
        const webpackConfig = require('./webpack.config');
        const compiler = webpack(webpackConfig);

        const devMiddleware = require('webpack-dev-middleware')(compiler, {
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
            },
          publicPath: webpackConfig.output.publicPath,
          historyApiFallback: true,

        });
        app.use(devMiddleware);
        this.middleware = devMiddleware;
        app.use(require('webpack-hot-middleware')(compiler));

    app.get('*', function(req, res) {
      var index = this.middleware.fileSystem.readFileSync(path.join(webpackConfig.output.path, 'index.html'));
      res.end(index);
    }.bind(this));

        break;
    default :
        const buildAppPath = path.join(__dirname, './build').normalize();

        app.use('/', express.static(buildAppPath));
        app.use(fallback('index.html', {root: buildAppPath}))
        break;
}




app.listen(PORT, function () {
    console.log(`${NODE_ENV} server listening at ${HOST}:${PORT}`);
})
