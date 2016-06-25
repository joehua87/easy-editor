const path = require('path')

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.json/,
        loader: 'json-loader',
      },
    ],
    include: /node_modules/
  }
}
