const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		port: 8080,
		liveReload: true,
		hot: true,
		open: true,
		historyApiFallback: true,
	},
});
