const path = require('path')

module.exports = {
  mode: 'none',
  entry: {
    test: './test/test.js'
  },
  output: {
    path: path.resolve(__dirname, 'test/dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  target: 'node'

}
