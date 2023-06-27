const path = require('path')
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConfig = require('./webpack.base.config')

const resolveDir = (dir) => path.join(__dirname, `../${dir}`)

const config = merge(baseConfig, {
  mode: 'production',
  devtool: 'nosources-source-map',
  cache: {
    type: 'filesystem',
    name: 'production-cache',
    version: 'production',
  },
  output: {
    path: resolveDir('dist'),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'chunk/[name].[chunkhash].js',
    publicPath: '/'
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      minSize: 1024 * 100,
      minChunks: 1,
      maxSize: 307200,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      cacheGroups: {
        'default': false,
        vendors: {
          test: /[\\\/]node_modules[\\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          name: 'vendors'
        },
        common: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: 'common'
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    },
    emitOnErrors: true,
    minimizer: [
      new TerserPlugin(
        {
          parallel: true,
          terserOptions: {
            output: {
              comments: false,
              keep_quoted_props: false,
              quote_keys: false,
              beautify: false
            },
            keep_fnames: true,
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: true
            }
          }
        }
      ),
      new CssMinimizerPlugin(
        {
          parallel: true
        }
      )
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(
      {
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/[name].[contenthash].css'
      }
    ),
    new CleanWebpackPlugin(
      {
        dry: false
      }
    ),
    new CopyPlugin(
      {
        patterns: [
          {
            from: resolveDir('public'),
            to: resolveDir('dist'),
            globOptions: {
              ignore: [
                '**/*.html'
              ]
            },
            noErrorOnMissing: true
          }
        ]
      }
    ),
    new HtmlWebpackPlugin(
      {
        filename: 'index.html',
        template: resolveDir('public/index.html'),
        minify: {
          collapseWhitespace: true,
          minifyJS: true,
          html5: true,
          minifyCSS: true,
          removeComments: true,
          removeTagWhitespace: false
        },
      }
    ),
  ],
});

module.exports = config
