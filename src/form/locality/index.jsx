import React from "react";
import Immutable from "immutable";

import Form from "../base";

import Input from "../../components/input";
import Checkbox from "../../components/checkbox";
import Textarea from "../../components/textarea";
import Locality from "../../custom-components/locality";

import {FORM} from "../../constants";

//TMP
let localityHierarchy = {"regions": [{"name": "Northern France", "places": [{"name": "Ferrières", "scriptoria": []}, {"name": "Chartres", "scriptoria": []}, {"name": "Fleury", "scriptoria": [{"name": "St. Benedict"}]}, {"name": "Auxerre", "scriptoria": [{"name": "St. Germain"}]}, {"name": "Laon", "scriptoria": []}, {"name": "Arras", "scriptoria": [{"name": "St. Vaast"}]}, {"name": "St. Denis", "scriptoria": []}, {"name": "Sens", "scriptoria": []}, {"name": "Orléans", "scriptoria": [{"name": "Saint-Mesmin de Micy"}]}, {"name": "Gent", "scriptoria": [{"name": "St. Peter"}]}, {"name": "Paris", "scriptoria": [{"name": "St. Denis"}, {"name": "Saint-Germain-des-Prés"}]}, {"name": "St. Amand", "scriptoria": []}, {"name": "Reims", "scriptoria": [{"name": "St. Remigius"}]}, {"name": "Corbie", "scriptoria": [{"name": "St. Peter"}]}, {"name": "Tours", "scriptoria": [{"name": "St. Martin"}]}, {"name": "Amiens", "scriptoria": []}, {"name": "Angers", "scriptoria": [{"name": "St. Maurice cathedral"}]}]}, {"name": "Bavaria", "places": [{"name": "Salzburg", "scriptoria": []}, {"name": "Prüll", "scriptoria": []}, {"name": "Weihenstephan", "scriptoria": []}, {"name": "Passau", "scriptoria": [{"name": "St. Nikola"}]}, {"name": "Oberaltaich", "scriptoria": []}, {"name": "Chiemsee", "scriptoria": []}, {"name": "Freising", "scriptoria": [{"name": "Dombibliothek"}]}, {"name": "Eichstätt", "scriptoria": []}, {"name": "Tegernsee", "scriptoria": [{"name": "St. Quirinus"}]}, {"name": "Benediktbeuern", "scriptoria": []}, {"name": "Bodensee", "scriptoria": []}, {"name": "Regensburg", "scriptoria": [{"name": "St. Emmeram"}, {"name": "St. Emmeram"}]}]}, {"name": "Northern Italy", "places": [{"name": "Verona", "scriptoria": []}]}, {"name": "Germany", "places": [{"name": "Reichenau", "scriptoria": []}, {"name": "Murbach", "scriptoria": []}, {"name": "Augsburg", "scriptoria": [{"name": "Dombibliothek"}]}, {"name": "Würzburg", "scriptoria": []}, {"name": "Echternach", "scriptoria": []}, {"name": "Merseburg", "scriptoria": []}, {"name": "Eberbach", "scriptoria": []}, {"name": "Mainz", "scriptoria": []}, {"name": "Fulda", "scriptoria": []}, {"name": "Aachen", "scriptoria": []}, {"name": "St. Gallen", "scriptoria": []}, {"name": "Höningen bei Altleiningen", "scriptoria": []}, {"name": "Regensburg", "scriptoria": []}, {"name": "Lorsch", "scriptoria": []}, {"name": "Rohr", "scriptoria": []}, {"name": "Ulm", "scriptoria": []}]}, {"name": "France", "places": [{"name": "Auxerre", "scriptoria": []}]}, {"name": "Southern France", "places": [{"name": "Angoulême", "scriptoria": []}, {"name": "Limoges", "scriptoria": [{"name": "St. Martial"}]}, {"name": "Poitiers", "scriptoria": []}, {"name": "Moissac", "scriptoria": [{"name": "St. Peter"}]}]}, {"name": "England", "places": []}]};
let regions = [];
let places = [];
let scriptoria = [];

localityHierarchy.regions.forEach((region) => {
	regions.push(region.name);

	region.places.forEach((place) => {
		places.push(place.name);

		place.scriptoria.forEach((scriptorium) => {
			scriptoria.push(scriptorium.name);
		});
	});
});

let localityMap = new Immutable.Map({
	tree: localityHierarchy,
	regions: new Immutable.List(regions),
	places: new Immutable.List(places),
	scriptoria: new Immutable.List(scriptoria)
});
//TMP

class LocalityForm extends Form {
	render() {
		let model = this.props.value;

		return (
			<ul className={FORM}>
				<li>
					<label>Date</label>
					<Input
						onChange={this.handleChange.bind(this, "date")}
						value={model.get("date")} />
				</li>
				<li>
					<label>Date source</label>
					<Input
						onChange={this.handleChange.bind(this, "date_source")}
						value={model.get("date_source")} />
				</li>
				<li>
					<label>Locality</label>
					<Locality
						onChange={this.handleChange.bind(this, "locality")}
						options={localityMap}
						values={model.get("locality")} />
				</li>
				<li>
					<label>Remarks</label>
					<Textarea
						onChange={this.handleChange.bind(this, "remarks")}
						value={model.get("remarks")} />
				</li>
				<li>
					<label>Certain</label>
					<Checkbox
						onChange={this.handleChange.bind(this, "certain")}
						value={model.get("certain")} />
				</li>
			</ul>
		);
	}
}

LocalityForm.propTypes = {
	value: React.PropTypes.instanceOf(Immutable.Map)
};

export default LocalityForm;