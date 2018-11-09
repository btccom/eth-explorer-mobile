const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AntdScssThemePlugin = require('antd-scss-theme-plugin');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://m.ethbtc.com:8085',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    'whatwg-fetch',
    './src/index.js'
  ],
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    port: process.env.PORT || 8085,
    host: 'm.ethbtc.com',
    publicPath: '/',
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: {
      '/api/**': {
        target: 'https://explorer-web.api.btc.com/v1/eth/',
        pathRewrite: { '^/api': '' },
        //secure: false,
        logLevel: 'debug',
        changeOrigin: true
      }
    }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'app.[hash].js'
  },
  devtool: 'eval',
  resolve: {
    alias: {
      Trans: path.resolve(__dirname, 'src/components/Trans'),
      utils: path.resolve(__dirname, 'src/utils/index'),
      constants: path.resolve(__dirname, 'src/utils/constants'),
      ajax: path.resolve(__dirname, 'src/utils/ajax'),
      config: path.resolve(__dirname, 'src/utils/config')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
          AntdScssThemePlugin.themify('less-loader')
        ]
      },
      {
        test: /\.scss|css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          'sass-loader?sourceMap',
          AntdScssThemePlugin.themify({
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          })
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                progressive: true
              },
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 4
              },
              pngquant: {
                quality: '75-90',
                speed: 3
              }
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader',
        exclude: /images/
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        APP_VERSION: JSON.stringify(process.env.APP_VERSION),
        APP_COIN_TYPE: JSON.stringify(process.env.APP_COIN_TYPE)
      }
    }),

    new AntdScssThemePlugin('./src/styles/themes/antd-theme.scss'),

    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ hash: false, template: './index.html' }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/)
  ]
};
