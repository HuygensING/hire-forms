React = require 'react/addons'
Immutable = require "immutable"

codex = require "./stores/codex"

Input = require "./components/input"
Autocomplete = require "./components/autocomplete"
MutableList = require "./components/mutable-list"
Textarea = require "./components/textarea"

MarginUnitForm = require "./margin-unit"
MultiForm = require "./multi-form"

formActions = require "./actions/form"

class CodexForm extends React.Component
	constructor: (props) ->
		super props

		@state = 
			codex: codex.getState()

	componentDidMount: ->
		codex.listen @_handleCodexChange
	
	componentWillUnmount: ->
		codex.stopListening @_handleCodexChange

	shouldComponentUpdate: (nextProps, nextState) ->
		@state.codex isnt nextState.codex
	
	render: ->
		model = @state.codex

		<ul>
			<li>
				<label>Codex</label>
			</li>
			<li>
				<label>Identifier</label>
			</li>
			<li>
				<label>Examined</label>
			</li>
			<li>
				<label>Interesting for</label>
			</li>
			<li>
				<label>Private remarks</label>
				<Textarea
					value={model.get("userRemarks")}
					onChange={@_handleElementChange.bind(@, "userRemarks")} />
			</li>
			<li>
				<label>Content summary</label>
				<Textarea
					value={model.get("contentSummary")}
					onChange={@_handleElementChange.bind(@, "contentSummary")} />
			</li>
			<li>
				<label>Marginal activity summary</label>
				<Textarea
					value={model.get("marginalsSummary")}
					onChange={@_handleElementChange.bind(@, "marginalsSummary")} />
			</li>
			<li>
				<label>Number of pages</label>
				<Input
					value={model.get("folia")}
					onChange={@_handleElementChange.bind(@, "folia")} />
			</li>
			<li>
				<label>Quantities marginal activity</label>
				<ul>
					<li>
						<span>Number of pages with marginalia:</span>
						<Input
							value={model.get("firstPagesWithMarginals")}
							onChange={@_handleElementChange.bind(@, "firstPagesWithMarginals")} />
						<span>out of (the first)</span>
						<Input
							value={model.get("firstPagesConsidered")}
							onChange={@_handleElementChange.bind(@, "firstPagesConsidered")} />
						<span>pages</span>
					</li>
					<li>
						<span>Most filled page:</span>
						<Input
							value={model.get("mostFilledPagePctage")}
							onChange={@_handleElementChange.bind(@, "mostFilledPagePctage")} />
						<span>% filled:</span>
						<Input
							value={model.get("mostFilledPageDesignation")}
							onChange={@_handleElementChange.bind(@, "mostFilledPageDesignation")} />
					</li>
					<li>
						<span>Blank pages:</span>
						<Input
							value={model.get("totalBlankPages")}
							onChange={@_handleElementChange.bind(@, "totalBlankPages")} />
					</li>
				</ul>
			</li>
			<li>
				<label>Date</label>
				<Input
					value={model.get("date")}
					onChange={@_handleElementChange.bind(@, "date")} />
			</li>
			<li>
				<label>Date source</label>
				<Input
					value={model.get("date_source")}
					onChange={@_handleElementChange.bind(@, "date_source")} />
			</li>
			<li>
				<label>Origin</label>
				<ul>
					<li>
						<label>Place</label>
					</li>
					<li>
						<label>Remarks</label>
						<Textarea
							value={model.getIn(["origin", "remarks"])}
							onChange={@_handleElementChange.bind(@, ["origin", "remarks"])} />
					</li>
					<li>
						<label>Certain</label>
					</li>
				</ul>
			</li>
			<li>
				<label>Remarks date & loc</label>
				<Textarea
					value={model.get("dateAndLocaleRemarks")}
					onChange={@_handleElementChange.bind(@, "dateAndLocaleRemarks")} />
			</li>
			<li>
				<label>Page dimensions</label>
				<div>
					<span>Width</span>
					<span>x</span>
					<span>height =</span>
					<Input
						value={model.get("pageDimension_height")}
						onChange={@_handleElementChange.bind(@, "pageDimension_height")} />
					<span>mm</span>
					<span>x</span>
					<Input
						value={model.get("pageDimension_width")}
						onChange={@_handleElementChange.bind(@, "pageDimension_width")} />
					<span>mm</span>
				</div>
			</li>
			<li>
				<label>Quire structure</label>
				<Input
					value={model.get("quireStructure")}
					onChange={@_handleElementChange.bind(@, "quireStructure")} />
			</li>
			<li>
				<label>Layout</label>
			</li>
			<li>
				<label>Layout remarks</label>
				<Textarea
					value={model.get("layoutRemarks")}
					onChange={@_handleElementChange.bind(@, "layoutRemarks")} />
			</li>
			<li>
				<label>Script</label>
				<ul>
					<li>
						<label>Script</label>
					</li>
					<li>
						<label>Characteristics</label>
						<Input
							value={model.get(["script", "characteristics"])}
							onChange={@_handleElementChange.bind(@, ["script", "characteristics"])} />
					</li>
					<li>
						<label>Number of hands</label>
						<Input
							value={model.get(["script", "handsCount"])}
							onChange={@_handleElementChange.bind(@, ["script", "handsCount"])} />
					</li>
					<li>
						<label>Range</label>
						<Input
							value={model.get(["script", "handsRange"])}
							onChange={@_handleElementChange.bind(@, ["script", "handsRange"])} />
					</li>
					<li>
						<label>Scribes</label>
					</li>
					<li>
						<label>Remarks</label>
						<Input
							value={model.get(["script", "scribeRemarks"])}
							onChange={@_handleElementChange.bind(@, ["script", "scribeRemarks"])} />
					</li>
				</ul>
			</li>
			<li>
				<label>Bibliography</label>
				<MutableList
					editable={true}
					values={model.get("bibliography")}
					onChange={@_handleElementChange.bind(@, "bibliography")} />
			</li>
			<li>
				<label>URLs</label>
				<MutableList
					editable={true}
					values={model.get("URLs")}
					onChange={@_handleElementChange.bind(@, "URLs")} />
			</li>
		</ul>

	_handleElementChange: (key, value) =>
		formActions.updateCodex key, value

	_handleCodexChange: =>
		@setState
			codex: codex.getState()

module.exports = CodexForm