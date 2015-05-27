React = require 'react'
cx = require "classnames"

# FLUX
codex = require "../stores/codex"
persons = require "../stores/persons"
actions = require "../actions/form"
personsActions = require "../actions/persons"

Codex = require "./codex"
MultiForm = require "./multi"
TextUnit = require "./text-unit"
MarginUnit = require "./margin-unit"

ListEditor = require "../custom-components/list-editor"
countries = require "./countries.json"
countries = (country for own code, country of countries)

{Tabs, Tab} = require "../components/tabs"

class MarginalScholarshipForm extends React.Component
	constructor: (props) ->
		super props

		@state = 
			codex: codex.getState()
			persons: persons.getState()

	componentDidMount: ->
		personsActions.getAllPersons()

		codex.listen @_handleStoreChange
		persons.listen @_handleStoreChange
	
	componentWillUnmount: ->
		codex.stopListening @_handleStoreChange
		persons.stopListening @_handleStoreChange

	shouldComponentUpdate: (nextProps, nextState) ->
		codexChange = @state.codex isnt nextState.codex
		personsChange = @state.persons isnt nextState.persons

		codexChange or personsChange

	render: ->
		model = @state.codex
		
		<Tabs>
			<Tab label="Codex">
				<Codex
					model={@state.codex}
					onChange={@_handleChange}
					onDelete={@_handleDelete} />
			</Tab>
			<Tab label="Text">
				<div className="text-unit-form">
					<MultiForm
						attr={"textUnits"}
						value={model.get("textUnits")}
						view = {TextUnit}
						onChange={@_handleChange}
						onDelete={@_handleDelete} />
				</div>
			</Tab>
			<Tab label="Margin">
				<div className="margin-unit-form">
					<MultiForm
						attr={"marginUnits"}
						value={model.get("marginUnits")}
						view = {MarginUnit}
						onChange={@_handleChange}
						onDelete={@_handleDelete} />
				</div>
			</Tab>
			<Tab label="Persons">
				<ListEditor
					value={@state.persons.get("current")}
					values={@state.persons.get("all").toJS()}
					onSelect={@_handleListEditorSelect}
					onSave={@_handleListEditorSave}
					onDelete={@_handleListEditorDelete} />
			</Tab>
			<Tab label="Texts">
				<h2>Tab3</h2>
			</Tab>
		</Tabs>

	_handleChange: (key, value) =>
		actions.set key, value

	_handleDelete: (key) =>
		actions.delete key

	_handleStoreChange: =>
		@setState
			codex: codex.getState()
			persons: persons.getState()

	_handleListEditorSelect: (item) =>
		personsActions.getPerson item.key

	_handleListEditorSave: =>
		console.log arguments

	_handleListEditorDelete: =>
		console.log arguments

module.exports = MarginalScholarshipForm