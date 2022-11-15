const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

const entryPath = path.resolve(__dirname, '../src/index.js');
const outputPath = path.resolve(__dirname, '../dist');

dotenv.config();

module.exports = {
	entry: entryPath,
	mode: 'production',
	output: {
		path: outputPath,
		filename: 'app[hash].js',
		publicPath: '/',
		assetModuleFilename: 'assets/[hash][ext]',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
			},
			{
				test: /\.html$/,
				use: 'html-loader',
			},
			{
				test: /\.s(a|c)ss|css$/,
				use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			Components: path.resolve(__dirname, '../src/components/'),
			Pages: path.resolve(__dirname, '../src/pages/'),
			Utils: path.resolve(__dirname, '../src/utils/'),
			Scss: path.resolve(__dirname, '../src/scss/'),
			Hoc: path.resolve(__dirname, '../src/hoc/'),
			Hooks: path.resolve(__dirname, '../src/hooks/'),
			Redux: path.resolve(__dirname, '../src/redux/'),
			Constants: path.resolve(__dirname, '../src/constants/'),
		},
	},
	plugins: [
		new HTMLWebpackPlugin({
			inject: true,
			template: './public/index.html',
		}),
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(process.env),
		}),
	],
};
