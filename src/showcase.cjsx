React = require 'react/addons'
Router = require 'react-router'
Immutable = require 'immutable'

MutableList = require './components/mutable-list'
List = require './components/list'
AutocompleteList = require './components/autocomplete-list'
Input = require './components/input'
Autocomplete = require './components/autocomplete'
Select = require './components/select'
SelectList = require './components/select-list'

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
			values: new Immutable.List()
			options: new Immutable.List ["zondag", "Maandag", "dinsdag", "woensdag", "Donderdag", "vrijdag", "zaterdag"]

	render: ->
		<div className="showcase">
			<nav className="menu">
				<ol>
					<li>Select</li>
					<li>Select list</li>
					<li>Autocomplete</li>
					<li>Autcomplete list</li>
					<li>List</li>
					<li>Mutable list</li>
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
							options={@state.options}
							onChange={@_handleChange} />
					</div>
				</div>

				<h2>Select list</h2>
				<div className="element-type lists">
					<h3>Default</h3>
					<SelectList
						placeholder="Start typing for instant suggestions..."
						values={@state.values}
						options={@state.options}
						onChange={@_handleValuesChange} />
				</div>

				<h2>Autocomplete</h2>
				<div className="element-type inputs">
					<h3>Default</h3>
					<div className="input-container">
						<Autocomplete
							value={@state.value}
							placeholder="Start typing for instant suggestions..." 
							options={@state.options}
							onChange={@_handleValueChange} />
					</div>
					<h3>Async</h3>
					<div className="input-container">
						<Autocomplete
							value={@state.value}
							placeholder="Start typing for async suggestions..."
							async={searchLexicons}
							onChange={@_handleValueChange} />
					</div>
				</div>

				<h2>Autocomplete list</h2>
				<div className="element-type lists">
					<h3>Default</h3>
					<AutocompleteList
						values={@state.values}
						options={@state.options}
						placeholder="Start typing for instant suggestions..." 
						onChange={@_handleValuesChange} />
					<h3>Async</h3>
					<AutocompleteList
						values={@state.values}
						options={@state.options}
						placeholder="Start typing for async suggestions..."
						async={searchLexicons}
						onChange={@_handleValuesChange} />
				</div>

				<h2>List</h2>
				<div className="element-type lists">
					<h3>Default</h3>
					<List values={@state.options} />
					<h3>Ordered</h3>
					<List values={@state.options} ordered={true} />
					<h3>Editable</h3>
					<List
						values={@state.options}
						editable={true}
						onChange={@_handleChange} />
				</div>

				<h2>Mutable list</h2>
				<div className="element-type lists">
					<h3>Default</h3>
					<MutableList 
						placeholder="Type something to add to the list..."
						values={@state.options}
						onChange={@_handleChange} />
					<h3>Ordered</h3>
					<MutableList
						placeholder="Type something to add to the list..."
						values={@state.options}
						ordered={true}
						onChange={@_handleChange} />
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

	_handleValueChange: (value) =>
		@setState
			value: value

	_handleValuesChange: (values) =>
		console.log values
		@setState
			values: values

module.exports = Showcase


