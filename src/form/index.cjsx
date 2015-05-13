React = require 'react'

codex = require "../stores/codex"

actions = require "../actions/form"

Codex = require "./codex"

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
				<h2>Tab2</h2>
			</Tab>
			<Tab label="Margin">
				<h2>Tab3</h2>
			</Tab>
			<Tab label="Persons">
				<h2>Tab3</h2>
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

module.exports = MarginalScholarshipForm