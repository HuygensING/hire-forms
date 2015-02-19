var webpack = require('webpack');

module.exports = {
	entry: [
		"./__tests__/list.cjsx",
    ],
	output: {
		path: __dirname + "/__tests__",
		filename: "bundle.js",
		library: "Components",
		libraryTarget: "umd"
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
	},
	target: "node",
	plugins: [
		new webpack.DefinePlugin({
			__TEST__: JSON.stringify(JSON.parse(process.env.TEST || 'false'))
		})
	]
}
