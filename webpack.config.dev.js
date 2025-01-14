const { merge } = require('webpack-merge');
const common = require('./webpack.config.common.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = env =>
  merge(common(env), {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',

    devServer: {
      static: './dist',
      open: true,
      compress: true,
      port: 3000,
      host: 'localhost',
      hot: true,
      historyApiFallback: true
    },

    module: {
      rules: [
        {
          test: [/\.css$/],
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
          ]
        }
      ]
    },

    plugins: [new ReactRefreshWebpackPlugin()]
  });
