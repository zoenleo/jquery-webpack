const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map', //配置生成Source Maps
  entry: __dirname + '/index.js', //已多次提及的唯一入口文件
  output: {
    path: __dirname + '/dev', //打包后的文件存放的地方
    filename: '[name].bundle.js' //打包后输出文件的文件名
  },
  resolve: {
    modules: ['node_modules'],
    alias: {
      'jquery-ui': 'jquery-ui/ui/widgets',
      'jquery-ui-css': 'jquery-ui/../../themes/base',
      'jquery-datetimepicker-css': 'jquery-datetimepicker/jquery.datetimepicker.css',
      'kindeditor-css': 'kindeditor/themes/default'
    }
  },
  module: {
    noParse: function (content) {
      return /kindeditor/.test(content);
    },
    loaders: [{
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader', //在webpack的module部分的loaders里进行配置即可
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!autoprefixer-loader' //添加对样式表的处理
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!autoprefixer-loader!less-loader' //添加对样式表的处理
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader?limit=8192'
    },{
      test: /\.html$/,
      loader: 'html-loader'
    }]
  },
  devServer: {
    contentBase:  './dev'
  },
  plugins: [
    new CleanWebpackPlugin(['dev']),
    new webpack.BannerPlugin('Copyright By LZhong.'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: false,
      title: '一键上传淘宝',
      chunks: ['main']
    })
  ]
};