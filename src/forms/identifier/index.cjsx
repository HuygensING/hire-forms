React = require 'react'
Immutable = require "immutable"

Form = require "../base"

Input = require "../../components/input"
Select = require "../../components/select"

class Identifier extends Form
	@defaultProps =
		type: ""
		identifier: ""

	render: ->
		model = @props.value

		<ul>
			<li>
				<label>Type</label>
				<Select
					value={model.get("type")}
					options={new Immutable.List(["(empty)", "Bergmann", "Bischoff", "CLA", "KIH"])}
					onChange={@_handleElementChange.bind(@, "type")} />
			</li>
			<li>
				<label>Identifier</label>
				<Input
					value={model.get("identifier")}
					onChange={@_handleElementChange.bind(@, "identifier")} />
			</li>
		</ul>

module.exports = Identifier