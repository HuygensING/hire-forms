React = require 'react'
Immutable = require "immutable"

cx = React.addons.classSet

codex = require "./stores/codex"


Input = require "./components/input"
Select = require "./components/select"
Checkbox = require "./components/checkbox"
Autocomplete = require "./components/autocomplete"
MutableList = require "./components/mutable-list"
Textarea = require "./components/textarea"
MultiSelect = require "./components/multi-select"
Label = require "./components/label"
# Locality = require "./custom-components/locality"

Forms =
	Locality: require "./forms/locality"
	Identifier: require "./forms/identifier"
	Location: require "./forms/location"
	Layout: require "./forms/layout"

MarginUnitForm = require "./margin-unit"
MultiForm = require "./forms/multi"

codexActions = require "./actions/form"

{FORM} = require "./constants"

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
	# <li className="well">
	# 			<label>Private remarks</label>
	# 			<div>
	# 				<Textarea
	# 					value={model.get("userRemarks")}
	# 					onChange={@_handleElementChange.bind(@, "userRemarks")} />
	# 			</div>
	# 		</li>
	render: ->
		model = @state.codex

		<ul className={"edit-codex "+FORM}>
			<li className={cx(well: model.get("locations").size)}>
				<label>Codex</label>
				<MultiForm
					attr={"locations"}
					value={model.get("locations")}
					view = {Forms.Location}
					onChange={@_handleElementChange}
					onDelete={@_handleElementDelete} />
			</li>
			<li className={cx(well: model.get("identifiers").size)}>
				<label>Identifier</label>
				<MultiForm
					attr={"identifiers"}
					value={model.get("identifiers")}
					view = {Forms.Identifier}
					onChange={@_handleElementChange}
					onDelete={@_handleElementDelete} />
			</li>
			<li className="well">
				<label>Examined</label>
				<div>
					<Select
						value={model.get("examined")}
						options={new Immutable.List(["Catalogue only", "Digital only", "In person"])}
						onChange={@_handleElementChange.bind(@, "examined")} />
				</div>
			</li>
			<li className="well">
				<label>Interesting for</label>
				<MultiSelect
					values={model.get("interestingFor")}
					options={new Immutable.List(["Evina", "Irene", "Mariken"])}
					onChange={@_handleElementChange.bind(@, "interestingFor")} />
			</li>
			<li className="well">
				<Label value="Private remarks">
					<Textarea
						value={model.get("userRemarks")}
						onChange={@_handleElementChange.bind(@, "userRemarks")} />
				</Label>
			</li>
			<li className="well">
				<label>Content summary</label>
				<div>
					<Textarea
						value={model.get("contentSummary")}
						onChange={@_handleElementChange.bind(@, "contentSummary")} />
				</div>
			</li>
			<li className="well">
				<label>Marginal activity summary</label>
				<div>
					<Textarea
						value={model.get("marginalsSummary")}
						onChange={@_handleElementChange.bind(@, "marginalsSummary")} />
				</div>
			</li>
			<li>
				<label>Number of pages</label>
				<Input
					value={model.get("folia")}
					onChange={@_handleElementChange.bind(@, "folia")} />
			</li>
			<li className="well small-inputs">
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
			<li className="well">
				<label>Date</label>
				<ul className={FORM}>
					<li>
						<label>Date</label>
						<Input
							value={model.get("date")}
							onChange={@_handleElementChange.bind(@, "date")} />
					</li>
					<li>
						<label>Source</label>
						<Input
							value={model.get("date_source")}
							onChange={@_handleElementChange.bind(@, "date_source")} />
					</li>
				</ul>
			</li>
			<li className="well">
				<label>Origin</label>
				<Forms.Locality
					value={model.get("origin")}
					onChange={@_handleElementChange} />
			</li>
			<li className="well">
				<label>Remarks date & loc</label>
				<div>
					<Textarea
						value={model.get("dateAndLocaleRemarks")}
						onChange={@_handleElementChange.bind(@, "dateAndLocaleRemarks")} />
				</div>
			</li>
			<li className="well small-inputs">
				<label>Page dimensions</label>
				<div>
					<label>
						<span>Width</span>
						<span>x</span>
						<span>height</span>
						<span>=</span>
					</label>
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
			<li className={cx(
					"small-inputs": true
					well: model.get("pageLayouts").size
				)}>
				<label>Layout</label>
				<MultiForm
					attr={"pageLayouts"}
					value={model.get("pageLayouts")}
					view = {Forms.Layout}
					onChange={@_handleElementChange}
					onDelete={@_handleElementDelete} />
			</li>
			<li className="well">
				<label>Layout remarks</label>
				<div>
					<Textarea
						value={model.get("layoutRemarks")}
						onChange={@_handleElementChange.bind(@, "layoutRemarks")} />
				</div>
			</li>
			<li className="well">
				<label>Script</label>
				<ul className={FORM}>
					<li>
						<label>Script</label>
					</li>
					<li>
						<label>Characteristics</label>
						<Input
							value={model.getIn(["script", "characteristics"])}
							onChange={@_handleElementChange.bind(@, ["script", "characteristics"])} />
					</li>
					<li>
						<label>Number of hands</label>
						<Input
							value={model.getIn(["script", "handsCount"])}
							onChange={@_handleElementChange.bind(@, ["script", "handsCount"])} />
					</li>
					<li>
						<label>Range</label>
						<Input
							value={model.getIn(["script", "handsRange"])}
							onChange={@_handleElementChange.bind(@, ["script", "handsRange"])} />
					</li>
					<li>
						<label>Scribes</label>
					</li>
					<li>
						<label>Remarks</label>
						<Input
							value={model.getIn(["script", "scribeRemarks"])}
							onChange={@_handleElementChange.bind(@, ["script", "scribeRemarks"])} />
					</li>
				</ul>
			</li>
			<li className="well">
				<label>Bibliography</label>
				<MutableList
					editable={true}
					values={model.get("bibliography")}
					onChange={@_handleElementChange.bind(@, "bibliography")} />
			</li>
			<li className="well">
				<label>URLs</label>
				<MutableList
					editable={true}
					values={model.get("URLs")}
					onChange={@_handleElementChange.bind(@, "URLs")} />
			</li>
		</ul>

	_handleElementChange: (key, value) =>
		codexActions.set key, value

	_handleElementDelete: (key) =>
		codexActions.delete key

	_handleCodexChange: =>
		@setState
			codex: codex.getState()

module.exports = CodexForm