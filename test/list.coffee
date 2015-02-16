assert = require "assert"
# List = require "../src/components/list"
webpack = require('webpack')

webpackConfig = 
	entry: [
		"./src/component/list/index.cjsx"
	]
	output:
		path: __dirname + "/test",
		filename: "main.js"
	module:
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
	resolve:
		extensions: ['', '.js', '.json', '.coffee', '.cjsx', '.styl', '.css']

compiler = webpack webpackConfig
compiler.run (err, stats) ->
	# console.log err, stats
	describe "Tester", ->
		describe "Testing 1,2,3", ->
			it "Should be ok!", ->
				assert.equal(-1, -1)
