require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const processHTMLPages = require('./processHTMLHelper.js');

const OUTPUT = path.resolve(__dirname, 'build');

const plugins = [
  new MiniCssExtractPlugin(),
  ...processHTMLPages(),
  // new HtmlWebpackInlineSVGPlugin({ path: OUTPUT})
];

module.exports = {
  entry: {
    index: process.env.NODE_ENV === "development"
      ? ['webpack-dev-server/client', './source/js/index.js']
      : ['./source/js/index.js'],
  },
  module: {
    rules: [
      {
        test: [/\.scss$/i, /\.sass$/i, /\.css$/],
        use: [MiniCssExtractPlugin.loader, 'css-loader?url=false', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(svg|jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.es6'],
    alias: {
      'fonts': path.resolve(__dirname, 'source/css/fonts')
    }
  },
  output: {
    path: OUTPUT,
    filename: 'js/[name].js',
  },
  devServer: {
    contentBase: './source'
  },
  plugins,
};

// console.log(module.exports.output);
