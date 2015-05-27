React = require 'react'
Immutable = require "immutable"

Form = require "../base"

Input = require "../../components/input"
Select = require "../../components/select"
Checkbox = require "../../components/checkbox"
SelectList = require "../../components/select-list"

persons = require "../../stores/persons"
personsActions = require "../../actions/persons"

{FORM} = require "../../constants"

class PersonForm extends Form
	@defaultProps =
		person: new Immutable.List()
		certain: false
		pages: ""
		remarks: ""

	constructor: (props) ->
		super props

		@state = 
			persons: persons.getState()

	componentDidMount: ->
		personsActions.getAllPersons()

		persons.listen @_handleStoreChange
	
	componentWillUnmount: ->
		persons.stopListening @_handleStoreChange

	render: ->
		model = @props.value

		<ul className={FORM}>
			<li>
				<label>Person</label>
				<SelectList
					values={model.get("person").toArray()}
					options={@state.persons.get("all").toArray()}
					onChange={@_handleChange.bind(@, "person")} />
			</li>
			<li>
				<label>Certain</label>
				<Checkbox
					value={model.get("certain")}
					onChange={@_handleChange.bind(@, "certain")} />
			</li>
			<li>
				<label>Folia range</label>
				<Input
					value={model.get("pages")}
					onChange={@_handleChange.bind(@, "pages")} />
			</li>
			<li>
				<label>Remarks</label>
				<Input
					value={model.get("remarks")}
					onChange={@_handleChange.bind(@, "remarks")} />
			</li>
		</ul>

	_handleStoreChange: =>
		@setState
			persons: persons.getState()

module.exports = PersonForm