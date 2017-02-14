'use strict';

const path = require('path');

module.exports = {
    title : 'My Great Style Guide',
    components : './src/components/**/*.jsx',
    updateWebpackConfig : function (webpackConfig, env) {
        // Your source files folder or array of folders, should not include node_modules
        let dir = path.join(__dirname, 'src');
        webpackConfig.module.loaders.push(
            // Babel loader will use your project’s .babelrc
            {
                test : /\.jsx?$/,
                include : dir,
                loader : 'babel'
            },
            // Other loaders that is needed for your components
            {
                test : /\.css$/,
                include : dir,
                loader : 'style!css?modules&importLoaders=1'
            }
        );
        return webpackConfig;
    },
    getExampleFilename : function (componentpath) {
        return componentpath.replace(/\.jsx?$/, '.examples.md');
    },
};
