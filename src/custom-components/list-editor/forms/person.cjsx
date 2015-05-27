React = require 'react'

Form = require "../../../form/base"
Input = require "../../../components/input"

personsActions = require "../../../actions/persons"

{FORM} = require "../../../constants"

class PersonForm extends Form
	
	constructor: (props) ->
		super props

		@state =
			model: @props.value

	componentWillReceiveProps: (nextProps) ->
		@setState
			model: nextProps.value

	render: ->
		<ul className={FORM}>
			<li>
				<label>Name</label>
				<Input
					value={@state.model.get("name")}
					onChange={@_handleChange.bind(@, "name")} />
			</li>
			<li>
				<label>Actvity date</label>
				<Input
					value={@state.model.get("activityDate")}
					onChange={@_handleChange.bind(@, "activityDate")} />
			</li>
			<li>
				<label>Birthdate</label>
				<Input
					value={@state.model.get("birthDate")}
					onChange={@_handleChange.bind(@, "birthDate")} />
			</li>
			<li>
				<label>Deathdate</label>
				<Input
					value={@state.model.get("deathDate")}
					onChange={@_handleChange.bind(@, "deathDate")} />
			</li>
			<li>
				<button onClick={@_handleUpdate}>Update</button>
			</li>
		</ul>

	_handleChange: (attr, value, ev) =>
		@setState
			model: @state.model.set attr, value

	_handleUpdate: =>
		personsActions.updatePerson @state.model

module.exports = PersonForm