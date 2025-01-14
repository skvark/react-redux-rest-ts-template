const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const selectConfig = () => {
  const configs = require('./config.json');
  const build = process.env.BUILD;
  let config = configs.LOCAL;
  if (build === 'dev') {
    config = configs.DEV;
  }
  if (build === 'qa') {
    config = configs.QA;
  }
  if (build === 'prod') {
    config = configs.PROD;
  }
  return JSON.stringify(config);
};

module.exports = env => {
  const config = selectConfig(env);

  return {
    entry: path.join(__dirname, '/src/index.tsx'),

    output: {
      publicPath: '/',
      clean: true
    },

    resolve: {
      alias: {
        '#': path.join(__dirname, '/src')
      },
      extensions: ['.ts', '.tsx', '.js', '...']
    },

    target: 'web',

    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          include: path.join(__dirname, '/src'),
          use: 'babel-loader'
        },
        {
          test: /\.(gif|jpg|png)$/,
          type: 'asset/resource'
        },
        {
          test: /\.svg$/i,
          type: 'asset',
          resourceQuery: /url/ // *.svg?url
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: { not: [/url/] }, // *.svg
          use: ['@svgr/webpack']
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '/src/templates/index.html'),
        favicon: path.join(__dirname, '/src/assets/icons/favicon.ico'),
        inject: 'body'
      })
    ],

    externals: {
      config: config
    }
  };
};
