'use strict';

const webpack = require('karma-webpack');
const webpackConfig = require('./webpack.karma.config');

module.exports = function (config) {
    config.set({
        frameworks : [
            'jasmine',
            'sinon',
            'chai'
        ],
        files : [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            'src/**/*.spec.js'
        ],
        plugins : [
            webpack,
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-spec-reporter',
            'karma-sinon',
            'karma-chai'
        ],
        browsers : ['PhantomJS'],
        preprocessors : {
            'src/**/*.spec.js' : ['webpack']
        },
        reporters : [
            'spec',
            'coverage'
        ],
        coverageReporter : {
            dir : 'reports/coverage',
            reporters : [
                { type : 'html', subdir : 'report-html' },
                { type : 'lcov', subdir : 'report-lcov' },
                { type : 'cobertura', subdir : '.', file : 'cobertura.txt' }
            ]
        },
        webpack : webpackConfig,
        webpackMiddleware : { noInfo : true }
    })
};
