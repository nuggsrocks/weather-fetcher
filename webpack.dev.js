const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-dev-tool',
	watch: true,
	module: {
		rules: [
		{
			test: /\.css$/,
			loader: ['style-loader', 'css-loader']
		},
		{
			test: /\.scss$/,
			loader: ['style-loader', 'css-loader', 'sass-loader']
		},
		]
	},
	plugins: [
		new webpack.EnvironmentPlugin({
			HOST: 'http://localhost',
			PORT: 8080
		})
	]
});