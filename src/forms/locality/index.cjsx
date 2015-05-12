React = require 'react'
Immutable = require "immutable"

Form = require "../base"

Checkbox = require "../../components/checkbox"
Textarea = require "../../components/textarea"
Locality = require "../../custom-components/locality"

{FORM} = require "../../constants"

# TMP
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
# /TMP

class LocalityForm extends Form
	@defaultProps =
		type: ""
		identifier: ""

	render: ->
		model = @props.value

		<ul className={FORM}>
			<li>
				<label>Locality</label>
				<Locality
					values={model.get("locality")}
					options={localityMap}
					onChange={@_handleElementChange.bind(@, "locality")} />
			</li>
			<li>
				<label>Remarks</label>
				<Textarea
					value={model.get("remarks")}
					onChange={@_handleElementChange.bind(@, "remarks")} />
			</li>
			<li>
				<label>Certain</label>
				<Checkbox
					value={model.get("certain")}
					onChange={@_handleElementChange.bind(@, "certain")} />
			</li>
		</ul>

module.exports = LocalityForm