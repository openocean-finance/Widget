process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
	publicPath: process.env.VUE_APP_RES_URL,
	productionSourceMap: false,
	chainWebpack: config => {
		config.plugins.delete('prefetch');
		config.plugins.delete('preload');
	},
	configureWebpack: { 
		devtool: 'source-map',
		module: {
			rules: [
				{
					test: /\.mjs$/,
					include: /node_modules/,
					type: "javascript/auto"
				},
				{ test: /node_modules[\\/]@noble/, loader: 'babel-loader' },
				{ test: /node_modules[\\/]unstorage/, loader: 'babel-loader' },
				{ test: /node_modules[\\/]@solana/, loader: 'babel-loader' },
				{ test: /node_modules[\\/]superstruct/, loader: 'babel-loader' },
				{ test: /node_modules[\\/]@walletconnect/, loader: 'babel-loader' },
				{ test: /node_modules[\\/]rpc-websockets/, loader: 'babel-loader' },

			]
		}
	},
	css: {
		sourceMap: false
	},
	devServer: {
		// https: true,
		overlay: {
			warnings: true,
			errors: true
		},
	}
}
