const path = require('path');
const { ProgressPlugin, DefinePlugin, ProvidePlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')

const resolveDir = (dir) => path.join(__dirname, `../${dir}`)

const isDevelopment = process.env.NODE_ENV === 'development'

const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    sourceMap: true,
    modules: {
      auto: true
    }
  }
}

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    postcssOptions: {
      plugins: [require('autoprefixer')],
    }
  }
}

module.exports = {
  resolve: {
    symlinks: true,
    alias: {
      process: 'process/browser',
      '@': resolveDir('src'),
      '@assets': resolveDir('src/assets'),
      '@components': resolveDir('src/components'),
      '@pages': resolveDir('src/pages'),
      '@hooks': resolveDir('src/hooks'),
      '@utils': resolveDir('src/utils'),
      '@store': resolveDir('src/store'),
      '@api': resolveDir('src/api'),
      '@types': resolveDir('src/types')
    },
    extensions: [
      '.tsx',
      '.ts',
      '.jsx',
      '.js'
    ],
    mainFields: [
      'browser',
      'main:h5',
      'module',
      'main'
    ],
  },
  module: {
    rules: [
      {
        test: /\.(css|less|s[a|c]ss)(\?.*)?$/,
        use: [
          {
            loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          cssLoader,
          postcssLoader
        ]
      },
      {
        test: /\.less$/,
        use: [
          cssLoader,
          postcssLoader,
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          cssLoader,
          postcssLoader,
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.[tj]sx?$/i,
        exclude: [
          /(node_modules|bower_components)/
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    debug: false,
                    useBuiltIns: 'usage', // https://babeljs.io/docs/en/babel-preset-env
                    corejs: 3,
                  },
                ],
                ['@babel/preset-react'],
                ['@babel/preset-typescript'],
              ],
              plugins: [
                isDevelopment && [
                  require.resolve('react-refresh/babel'),
                  {
                    skipEnvCheck: true
                  }
                ],
                [
                  '@babel/plugin-transform-runtime',
                  {
                    corejs: false,
                    helpers: true,
                    regenerator: true,
                  },
                ],
              ].filter(Boolean),
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|bpm|svg|webp)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10240
          }
        },
        generator: {
          filename: 'image/[name].[hash][ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10240
          }
        },
        generator: {
          filename: 'static/fonts/[name].[hash][ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|m4a|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10240
          }
        },
        generator: {
          filename: 'static/media/[name].[hash][ext]'
        }
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      }
    ]
  },
  plugins: [
    new ProgressPlugin(
      {
        percentBy: 'entries',
        profile: false
      }
    ),
    new FriendlyErrorsWebpackPlugin(
      {}
    ),
    new DefinePlugin(
      {
        FOO: process.env.FOO
      }
    ),
    new ProvidePlugin(
      {
        process: 'process/browser'
      }
    ),
  ],
  entry: {
    app: [
      resolveDir('src/app')
    ]
  }
}

