React = require 'react'
Immutable = require "immutable"

Form = require "../base"

Input = require "../../components/input"
Textarea = require "../../components/textarea"
Select = require "../../components/select"

{FORM} = require "../../constants"

class Layout extends Form
	@defaultProps =
		textWidthMin: ""
		textWidthMax: ""
		textHeightMin: ""
		textHeightMax: ""
		horizontalLayout: ""
		verticalLayout: ""
		linesMin: ""
		linesMax: ""
		lineHeight: ""
		foliaCount: ""
		pages: ""
		remarks: ""

	render: ->
		model = @props.value

		<ul className={FORM}>
			<li>
				<label>
					Textblock width
				</label>
				<Input
					placeholder="min"
					value={model.get("textWidthMin")}
					onChange={@_handleChange.bind(@, "textWidthMin")} />
				<span>-</span>
				<Input
					placeholder="max"
					value={model.get("textWidthMax")}
					onChange={@_handleChange.bind(@, "textWidthMax")} />
			</li>
			<li>
				<label>
					Textblock height
				</label>
				<Input
					placeholder="min"
					value={model.get("textHeightMin")}
					onChange={@_handleChange.bind(@, "textHeightMin")} />
				<span>-</span>
				<Input
					placeholder="max"
					value={model.get("textHeightMax")}
					onChange={@_handleChange.bind(@, "textHeightMax")} />
			</li>
			<li>
				<label>Horizontal layout</label>
				<Input
					value={model.get("horizontalLayout")}
					onChange={@_handleChange.bind(@, "horizontalLayout")} />
			</li>
			<li>
				<label>Vertical layout</label>
				<Input
					value={model.get("verticalLayout")}
					onChange={@_handleChange.bind(@, "verticalLayout")} />
			</li>
			<li>
				<label>Lines</label>
				<Input
					value={model.get("linesMin")}
					onChange={@_handleChange.bind(@, "linesMin")} />
				<span>-</span>
				<Input
					value={model.get("linesMax")}
					onChange={@_handleChange.bind(@, "linesMax")} />
			</li>
			<li>
				<label>Line height</label>
				<Input
					value={model.get("lineHeight")}
					onChange={@_handleChange.bind(@, "lineHeight")} />
				<span>mm (per 10 lines)</span>
			</li>
			<li>
				<label>Number of pages</label>
				<Input
					value={model.get("foliaCount")}
					onChange={@_handleChange.bind(@, "foliaCount")} />
			</li>
			<li>
				<label>Folia range</label>
				<Input
					value={model.get("pages")}
					onChange={@_handleChange.bind(@, "pages")} />
			</li>
			<li>
				<label>Remarks</label>
				<Textarea
					value={model.get("remarks")}
					onChange={@_handleChange.bind(@, "remarks")} />
			</li>
		</ul>

module.exports = Layout