const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js', '.json' ],
  },
  output: {
    filename: 'zMotion.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html',
			inject: 'body'
    })
  ],
  devServer: {
		historyApiFallback: {
			index: "",
			verbose: true,
			disableDotRule: true
		}
	}
};
