import path from "path"

import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"

module.exports = (/* config: PhenomicConfig */) => ({
  entry: {
    bundle: [
      process.env.NODE_ENV !== "production" &&
        require.resolve("webpack-hot-middleware/client"),
      process.env.NODE_ENV !== "production" &&
        require.resolve("react-hot-loader/patch"),
      "./App.js",
    ].filter(item => item),
  },
  output: {
    publicPath: "/",
    path: path.join(process.cwd(), "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
        options: {
          babelrc: false,
          presets: [require.resolve("babel-preset-phenomic")],
          plugins: [require.resolve("react-hot-loader/babel")],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: require.resolve("style-loader"),
          use: require.resolve("css-loader"),
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "styles.css",
      disable: process.env.NODE_ENV !== "production",
    }),
    process.env.NODE_ENV !== "production" &&
      new webpack.HotModuleReplacementPlugin(),
    process.env.NODE_ENV === "production" &&
      new webpack.optimize.UglifyJsPlugin(),
  ].filter(item => item),

  resolve: {
    alias: {
      // because it's cool
      "react-native": "react-native-web",

      // to ensure a single module is used
      react: path.resolve(path.join(process.cwd(), "node_modules", "react")),
      "react-dom": path.resolve(
        path.join(process.cwd(), "node_modules", "react-dom"),
      ),
      "react-router": path.resolve(
        path.join(process.cwd(), "node_modules", "react-router"),
      ),
    },
  },

  // eslint-disable-next-line max-len
  // https://github.com/facebookincubator/create-react-app/blob/fbdff9d722d6ce669a090138022c4d3536ae95bb/packages/react-scripts/config/webpack.config.prod.js#L279-L285
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
  },
})
