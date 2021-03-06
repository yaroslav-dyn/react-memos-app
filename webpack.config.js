const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const dev = process.env.NODE_ENV !== 'production';

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, '/src/index.html'),
  filename: 'index.html',
  inject: 'body',
  favicon: "./src/assets/favicon.png"
});

const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
});

const PwaPluginConfig =  new CopyPlugin({
  patterns: [
    {
      from: path.resolve(__dirname, 'manifest.json'), to: path.resolve(__dirname, 'build/manifest.json'), 
    },
    {
      from: path.resolve(__dirname, 'serviceWorker.js'), to: path.resolve(__dirname, 'build/serviceWorker.js'),
    },
    { 
      from: path.resolve(__dirname, 'pwa/'), to: path.resolve(__dirname, 'build/pwa/'),
    }
  ]
})

module.exports = {
  devServer: {
    host: 'localhost',
    port: '3000',
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    contentBase: './',
    historyApiFallback: true,
  },
  entry: ['@babel/polyfill', 'whatwg-fetch', 'react-hot-loader/patch', path.join(__dirname, '/src/index.jsx')],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '/build'),
    publicPath: '/'
  },
  mode: dev ? 'development' : 'production',
  plugins: dev
    ? [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
    : [HTMLWebpackPluginConfig, DefinePluginConfig, PwaPluginConfig],
};
