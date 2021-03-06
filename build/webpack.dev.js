const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.base.config.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
  },
  devServer: {
    // contentBase: path.resolve(__dirname, '../dist'),
    port: 9000,
    historyApiFallback: {
      rewrites: [
        { from: /^\/test/, to: '/index.html' },
      ],
    },
    hot: true,
    noInfo: false,
    overlay: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },
    quiet: false,
    open: true,
    // publicPath: '/assets/2/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
