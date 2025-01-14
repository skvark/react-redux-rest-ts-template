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
      chunkFilename: '[chunkhash].chunk.js',
      clean: true
    },
    optimization: {
      minimizer: [
        new TerserJSPlugin({
          parallel: true
        }),
        new CssMinimizerPlugin()
      ]
    },
    runtimeChunk: {
      name: 'runtime'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false // Required as image imports should be handled via JS/TS import statements
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[chunkhash].css',
        chunkFilename: '[chunkhash].css'
      })
    ]
  });
