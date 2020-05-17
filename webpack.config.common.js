const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");

const selectConfig = (env) => {
  const configs = require("./config.json");
  let config;
  switch (env) {
    case "LOCAL":
      config = configs.LOCAL;
      break;
    case "DEV":
      config = configs.DEV;
      break;
    case "QA":
      config = configs.QA;
      break;
    case "PROD":
      config = configs.PROD;
      break;
    default:
      config = configs.LOCAL;
  }
  return JSON.stringify(config);
};

module.exports = (env) => {
  const config = selectConfig(env);

  return {
    entry: {
      main: path.join(__dirname, "/src/index.tsx"),
    },

    output: {
      path: path.join(__dirname, "/dist"),
      filename: "[name].bundle.js",
    },

    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },

    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          include: path.join(__dirname, "src"),
          use: "babel-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },

    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new ForkTsCheckerNotifierWebpackPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "/src/templates/index.html"),
      }),
    ],

    externals: {
      config: config,
    },
  };
};
