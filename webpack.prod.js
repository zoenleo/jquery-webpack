const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProvidePlugin = webpack.ProvidePlugin;

module.exports = {
  devtool: 'source-map', //配置生成Source Maps
  entry: {
    index: __dirname + '/src/index.js',
    type: __dirname + '/src/type.js',
    article: __dirname + `/src/article.js`,
    category: __dirname + `/src/category.js`
  }, //已多次提及的唯一入口文件
  output: {
    path: __dirname + '/build', //打包后的文件存放的地方
    filename: '[name].bundle.js?v=[hash]' //打包后输出文件的文件名
  },
  resolve: {
    modules: ['node_modules'],
    alias: {
    }
  },
  module: {
    loaders: [{
      test: require.resolve('zepto'),
      loader: 'exports-loader?window.Zepto!script-loader'
    }, {
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
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }, {
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
  plugins: [
    new CleanWebpackPlugin(['build']),
    new webpack.BannerPlugin('Copyright By LZhong.'),
    new ProvidePlugin({
      $: 'zepto',
      Popper: ['popper.js', 'default']
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/page/index/index.html',
      inject: false,
      title: '爱读吧',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'type.html',
      template: './src/page/type/type.html',
      inject: false,
      title: '爱读吧',
      chunks: ['type']
    }),
    new HtmlWebpackPlugin({
      filename: `article.html`,
      template: `./src/page/article/article.html`,
      inject: false,
      title: '爱读吧',
      chunks: ['article'],
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
    }),
    new HtmlWebpackPlugin({
      filename: `category.html`,
      template: `./src/page/category/category.html`,
      inject: false,
      title: '爱读吧',
      chunks: ['category'],
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
    })
  ]
};