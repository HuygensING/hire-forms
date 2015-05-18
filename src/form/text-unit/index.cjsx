React = require 'react'
Immutable = require "immutable"

Form = require "../base"

Input = require "../../components/input"
SelectList = require "../../components/select-list"

{FORM} = require "../../constants"

class TextUnit extends Form
	@defaultProps =
		titleInCodex: ""
		incipit: ""
		excipit: ""
		pages: ""
		stateOfPreservation: ""
		remarks: ""

	render: ->
		model = @props.value

		<ul className={FORM}>
			<li>
				<label>text</label>
				<SelectList
					values={model.get("text")}
					options={new Immutable.List(['abe', 'bac', 'cab'])}
					onChange={@_handleChange.bind(@, "text")} />
			</li>
			<li>
				<label>Title in codex</label>
				<Input
					value={model.get("titleInCodex")}
					onChange={@_handleChange.bind(@, "titleInCodex")} />
			</li>
			<li>
				<label>Incipit</label>
				<Input
					value={model.get("incipit")}
					onChange={@_handleChange.bind(@, "incipit")} />
			</li>
			<li>
				<label>Excipit</label>
				<Input
					value={model.get("excipit")}
					onChange={@_handleChange.bind(@, "excipit")} />
			</li>
			<li>
				<label>Pages</label>
				<Input
					value={model.get("pages")}
					onChange={@_handleChange.bind(@, "pages")} />
			</li>
			<li>
				<label>State of preservation</label>
				<Input
					value={model.get("stateOfPreservation")}
					onChange={@_handleChange.bind(@, "stateOfPreservation")} />
			</li>
			<li>
				<label>Remarks</label>
				<Input
					value={model.get("remarks")}
					onChange={@_handleChange.bind(@, "remarks")} />
			</li>
		</ul>

module.exports = TextUnit