import React from "react";
import Immutable from "immutable";

import form from "hire-forms-form";
import Checkbox from "hire-forms-checkbox";
import Input from "hire-forms-input";

import Textarea from "hire-forms-textarea";
import Locality from "./locality";

//TMP (replace with ajax)
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

let localityMap = {
	tree: localityHierarchy,
	regions: regions,
	places: places,
	scriptoria: scriptoria
};
//TMP

let validateDate = function(value) {
	let re = /^\-?\d{1,4}((\/?)\-?\d{1,4})?(~|\?)?$/;
	let valid = re.test(value);

	if (valid) {
		let matches = re.exec(value);

		if (matches && matches[1]) {
			let startYear = matches[0].substr(0, matches[0].indexOf("/"));
			let endYear = matches[1].substr(1);

			valid = parseInt(startYear) < parseInt(endYear);
		}
	}

	return {
		isValid: valid,
		message: "A single year (dddd) or a range of the format `dddd - dddd`."
	}
};

let validateNumbersOnly = function(value) {
	let re = /^\d+$/;
	return {
		isValid: re.test(value),
		message: "Should contain only numbers."
	}
};

class DateAndLocalityForm extends React.Component {
	shouldComponentUpdate(nextProps) {
		return (this.props.formData !== nextProps.formData)
	}

	render() {
		let model = this.props.formData;

		return (
			<ul>
				<li>
					<label>Date</label>
					<Input
						onChange={this.props.handleChange.bind(this, "date")}
						onInvalid={this.props.handleInvalid.bind(this, "date")}
						validate={validateDate}
						value={model.date} />
				</li>
				<li>
					<label>Date source</label>
					<Input
						onChange={this.props.handleChange.bind(this, "dateSource")}
						onInvalid={this.props.handleInvalid.bind(this, "dateSource")}
						validate={validateNumbersOnly}
						value={model.dateSource} />
				</li>
				<li>
					<label>Locality</label>
					<Locality
						onChange={this.props.handleChange.bind(this, "locality")}
						options={localityMap}
						values={model.locality} />
				</li>
				<li>
					<label>Remarks</label>
					<Textarea
						onChange={this.props.handleChange.bind(this, "remarks")}
						value={model.remarks} />
				</li>
				<li>
					<label>Certain</label>
					<Checkbox
						onChange={this.props.handleChange.bind(this, "certain")}
						value={model.certain} />
				</li>
			</ul>
		);
	}
}

export default form(DateAndLocalityForm);