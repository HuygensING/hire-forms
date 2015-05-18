React = require 'react'
Immutable = require "immutable"

Form = require "../base"

Input = require "../../components/input"
Select = require "../../components/select"

{FORM} = require "../../constants"

class Location extends Form
	@defaultProps =
		institute: ""
		shelfmark: ""
		pages: ""

	render: ->
		model = @props.value

		<ul className={FORM}>
			<li>
				<label>Institute</label>
				<Select
					value={model.get("institute")}
					options={new Immutable.List(['a', 'b', 'c'])}
					onChange={@_handleChange.bind(@, "institute")} />
			</li>
			<li>
				<label>Type</label>
				<Input
					value={model.get("shelfmark")}
					onChange={@_handleChange.bind(@, "shelfmark")} />
			</li>
			<li>
				<label>Identifier</label>
				<Input
					value={model.get("pages")}
					onChange={@_handleChange.bind(@, "pages")} />
			</li>
		</ul>

module.exports = Location