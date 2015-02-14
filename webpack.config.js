var webpack = require('webpack');

module.exports = {
	entry: [
		"./src/index.cjsx",
		'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8081'
    ],
	output: {
		path: __dirname + "/assets",
		filename: "main.js",
		publicPath: "/assets/"
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
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
		extensions: ['', '.js', '.json', '.coffee', '.cjsx', '.styl', '.css']
	}
}