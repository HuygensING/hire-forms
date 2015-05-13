React = require 'react/addons'
Router = require 'react-router'

xhr = require 'xhr'
# if __WEBPACK__?
# 	require './style'

searchLexicons = (query, done) ->
	headers =
		"Content-Type": "application/json"
		"VRE_ID": "e-BNM+"

	xhr
		body: JSON.stringify(term: query)
		url: "https://test.bnm-i.huygens.knaw.nl/api/v2/search/ebnmlexicons"
		method: "POST"
		headers: headers
	,
		(err, resp, body) ->
			location = resp.rawRequest.getResponseHeader("Location")
			
			xhr
				url: location
				headers: headers
			,
				(err, resp, body) ->
					done JSON.parse(body).results.map (result) ->
						result.label

class App extends React.Component
	render: ->
		<div className="app">
			<header>
				<h1>Marginal Scholarship</h1>
			</header>
			
			<Router.RouteHandler />
		</div>

module.exports = App
