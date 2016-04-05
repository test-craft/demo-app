'use strict';

var path = require('path');
var webpack = require("webpack");

var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
var isProduction = (env === 'production');

console.log('Running for [' + env + ']');
console.log('isProduction [' + isProduction + ']');

module.exports = {
    context: path.resolve(__dirname + '/app'),
    entry: './app.js',
    output: {
        path : path.resolve(__dirname, 'app'),
        filename: isProduction ? './bundle.js' : './app/bundle.js',
        publicPath : '/'
    },
    resolve: {
        root: [
            path.resolve(__dirname + "/app/modules"),
            path.resolve(__dirname + "/3rd-party")
        ],
        alias: {
            config: path.join(__dirname + '/app/modules/core/config/core.development.values.js'),
            restangularConfig: path.join(__dirname + '/app/modules/core/config/restangular.development.config.js')
        }
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.scss$/, loader: "style!css!sass" },
            { test: /\.html$/, exclude: /node_modules/, loader:"raw" },

            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },

            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    plugins: isProduction ? [
        new webpack.optimize.UglifyJsPlugin({minimize: false, mangle : false})
    ] : [],

    devServer: {
        contentBase: "./",
        noInfo: false,
        hot: true
    },

    devtool: isProduction ? "" : "#inline-source-map"
};