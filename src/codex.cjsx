React = require 'react/addons'
Immutable = require "immutable"

codex = require "./stores/codex"


Input = require "./components/input"
Select = require "./components/select"
Checkbox = require "./components/checkbox"
Autocomplete = require "./components/autocomplete"
MutableList = require "./components/mutable-list"
Textarea = require "./components/textarea"
MultiSelect = require "./components/multi-select"
Locality = require "./custom-components/locality"

Forms =
	Identifier: require "./forms/identifier"
	Location: require "./forms/location"

MarginUnitForm = require "./margin-unit"
MultiForm = require "./forms/multi"

codexActions = require "./actions/form"

localityHierarchy = {"regions":[{"name":"Northern France","places":[{"name":"Ferrières","scriptoria":[]},{"name":"Chartres","scriptoria":[]},{"name":"Fleury","scriptoria":[{"name":"St. Benedict"}]},{"name":"Auxerre","scriptoria":[{"name":"St. Germain"}]},{"name":"Laon","scriptoria":[]},{"name":"Arras","scriptoria":[{"name":"St. Vaast"}]},{"name":"St. Denis","scriptoria":[]},{"name":"Sens","scriptoria":[]},{"name":"Orléans","scriptoria":[{"name":"Saint-Mesmin de Micy"}]},{"name":"Gent","scriptoria":[{"name":"St. Peter"}]},{"name":"Paris","scriptoria":[{"name":"St. Denis"},{"name":"Saint-Germain-des-Prés"}]},{"name":"St. Amand","scriptoria":[]},{"name":"Reims","scriptoria":[{"name":"St. Remigius"}]},{"name":"Corbie","scriptoria":[{"name":"St. Peter"}]},{"name":"Tours","scriptoria":[{"name":"St. Martin"}]},{"name":"Amiens","scriptoria":[]},{"name":"Angers","scriptoria":[{"name":"St. Maurice cathedral"}]}]},{"name":"Bavaria","places":[{"name":"Salzburg","scriptoria":[]},{"name":"Prüll","scriptoria":[]},{"name":"Weihenstephan","scriptoria":[]},{"name":"Passau","scriptoria":[{"name":"St. Nikola"}]},{"name":"Oberaltaich","scriptoria":[]},{"name":"Chiemsee","scriptoria":[]},{"name":"Freising","scriptoria":[{"name":"Dombibliothek"}]},{"name":"Eichstätt","scriptoria":[]},{"name":"Tegernsee","scriptoria":[{"name":"St. Quirinus"}]},{"name":"Benediktbeuern","scriptoria":[]},{"name":"Bodensee","scriptoria":[]},{"name":"Regensburg","scriptoria":[{"name":"St. Emmeram"},{"name":"St. Emmeram"}]}]},{"name":"Northern Italy","places":[{"name":"Verona","scriptoria":[]}]},{"name":"Germany","places":[{"name":"Reichenau","scriptoria":[]},{"name":"Murbach","scriptoria":[]},{"name":"Augsburg","scriptoria":[{"name":"Dombibliothek"}]},{"name":"Würzburg","scriptoria":[]},{"name":"Echternach","scriptoria":[]},{"name":"Merseburg","scriptoria":[]},{"name":"Eberbach","scriptoria":[]},{"name":"Mainz","scriptoria":[]},{"name":"Fulda","scriptoria":[]},{"name":"Aachen","scriptoria":[]},{"name":"St. Gallen","scriptoria":[]},{"name":"Höningen bei Altleiningen","scriptoria":[]},{"name":"Regensburg","scriptoria":[]},{"name":"Lorsch","scriptoria":[]},{"name":"Rohr","scriptoria":[]},{"name":"Ulm","scriptoria":[]}]},{"name":"France","places":[{"name":"Auxerre","scriptoria":[]}]},{"name":"Southern France","places":[{"name":"Angoulême","scriptoria":[]},{"name":"Limoges","scriptoria":[{"name":"St. Martial"}]},{"name":"Poitiers","scriptoria":[]},{"name":"Moissac","scriptoria":[{"name":"St. Peter"}]}]},{"name":"England","places":[]}]}
regions = []
places = []
scriptoria = []

for region in localityHierarchy.regions
	regions.push region.name

	for place in region.places
		places.push place.name

		for scriptorium in place.scriptoria
			scriptoria.push scriptorium.name

localityMap = new Immutable.Map
	tree: localityHierarchy
	regions: new Immutable.List(regions)
	places: new Immutable.List(places)
	scriptoria: new Immutable.List(scriptoria)

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
				<MultiForm
					attr={"locations"}
					value={model.get("locations")}
					view = {Forms.Location}
					onChange={@_handleElementChange}
					onDelete={@_handleElementDelete} />
			</li>
			<li>
				<label>Identifier</label>
				<MultiForm
					attr={"identifiers"}
					value={model.get("identifiers")}
					view = {Forms.Identifier}
					onChange={@_handleElementChange}
					onDelete={@_handleElementDelete} />
			</li>
			<li>
				<label>Examined</label>
				<Select
					value={model.get("examined")}
					options={new Immutable.List(["Catalogue only", "Digital only", "In person"])}
					onChange={@_handleElementChange.bind(@, "examined")} />
			</li>
			<li>
				<label>Interesting for</label>
				<MultiSelect
					values={model.get("interestingFor")}
					options={new Immutable.List(["Evina", "Irene", "Mariken"])}
					onChange={@_handleElementChange.bind(@, "interestingFor")} />
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
						<label>Locality</label>
						<Locality
							values={model.getIn(["origin", "locality"])}
							options={localityMap}
							onChange={@_handleElementChange.bind(@, ["origin", "locality"])} />
					</li>
					<li>
						<label>Remarks</label>
						<Textarea
							value={model.getIn(["origin", "remarks"])}
							onChange={@_handleElementChange.bind(@, ["origin", "remarks"])} />
					</li>
					<li>
						<label>Certain</label>
						<Checkbox
							value={model.getIn(["origin", "certain"])}
							onChange={@_handleElementChange.bind(@, ["origin", "certain"])} />
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
		codexActions.set key, value

	_handleElementDelete: (key) =>
		codexActions.delete key

	_handleCodexChange: =>
		@setState
			codex: codex.getState()

module.exports = CodexForm