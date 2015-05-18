React = require 'react'
cx = require "classnames"

codex = require "../stores/codex"

actions = require "../actions/form"

Codex = require "./codex"
MultiForm = require "./multi"
TextUnit = require "./text-unit"
MarginUnit = require "./margin-unit"

ListEditor = require "../components/list-editor"
countries = require "./countries.json"
countries = (country for own code, country of countries)

{Tabs, Tab} = require "../components/tabs"

class MarginalScholarshipForm extends React.Component
	constructor: (props) ->
		super props

		@state = 
			codex: codex.getState()

	componentDidMount: ->
		codex.listen @_handleModelChange
	
	componentWillUnmount: ->
		codex.stopListening @_handleModelChange

	shouldComponentUpdate: (nextProps, nextState) ->
		@state.codex isnt nextState.codex

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
					values={countries}
					onChange={@_handleListEditorChange}
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

	_handleModelChange: =>
		@setState
			codex: codex.getState()

	_handleListEditorChange: =>
		console.log arguments

	_handleListEditorDelete: =>
		console.log arguments

module.exports = MarginalScholarshipForm