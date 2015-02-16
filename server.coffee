webpack = require('webpack')
WebpackDevServer = require('webpack-dev-server')
config = require('./webpack.config.js')

express = require('express')
proxy = require('proxy-middleware')
url = require('url')

sendResponse = (res, response) ->
	res.setHeader 'Content-Type', 'application/json'
	res.end JSON.stringify response

app = express()
app.use '/assets', proxy(url.parse('http://localhost:8081/assets'))

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
