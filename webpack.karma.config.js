module.exports = {
    resolve : {
        extensions : ['', '.js', '.jsx'],
        modulesDirectories : ['src', 'node_modules']
    },
    module : {
        loaders : [
            {
                test : /\.(js|jsx)$/,
                exclude : /(node_modules|bower_components)/,
                loader : 'babel'
            },
            {
                test : /\.css$/,
                loader : 'style!css?sourceMap'
            },
            {
                test : /\.less/,
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
        ],
        postLoaders : [
            {
                test : /\.(js|jsx)$/, exclude : /(node_modules|bower_components|__tests__|www|lib)/,
                loader : 'istanbul-instrumenter'
            }
        ]
    }
};
