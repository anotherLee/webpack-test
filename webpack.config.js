var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {             //注意这里是exports不是export
  entry: {
    main: './src/script/main.js',
    a: './src/script/a.js'
  },
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: '[name]-[hash]-bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test:/\.css$/,
        use: [
          {loader: 'style-loader' },
          {loader: 'css-loader', options: {importLoaders: 1}},
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('autoprefixer')({ broswers: ['last 5 versions'] }),
                require('cssnano')()
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader'
      },
      {
        test: /\.(jpg|png|gif|svg$)/,
        use: [
          {
            // loader: 'file-loader',
            loader: 'url-loader',
            options: {
              limit: 2000,
              // name: 'images/[name].[ext]',
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      chunks: ['main']

    }),
    new HtmlWebpackPlugin({
      filename: 'a.html',
      template: 'a.html',
      chunks: ['a']

    })
  ]
}