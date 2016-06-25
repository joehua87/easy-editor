const path = require('path')

module.exports = {
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ],
      }
    ],
    include: path.resolve(__dirname, '../')
  }
}
