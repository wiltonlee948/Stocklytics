const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: ['./client/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  mode: 'production',

  devServer: {
    host: 'localhost',
    port: 8080,

    static: {
      directory: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    // enable hot module reload on dev server
    hot: true,
    // html file served instead of 404 response
    historyApiFallback: true,
    // proxy: {
    //   '/api/**': {
    //     target: 'http://localhost:3000/',
    //     secure: false,
    //   },
    // },
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html'
    })
  ],
  resolve: {
    // Enable JS/JSX imports without specifying extension
    extensions: ['.js', '.jsx'],
  }
};
