const currentTask = process.env.npm_lifecycle_event
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const fse = require('fs-extra')
const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('postcss-calc'),
  require('postcss-hexrgba'),
  require('autoprefixer')
]

class RunAfterCompile {
  apply (compiler) {
    compiler.hooks.done.tap('Copy Images', () => {
      fse.copySync('./app/assets/images', './docs/assets/images')
    })
  }
}

let cssConfig = {
  test: /\.css$/i,
  use: [
      'css-loader?url=false', {
      loader: 'postcss-loader',
      options: { plugins: postCSSPlugins }
    }
  ]
}

let pages = fse.readdirSync('./app').filter(file => {
  return file.endsWith('.html')
}).map(page => {
  return new HTMLWebpackPlugin({
    filename: page,
    template: `./app/${page}`
  })
})

let config = {
  entry: './app/assets/scripts/App.js',
  plugins: pages,
  module: {
    rules: [
      cssConfig,
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-react' ,'@babel/preset-env' ]
          }
        }
      }
    ]
  }
}

if (currentTask == 'dev') {
  cssConfig.use.unshift('style-loader')
  config.output = {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'app')
  }
  config.devServer = {
    before: (app, server) => {
      server._watch('./app/**/*.html')
    },
    contentBase: path.join(__dirname, 'app'),
    hot: true,
    port: 3000,
    host: '0.0.0.0'
  }
  config.mode = 'development'
}

if (currentTask == 'build') {
  cssConfig.use.unshift(MiniCSSExtractPlugin.loader)
  postCSSPlugins.push(require('cssnano'))
  config.output = {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'docs')
  }
  config.mode = 'production',
  config.optimization = { splitChunks: { chunks: 'all' } }
  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCSSExtractPlugin({ filename: 'styles.[chunkhash].css' }),
    new RunAfterCompile()
  )
}

module.exports = config