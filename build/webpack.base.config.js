const path = require('path');
// const vueConfig = require('./vue-loader.config');

// const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // devtool: isProd
  //   ? 'source-map'
  //   : false,
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, '../src/entries/app.js'),
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
    // filename: '[name].[chunkhash].js',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    // noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   exclude: /node_modules/,
      //   options: {
      //     cache: !isProd,
      //   },
      // },
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: vueConfig,
      // },
      // {
      //   test: /\.js$/,
      //   loader: `babel-loader${!isProd ? '?cacheDirectory=true' : ''}`,
      //   exclude: /node_modules/,
      // },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'file-loader',
        // options: {
        //   limit: 10240,
        //   name: '[name].[ext]?[hash]',
        // },
      },
      // {
      //   test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      //   loader: 'url-loader',
      //   query: {
      //     limit: 10000,
      //     name: 'fonts/[name].[hash:7].[ext]',
      //   },
      // },
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
