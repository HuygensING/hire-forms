import React from "react";
import Immutable from "immutable";

import Select from "hire-forms-select";

class Locality extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			places: this.props.options.places,
			scriptoria: this.props.options.scriptoria
		};
	}

	handleRegionChange(value) {
		let places, scriptoria;

		this.props.options.tree.regions.forEach((region) => {
			if (region.name === value) {
				let pluckNames = function(prev, next) {
					return prev.concat(next.name);
				};

				let pluckScriptoria = function(prev, next) {
					return prev.concat(next.scriptoria.reduce(pluckNames, []));
				};

				places = region.places.reduce(pluckNames, []);
				scriptoria = region.places.reduce(pluckScriptoria, []);
			}
		});

		this.setState({
			places: places,
			scriptoria: scriptoria
		});

		this.props.onChange({
			region: value,
			place: "",
			scriptorium: ""
		});
	}

	handlePlaceChange(value) {
		let newValues, currentRegion;

		this.props.options.tree.regions.forEach((region) => {
			region.places.forEach((place) => {
				if (place.name === value) {
					currentRegion = region;

					let scriptoria = place.scriptoria.map((scriptorium) =>
						scriptorium.name
					);

					this.setState({scriptoria: scriptoria});
				}
			});
		});

		this.props.onChange({
			region: currentRegion.name,
			place: value,
			scriptorium: ""
		});
	}

	handleScriptoriumChange(value) {
		this.props.options.tree.regions.forEach((region) => {
			region.places.forEach((place) => {
				place.scriptoria.forEach((scriptorium) => {
					if (scriptorium.name === value) {
						this.props.onChange({
							region: region.name,
							place: place.name,
							scriptorium: value
						});
					}
				});
			});
		});
	}

	render() {
		return (
			<div className="hire-locality">
				<Select
					onChange={this.handleRegionChange.bind(this)}
					options={this.props.options.regions}
					placeholder="Region"
					value={this.props.values.region} />
				<Select
					onChange={this.handlePlaceChange.bind(this)}
					options={this.state.places}
					placeholder="Place"
					value={this.props.values.place} />
				<Select
					onChange={this.handleScriptoriumChange.bind(this)}
					options={this.state.scriptoria}
					placeholder="Scriptorium"
					value={this.props.values.scriptorium} />
			</div>
		);
	}
}

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

Locality.defaultProps = {
	options: {
		tree: localityHierarchy,
		regions: regions,
		places: places,
		scriptoria: scriptoria
	},
	values: {}
};

Locality.propTypes = {
	onChange: React.PropTypes.func.isRequired,
	options: React.PropTypes.object,
	values: React.PropTypes.object
};

module.exports = Locality;