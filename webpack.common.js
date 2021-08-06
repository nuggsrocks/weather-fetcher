const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    main: './js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
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
        loader: 'html-loader'
      },
      {
        test: /\.(jpe?g|png|gif)/,
        loader: 'file-loader'
      }
    ]
  },
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      meta: {
        charset: 'utf-8',
        viewport: 'width=device-width,initial-scale=1.0'
      }
    })
  ]

}
