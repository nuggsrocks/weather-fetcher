const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        main: './front-end/src/js/index.js'
    },
    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: '[name].js'
    },
    target: 'web',
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {minimize: true}
                }
            },
            {
                test: /\.css$/,
                loader: [MiniCSSExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                loader: [MiniCSSExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './front-end/src/html/index.html',
            filename: './index.html'
        }),
        new MiniCSSExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
}
