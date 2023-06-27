const path = require('path')
const { merge } = require('webpack-merge')
const { WatchIgnorePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const baseConfig = require('./webpack.base.config')

const resolveDir = (dir) => path.join(__dirname, `../${dir}`)

const publicPath = '/'

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  cache: {
    type: 'filesystem',
    name: 'dev-cache',
    version: 'development',
  },
  output: {
    path: resolveDir('dist'),
    filename: 'js/[name].js',
    chunkFilename: 'chunk/[name].js',
    publicPath
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath
    },
    compress: true,
    port: 9000,
    host: 'localhost',
    hot: true,
    https: false,
    open: ['/react-webpack-config-demo/'],
    historyApiFallback: {
      rewrites: [{
        from: /./,
        to: publicPath,
      }],
    },
  },
  plugins: [
    new WatchIgnorePlugin(
      {
        paths: [
          /(css|less|s[a|c]ss)\.d\.ts$/
        ]
      }
    ),
    new HtmlWebpackPlugin(
      {
        filename: 'index.html',
        template: resolveDir('public/index.html'),
      }
    ),
    new ReactRefreshPlugin(
      {
        overlay: false,
        exclude: /node_modules/i,
        include: /\.([cm]js|[jt]sx?|flow)$/i
      }
    ),
  ],
})
