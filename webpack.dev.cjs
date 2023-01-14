const { merge } = require('webpack-merge')
const common = require('./webpack.common.cjs');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: './dist',
    // gzip compression
    compress: true,
    port: 4000,
    hot: true
  },
});
