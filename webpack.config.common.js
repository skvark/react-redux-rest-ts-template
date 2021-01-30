const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');

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

module.exports = (env) => {
  const config = selectConfig(env);

  return {
    entry: {
      main: path.join(__dirname, '/src/index.tsx')
    },

    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      publicPath: '/'
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },

    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          include: path.join(__dirname, 'src'),
          use: 'babel-loader'
        },
        {
          test: /\.(gif|jpg|png)$/,
          loader: 'file-loader'
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'url-loader']
        }
      ]
    },

    plugins: [
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          files: './src/**/*.{ts,tsx,js,jsx}'
        }
      }),
      new ForkTsCheckerNotifierWebpackPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '/src/templates/index.html')
      })
    ],
    externals: {
      config: config
    }
  };
};
