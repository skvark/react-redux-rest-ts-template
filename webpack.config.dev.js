const merge = require("webpack-merge");
const common = require("./webpack.config.common.js");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = (env) =>
  merge(common(env), {
    mode: "development",
    devtool: "inline-source-map",

    devServer: {
      contentBase: "./dist",
      hot: true,
      open: true,
      compress: true,
      port: 3000,
      publicPath: "/",
    },

    plugins: [new ReactRefreshWebpackPlugin()],
  });
