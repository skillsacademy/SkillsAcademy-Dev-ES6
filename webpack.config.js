var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require('extendify')({ isDeep: true, arrays: 'concat' });
var devConfig = require('./webpack.config.dev');
var prodConfig = require('./webpack.config.prod');
var isDevelopment = process.env.ASPNETCORE_ENVIRONMENT === 'Development';
var extractCSS = new ExtractTextPlugin('site.css');

module.exports = merge({
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, include: /ClientApp/, loader: 'babel-loader' },
      { test: /\.css/, loader: extractCSS.extract(['css']) }
    ]
  },
  entry: {
    main: ['./ClientApp/boot-client.js'],
  },
  output: {
    path: path.join(__dirname, 'wwwroot', 'dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  plugins: [
    extractCSS,
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./wwwroot/dist/vendor-manifest.json')
      })
  ]
}, isDevelopment ? devConfig : prodConfig);
