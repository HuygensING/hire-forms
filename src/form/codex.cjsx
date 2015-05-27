React = require 'react'
Immutable = require "immutable"

cx = require "classnames"

Input = require "../components/input"
Select = require "../components/select"
SelectList = require "../components/select-list"
Checkbox = require "../components/checkbox"
Autocomplete = require "../components/autocomplete"
MutableList = require "../components/mutable-list"
Textarea = require "../components/textarea"
MultiSelect = require "../components/multi-select"
Label = require "../components/label"
# Locality = require "../custom-components/locality"

Forms =
	Locality: require "./locality"
	Identifier: require "./identifier"
	Location: require "./location"
	Layout: require "./layout"
	Person: require "./person"

MultiForm = require "./multi"

{FORM} = require "../constants"

class CodexForm extends React.Component
	@propTypes =
		model: React.PropTypes.instanceOf(Immutable.Map).isRequired
		onChange: React.PropTypes.func.isRequired
		onDelete: React.PropTypes.func.isRequired

	render: ->
		model = @props.model

		<ul className={"codex-form "+FORM}>
			<li className={cx(well: model.get("locations").size)}>
				<label>Codex</label>
				<MultiForm
					attr={"locations"}
					value={model.get("locations")}
					view = {Forms.Location}
					onChange={@_handleChange}
					onDelete={@_handleDelete} />
			</li>
			<li className={cx(well: model.get("identifiers").size)}>
				<label>Identifier</label>
				<MultiForm
					attr={"identifiers"}
					value={model.get("identifiers")}
					view = {Forms.Identifier}
					onChange={@_handleChange}
					onDelete={@_handleDelete} />
			</li>
			<li className="well">
				<label>Examined</label>
				<div>
					<Select
						value={model.get("examined")}
						options={[
							key: "Catalogue only", 
							value: "Catalogue only"
						, 
							key: "Digital only", 
							value: "Digital only"
						, 
							key: "In person"
							value: "In person"
						]}
						onChange={@_handleChange.bind(@, "examined")} />
				</div>
			</li>
			<li className="well">
				<label>Interesting for</label>
				<MultiSelect
					values={model.get("interestingFor").toArray()}
					options={["Evina", "Irene", "Mariken"]}
					onChange={@_handleChange.bind(@, "interestingFor")} />
			</li>
			<li className="well">
				<label>Private remarks</label>
				<div>
					<Textarea
						value={model.get("userRemarks")}
						onChange={@_handleChange.bind(@, "userRemarks")} />
				</div>
			</li>
			<li className="well">
				<label>Content summary</label>
				<div>
					<Textarea
						value={model.get("contentSummary")}
						onChange={@_handleChange.bind(@, "contentSummary")} />
				</div>
			</li>
			<li className="well">
				<label>Marginal activity summary</label>
				<div>
					<Textarea
						value={model.get("marginalsSummary")}
						onChange={@_handleChange.bind(@, "marginalsSummary")} />
				</div>
			</li>
			<li className="well small-inputs">
				<label>Quantities marginal activity</label>
				<ul>
					<li>
						<label>Number of pages</label>
						<Input
							value={model.get("folia")}
							onChange={@_handleChange.bind(@, "folia")} />
					</li>
					<li>
						<label>Pages with marginalia</label>
						<Input
							value={model.get("firstPagesWithMarginals")}
							onChange={@_handleChange.bind(@, "firstPagesWithMarginals")} />
						<span>out of (the first)</span>
						<Input
							value={model.get("firstPagesConsidered")}
							onChange={@_handleChange.bind(@, "firstPagesConsidered")} />
						<span>pages</span>
					</li>
					<li>
						<label>Most filled page</label>
						<Input
							value={model.get("mostFilledPagePctage")}
							onChange={@_handleChange.bind(@, "mostFilledPagePctage")} />
						<span>% filled:</span>
						<Input
							value={model.get("mostFilledPageDesignation")}
							onChange={@_handleChange.bind(@, "mostFilledPageDesignation")} />
					</li>
					<li>
						<label>Blank pages</label>
						<Input
							value={model.get("totalBlankPages")}
							onChange={@_handleChange.bind(@, "totalBlankPages")} />
					</li>
				</ul>
			</li>
			<li className="well">
				<label>Origin</label>
				<Forms.Locality
					attr={"origin"}
					value={model.get("origin")}
					onChange={@_handleChange} />
			</li>
			<li className={cx(well: model.get("provenances").size)}>
				<label>Provenance</label>
				<MultiForm
					attr={"provenances"}
					value={model.get("provenances")}
					view = {Forms.Locality}
					onChange={@_handleChange}
					onDelete={@_handleDelete} />
			</li>
			<li className="well">
				<label>Remarks date & loc</label>
				<div>
					<Textarea
						value={model.get("dateAndLocaleRemarks")}
						onChange={@_handleChange.bind(@, "dateAndLocaleRemarks")} />
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
						onChange={@_handleChange.bind(@, "pageDimension_height")} />
					<span>mm</span>
					<span>x</span>
					<Input
						value={model.get("pageDimension_width")}
						onChange={@_handleChange.bind(@, "pageDimension_width")} />
					<span>mm</span>
				</div>
			</li>
			<li>
				<label>Quire structure</label>
				<Input
					value={model.get("quireStructure")}
					onChange={@_handleChange.bind(@, "quireStructure")} />
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
					onChange={@_handleChange}
					onDelete={@_handleDelete} />
			</li>
			<li className="well">
				<label>Layout remarks</label>
				<div>
					<Textarea
						value={model.get("layoutRemarks")}
						onChange={@_handleChange.bind(@, "layoutRemarks")} />
				</div>
			</li>
			<li className="well">
				<label>Script</label>
				<ul className={FORM}>
					<li>
						<label>Type</label>
						<SelectList
							values={model.getIn(["script", "types"]).toArray()}
							options={["Anglo-Saxon majuscule", "Anglo-Saxon minuscule", "Caroline minuscule", "German minuscule", "Gothic minuscule", "Insular semi-uncial", "Uncialis", "early Caroline minuscule", "pre-Caroline minuscule"]}
							onChange={@_handleChange.bind(@, ["script", "types"])} />
					</li>
					<li>
						<label>Type remarks</label>
						<Textarea
							value={model.getIn(["script", "remarks"])}
							onChange={@_handleChange.bind(@, ["script", "remarks"])} />
					</li>
					<li>
						<label>Characteristics</label>
						<Input
							value={model.getIn(["script", "characteristics"])}
							onChange={@_handleChange.bind(@, ["script", "characteristics"])} />
					</li>
					<li>
						<label>Number of hands</label>
						<Input
							value={model.getIn(["script", "handsCount"])}
							onChange={@_handleChange.bind(@, ["script", "handsCount"])} />
					</li>
					<li>
						<label>Range</label>
						<Input
							value={model.getIn(["script", "handsRange"])}
							onChange={@_handleChange.bind(@, ["script", "handsRange"])} />
					</li>
					<li className={cx(well: model.getIn(["script", "scribes"]).size)}>
						<label>Scribes</label>
						<MultiForm
							attr={["script", "scribes"]}
							value={model.getIn(["script", "scribes"])}
							view = {Forms.Person}
							onChange={@_handleChange}
							onDelete={@_handleDelete} />
					</li>
					<li>
						<label>Remarks</label>
						<Textarea
							value={model.getIn(["script", "scribeRemarks"])}
							onChange={@_handleChange.bind(@, ["script", "scribeRemarks"])} />
					</li>
				</ul>
			</li>
			<li className={cx(well: model.get("annotators").size)}>
				<label>Annotators</label>
				<MultiForm
					attr={"annotators"}
					value={model.get("annotators")}
					view = {Forms.Person}
					onChange={@_handleChange}
					onDelete={@_handleDelete} />
			</li>
			<li className={cx(well: model.get("donors").size)}>
				<label>Donors</label>
				<MultiForm
					attr={"donors"}
					value={model.get("donors")}
					view = {Forms.Person}
					onChange={@_handleChange}
					onDelete={@_handleDelete} />
			</li>
			<li className={cx(well: model.get("patrons").size)}>
				<label>Patrons</label>
				<MultiForm
					attr={"patrons"}
					value={model.get("patrons")}
					view = {Forms.Person}
					onChange={@_handleChange}
					onDelete={@_handleDelete} />
			</li>
			<li className="well">
				<label>Bibliography</label>
				<MutableList
					editable={true}
					values={model.get("bibliographies").toArray()}
					onChange={@_handleChange.bind(@, "bibliographies")} />
			</li>
			<li className="well">
				<label>URLs</label>
				<MutableList
					editable={true}
					values={model.get("URLs").toArray()}
					onChange={@_handleChange.bind(@, "URLs")} />
			</li>
		</ul>

	_handleChange: (key, value) =>
		@props.onChange key, value

	_handleDelete: (key) =>
		@props.onDelete key

module.exports = CodexForm