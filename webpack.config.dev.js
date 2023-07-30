/** @type {import('webpack').Configuration} */

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const mainConfig = {
  mode: 'development',
  entry: {
    main: ['./src/js/core.js', './src/css/main.scss']
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist")
  },
  devServer:{
    static: {
      directory: path.join(__dirname, './dist')
    },
    compress: true,
    port: 9000
  },
  stats: {
    errors: true
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader"
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          process.env.NODE_ENV !== 'production'
          ? "style-loader"
          : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
  ]
}

module.exports = [mainConfig]
