var webpack = require('webpack');

module.exports = {
	entry: [
		"./src/components/list/index.cjsx",
    ],
	output: {
		path: __dirname + "/test/src",
		filename: "list.js"
	},
	module: {
		loaders: [
			{ 
				test: /\.coffee$/,
				loader: 'coffee-loader' 
			},
			{
				test: /\.cjsx$/,
				loaders: ['coffee', 'cjsx']
			},
			{
				test: /\.styl$/,
				loader: 'style-loader!css-loader!stylus-loader'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.json', '.coffee', '.cjsx', '.styl', '.css']
	}
}
