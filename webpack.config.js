const path              = require('path');
const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  disable: false
});

const plugins = [
  extractSass
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: { warnings: false }
    })
  );
}

const devtool = process.env.NODE_ENV === 'production'
  ? 'source-map'
  : 'eval-source-map';

module.exports = {
  entry: './src/index.js',
  devtool,
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [ 'babel-preset-env' ]
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot|jpg|png|svg)$/,
        use: [ 'file-loader' ]
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader', options: { minimize: process.env.NODE_ENV === 'production' }
            },
            { loader: 'sass-loader' }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins,
  resolve: {
    extensions: [ '.js', '.json' ],
    modules: [ 'node_modules', path.resolve(__dirname, 'src') ]
  }
};
