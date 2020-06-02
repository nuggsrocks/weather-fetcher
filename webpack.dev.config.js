const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: [
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
		'./src/js/index.js'
	],
	output: {
		path: path.join(__dirname, 'public'),
		publicPath: '/',
		filename: '[name].js'
	},
	target: 'web',
	mode: 'development',
	devtool: 'source-map',
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					emitWarning: true,
					failOnError: true,
					failOnWarning: false
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: 'file-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/html/index.html',
			filename: './index.html'
		}),
		new webpack.HotModuleReplacementPlugin()
	]
}
