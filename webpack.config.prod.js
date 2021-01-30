const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common.js');

const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env) =>
  merge(common(env), {
    mode: 'production',
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[chunkhash].bundle.js',
      chunkFilename: '[chunkhash].bundle.js'
    },
    optimization: {
      minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin()]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[chunkhash].css',
        chunkFilename: '[chunkhash].css'
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
      ]
    }
  });
