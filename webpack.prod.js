const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: './'
            }
          },
          'css-loader',
          {
            // autoprefix
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')]
            },
          },
          'sass-loader'
        ]
      },
    ]
  },

  optimization: {
    // Tree shaking
    usedExports: true,
    minimize: true,

    minimizer: [
      // minify css
      new OptimizeCSSAssetsPlugin(),
      // minify javascirpt
      new TerserPlugin()
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: "[id].[hash:8].css"
    }),
  ],

});
