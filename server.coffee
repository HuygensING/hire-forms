webpack = require('webpack')
WebpackDevServer = require('webpack-dev-server')
config = require('./webpack.config.js')

# mongo = require 'mongodb'
# MongoClient = mongo.MongoClient
# ObjectID = mongo.ObjectID 

express = require('express')
proxy = require('proxy-middleware')
url = require('url')

# collection = null

sendResponse = (res, response) ->
	res.setHeader 'Content-Type', 'application/json'
	res.end JSON.stringify response

# MongoClient.connect 'mongodb://127.0.0.1:27017/chronovis', (err, db) ->
# 	throw err if err?

# 	collection = db.collection 'abeltasman'
	

app = express()
app.use '/assets', proxy(url.parse('http://localhost:8081/assets'))

# app.get '/api/entries', (req, res) ->
# 	criteria = {}

# 	projection =
# 		'geo': true
# 		'date': true

# 	collection.find(criteria, projection).toArray (err, response) ->
# 		throw err if err?
# 		sendResponse res, response

# app.get '/api/entries/:id', (req, res) ->
# 	id = req.param('id')
# 	criteria =
# 		_id: new ObjectID(id)

# 	projection =
# 		'pages': true

# 	collection.findOne criteria, projection, (err, response) ->
# 		throw err if err?
# 		sendResponse res, response

app.get '/*', (req, res) ->
    res.sendFile(__dirname + '/index.html');


server = new WebpackDevServer webpack(config),
    contentBase: __dirname,
    hot: true,
    quiet: false,
    noInfo: false,
    publicPath: "/assets/",
    stats: { colors: true }

server.listen 8081, "localhost", ->
# app.listen 8080
app.listen 3000, -> console.log 'Listening on 3000'