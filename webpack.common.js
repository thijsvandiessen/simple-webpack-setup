const path = require('path');
const webpack = require('webpack');

// to create dynamicly an html file with the right sources
const HtmlWebpackPlugin = require('html-webpack-plugin');

// public folder
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/index.js')
  },

  // The base directory
  context: path.resolve(__dirname, ''),

  // great for bug fixing
  devtool: 'inline-source-map',

  plugins: [
    new HtmlWebpackPlugin({
      // inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html',
      title: 'A simple webpack setup',
      // favicon: './src/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
    }),
    new webpack.HotModuleReplacementPlugin(),

    // A static asset folder
    new CopyWebpackPlugin([
      { from: 'static/**' },
    ]),

  ],

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[hash:8].[ext]',
            outputPath: 'assets/'
          },
        }
      ]
    },
    ]
  },

  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[hash:8].js',

    // relative to HTML page
    // publicPath: ''
  }
};
