const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const vueConfig = require('./vue-loader.config');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // devtool: isProd
  //   ? 'source-map'
  //   : false,
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, '../src/entries/app.js'),
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
    // publicPath: './../dist/',
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
    }),
    new HtmlWebpackPlugin({
      // title: 'modify  auto created html title',
      filename: 'lazy.html', // the name of html file which created at last
      template: path.resolve(__dirname, '../src/index.html'), // html template
      chunks: ['app'],
      htmlWebpackPlugin: {
        options: {
          title: 'test',
        },
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'another.html',
    }),
  ],
  optimization: {
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
  module: {
    // noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          cache: !isProd,
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig,
      },
      {
        test: /\.js$/,
        loader: `babel-loader${!isProd ? '?cacheDirectory=true' : ''}`,
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10240, // 10240 byte, 1.024kb
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]',
        },
      },
      // {
      //   test: /\.svg/,
      //   loader: 'svg-loader',
      // },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
};
