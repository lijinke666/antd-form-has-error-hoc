const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PORT = 8082

module.exports = env => {
  const mode = process.env.NODE_ENV
  const isDev = mode === 'development'
  const options = {
    mode,
    devtool: isDev && 'source-map',
    entry: path.join(__dirname, '../example/index'),
    output: {
      path: path.join(__dirname, '../example/dist'),
      filename: 'build.js',
      publicPath: isDev ? '' : './example/dist/'
    },
    //模块加载器
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [
                  [
                    'babel-plugin-import',
                    {
                      libraryName: 'antd',
                      libraryDirectory: 'es',
                      style: true
                    },
                    'antd'
                  ]
                ]
              }
            }
          ],
          exclude: '/node_modules/'
        },
        {
          test: /\.less$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            { loader: 'less-loader', options: { javascriptEnabled: true } }
          ]
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            }
          ]
        },
        {
          test: /\.(jpg|jpeg|png|gif|cur|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]' //遇到图片  生成一个images文件夹  名字.后缀的图片
              }
            }
          ]
        },
        {
          test: /\.(eot|ttf|svg|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name][hash:8].[ext]'
              }
            }
          ]
        }
      ]
    },
    //自动补全后缀
    resolve: {
      enforceExtension: false,
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      modules: [path.resolve('src'), path.resolve('.'), 'node_modules']
    },
    devServer: {
      contentBase: path.join(__dirname),
      inline: true,
      port: PORT,
      publicPath: '/dist/',
      historyApiFallback: true,
      stats: {
        color: true,
        errors: true,
        version: true,
        warnings: true,
        progress: true
      }
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          chunksSortMode: 'none'
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      new HtmlWebpackPlugin({
        title: 'antd-form-create-hoc',
        filename: 'index.html',
        template: path.resolve(__dirname, 'index.html')
      })
    ]
  }
  return options
}
