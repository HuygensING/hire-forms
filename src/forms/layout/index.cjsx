React = require 'react'
Immutable = require "immutable"

Form = require "../base"

Input = require "../../components/input"
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
					onChange={@_handleElementChange.bind(@, "textWidthMin")} />
				<span>-</span>
				<Input
					placeholder="max"
					value={model.get("textWidthMax")}
					onChange={@_handleElementChange.bind(@, "textWidthMax")} />
			</li>
			<li>
				<label>
					Textblock height
				</label>
				<Input
					placeholder="min"
					value={model.get("textHeightMin")}
					onChange={@_handleElementChange.bind(@, "textHeightMin")} />
				<span>-</span>
				<Input
					placeholder="max"
					value={model.get("textHeightMax")}
					onChange={@_handleElementChange.bind(@, "textHeightMax")} />
			</li>
			<li>
				<label>Horizontal layout</label>
				<Input
					value={model.get("horizontalLayout")}
					onChange={@_handleElementChange.bind(@, "horizontalLayout")} />
			</li>
			<li>
				<label>Vertical layout</label>
				<Input
					value={model.get("verticalLayout")}
					onChange={@_handleElementChange.bind(@, "verticalLayout")} />
			</li>
			<li>
				<label>Lines</label>
				<Input
					value={model.get("linesMin")}
					onChange={@_handleElementChange.bind(@, "linesMin")} />
				<span>-</span>
				<Input
					value={model.get("linesMax")}
					onChange={@_handleElementChange.bind(@, "linesMax")} />
			</li>
			<li>
				<label>Line height</label>
				<Input
					value={model.get("lineHeight")}
					onChange={@_handleElementChange.bind(@, "lineHeight")} />
				<span>mm (per 10 lines)</span>
			</li>
			<li>
				<label>Number of pages</label>
				<Input
					value={model.get("foliaCount")}
					onChange={@_handleElementChange.bind(@, "foliaCount")} />
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

module.exports = Layout