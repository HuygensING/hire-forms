React = require 'react/addons'
Router = require 'react-router'
Immutable = require 'immutable'

MutableList = require './components/mutable-list'
List = require './components/list'
ComboList = require './components/combo-list'
Input = require './components/input'
Autocomplete = require './components/autocomplete'
Select = require './components/select'

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
	constructor: (props) ->
		super props

		@state =
			value: ""
			list: new Immutable.List ["zondag", "Maandag", "dinsdag", "woensdag", "Donderdag", "vrijdag", "zaterdag"]

	render: ->
		<div className="showcase">
			<nav className="menu">
				<ol>
					<li>Select</li>
					<li>Autocomplete</li>
					<li>List</li>
					<li>Mutable list</li>
					<li>Combo list</li>
				</ol>
			</nav>
			<div className="elements">
				<h2>Select</h2>
				<div className="element-type">
					<h3>Default</h3>
					<div className="input-container">
						<Select
							value={@state.value}
							placeholder="Start typing or use the arrow ===>" 
							options={@state.list}
							onChange={@_handleChange} />
					</div>
				</div>

				<h2>Autocomplete</h2>
				<div className="element-type inputs">
					<h3>Default</h3>
					<div className="input-container">
						<Autocomplete
							placeholder="Start typing for instant suggestions..." 
							options={@state.list} />
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
					<List values={@state.list} />
					<h3>Ordered</h3>
					<List values={@state.list} ordered={true} />
					<h3>Editable</h3>
					<List
						values={@state.list}
						editable={true}
						onChange={@_handleChange} />
				</div>

				<h2>Mutable list</h2>
				<div className="element-type lists">
					<h3>Default</h3>
					<MutableList 
						placeholder="Type something to add to the list..."
						values={@state.list}
						onChange={@_handleChange} />
					<h3>Ordered</h3>
					<MutableList
						placeholder="Type something to add to the list..."
						values={@state.list}
						ordered={true}
						onChange={@_handleChange} />
				</div>

				<h2>Combo list</h2>
				<div className="element-type lists">
					<h3>Default</h3>
					<ComboList
						placeholder="Start typing for instant suggestions..." 
						autocompleteOptions={@state.list} />
					<h3>Async</h3>
					<ComboList
						placeholder="Start typing for async suggestions..."
						async={searchLexicons} />
				</div>
			</div>
		</div>

	_handleChange: (value) =>
		if value instanceof Immutable.List
			@setState
				list: value
		else
			@setState
				value: value

module.exports = Showcase


