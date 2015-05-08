React = require 'react/addons'
Router = require 'react-router'

MutableList = require './components/mutable-list'
List = require './components/list'
ComboList = require './components/combo-list'
Input = require './components/input'
Autocomplete = require './components/autocomplete'

xhr = require 'xhr'

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
					# key: result._id
					# value: result.label

class Showcase extends React.Component
	render: ->
		<div className="showcase">
			<nav className="menu">
				<ol>
					<li>Autocomplete</li>
					<li>Editable list</li>
					<li>List</li>
					<li>Combo list</li>
				</ol>
			</nav>
			<div className="elements">
				<h2>Autocomplete</h2>
				<div className="element-type inputs">
					<h3>Default</h3>
					<div className="input-container">
						<Autocomplete
							placeholder="Start typing for instant suggestions..." 
							values={["zondag", "Maandag", "dinsdag", "woensdag", "Donderdag", "vrijdag", "zaterdag"]} />
					</div>
					<h3>Async</h3>
					<div className="input-container">
						<Autocomplete
							placeholder="Start typing for async suggestions..."
							async={searchLexicons} />
					</div>
				</div>

				<h2>List</h2>
				<div className="element-type lists">
					<h3>Default</h3>
					<List values={["Marie", "Gijs", "Jaap"]} />
					<h3>Ordered</h3>
					<List values={["Marie", "Gijs", "Jaap"]} ordered={true} />
					<h3>Editable</h3>
					<List values={["Marie", "Gijs", "Jaap"]} editable={true} />
				</div>

				<h2>Mutable list</h2>
				<div className="element-type lists">
					<h3>Default</h3>
					<MutableList 
						placeholder="Type something to add to the list..."
						values={["Marie", "Gijs", "Jaap"]} />
					<h3>Ordered</h3>
					<MutableList
						placeholder="Type something to add to the list..."
						values={["Marie", "Gijs", "Jaap"]} ordered={true} />
				</div>

				<h2>Combo list</h2>
				<div className="element-type lists">
					<h3>Default</h3>
					<ComboList
						placeholder="Start typing for instant suggestions..." 
						autocompleteValues={["zondag", "Maandag", "dinsdag", "woensdag", "Donderdag", "vrijdag", "zaterdag"]} />
					<h3>Async</h3>
					<ComboList
						placeholder="Start typing for async suggestions..."
						async={searchLexicons} />
				</div>
			</div>
		</div>

module.exports = Showcase


