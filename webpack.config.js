const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const target = process.argv[7];

module.exports = {
  devtool: 'source-map', //配置生成Source Maps
  entry: {
    [target]: __dirname + `/src/${target}.js`
  }, //已多次提及的唯一入口文件
  output: {
    path: __dirname + '/dev', //打包后的文件存放的地方
    filename: '[name].bundle.js' //打包后输出文件的文件名
  },
  resolve: {
    modules: ['node_modules'],
    alias: {
    }
  },
  module: {
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
      include: [
        path.resolve(__dirname, 'not_exist_path')
      ],
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
    },
    { test: /\.css$/, loader: 'style-loader!css-loader' },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
    { test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000" },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },
  devServer: {
    contentBase: __dirname + '/public/',
    inline: true,
    port: 3000
  },
  plugins: [
    new CleanWebpackPlugin(['dev']),
    new webpack.BannerPlugin('Copyright By LZhong.'),
    new webpack.ProvidePlugin({
      $: 'zepto',
      'window.$': 'zepto'
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({
      filename: `${target}.html`,
      template: `./src/${target}.html`,
      inject: false,
      title: '最热小说网',
      chunks: [target]
    })
  ]
};