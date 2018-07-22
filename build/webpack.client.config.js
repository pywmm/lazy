const merge = require('webpack-merge');
// const webpack = require('webpack');
const path = require('path');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const common = require('./webpack.base.config.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: path.resolve(__dirname, '../src/entries/desktop/entry-client.js'),
    app2: path.resolve(__dirname, '../src/entries/app2.js'),
    // vendor: [
    //   'es6-promise/auto',
    //   'vue',
    //   'vue-router',
    //   'vuex',
    //   'vuex-router-sync',
    //   'axios',
    // ],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      name: 'testSplitChunks',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new VueSSRClientPlugin(),
  ],
});
