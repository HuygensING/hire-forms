React = require 'react'
Immutable = require "immutable"

Form = require "../base"

Input = require "../../components/input"
Select = require "../../components/select"
Checkbox = require "../../components/checkbox"
SelectList = require "../../components/select-list"

{FORM} = require "../../constants"

class Person extends Form
	@defaultProps =
		person: new Immutable.List()
		certain: false
		pages: ""
		remarks: ""

	render: ->
		model = @props.value

		<ul className={FORM}>
			<li>
				<label>Person</label>
				<SelectList
					values={model.get("person")}
					options={new Immutable.List(['abe', 'bac', 'cab'])}
					onChange={@_handleElementChange.bind(@, "person")} />
			</li>
			<li>
				<label>Certain</label>
				<Checkbox
					value={model.get("certain")}
					onChange={@_handleElementChange.bind(@, "certain")} />
			</li>
			<li>
				<label>Folia range</label>
				<Input
					value={model.get("pages")}
					onChange={@_handleElementChange.bind(@, "pages")} />
			</li>
			<li>
				<label>Remarks</label>
				<Input
					value={model.get("remarks")}
					onChange={@_handleElementChange.bind(@, "remarks")} />
			</li>
		</ul>

module.exports = Person