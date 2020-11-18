const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	watch: false,
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.scss$/,
				loader: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css' 
		}),
		new webpack.EnvironmentPlugin({
			URL: 'https://desolate-cove-55536.herokuapp.com'
		})
	],
	optimization: {
		minimizer: [
			new TerserPlugin({
				extractComments: true
			}),
			new CssMinimizerPlugin()
		]
	}
});