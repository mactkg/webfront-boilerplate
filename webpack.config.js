const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  // context: resolve(__dirname, 'src'),

  entry: [
    'webpack-dev-server/client?http://localhost:9000',
    'webpack/hot/only-dev-server',
    './app/js/index'
  ],

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devtool: 'inline-source-map',

  devServer: {
    port: 9000,
    hot: true,
    contentBase: resolve(__dirname, 'app'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [ 'babel-loader' ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    // NODE_ENV見えるようにしておく
    new webpack.HotModuleReplacementPlugin(),
    // HMR
    new webpack.NamedModulesPlugin(),
    // HMRしたときに名前がきちんとわかりやすくなる
  ],
};
