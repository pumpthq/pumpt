const config = {};

const DEFAULT_HOST = '37.139.29.63';

config.env = process.env.NODE_ENV || 'development';
config.babelEnv = process.env.BABEL_ENV || 'development';

config.host = process.env.HOST || DEFAULT_HOST;
config.port = process.env.PORT || 4000;

/* remote api configurations */

const remoteApi = {
    host: process.env.REMOTE_API_HOST || '37.139.29.63:3000',
    port: process.env.REMOTE_API_PORT || '80',
};

config.remoteApi = remoteApi;
config.remoteApi.url = `${remoteApi.host}:${remoteApi.port}`;

/* remote api configurations */

module.exports = config;
