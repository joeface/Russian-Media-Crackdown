const path = require("path");

const nodeExternals = require("webpack-node-externals");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');


module.exports = {
  devtool: 'inline-source-map',
  entry: {
    charts: [
      './src/index.js',
      './src/style.scss'
    ]
  },
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }, {
      test: /\.(woff2?|ttf|otf|eot|svg)$/,
      exclude: /node_modules/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      },

    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      exclude: /node_modules/,
      loader: 'file-loader',

    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: false,
          },
        },
        "css-loader",
        "sass-loader"
      ]
    }
    ]
  },
};
