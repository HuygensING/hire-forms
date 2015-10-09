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
			places: new Immutable.List(places),
			scriptoria: new Immutable.List(scriptoria)
		});

		let newValues = this.props.values.withMutations((map) =>
			map.set("region", value).set("place", "").set("scriptorium", "")
		);

		this.props.onChange(newValues);
	}

	handlePlaceChange(value) {
		let newValues;

		this.props.options.tree.regions.forEach((region) => {
			region.places.forEach((place) => {
				if (place.name === value) {
					newValues = this.props.values.set("region", region.name);

					let scriptoria = place.scriptoria.map((scriptorium) =>
						scriptorium.name
					);

					this.setState({scriptoria: new Immutable.List(scriptoria)});
				}
			});
		});

		newValues = newValues.set("scriptorium", "");
		this.props.onChange(newValues.set("place", value));
	}

	handleScriptoriumChange(value) {
		this.props.options.tree.regions.forEach((region) => {
			region.places.forEach((place) => {
				place.scriptoria.forEach((scriptorium) => {
					if (scriptorium.name === value) {
						let newValues = this.props.values.withMutations((map) =>
							map.set("region", region.name)
								.set("place", place.name)
								.set("scriptorium", value)
						);

						this.props.onChange(newValues);
					}
				});
			});
		});
	}

	render() {
		let places, scriptoria;

		if (this.state.places.size) {
			places = (
				<Select
					onChange={this.handlePlaceChange.bind(this)}
					options={this.state.places}
					placeholder="Place"
					value={this.props.values.place} />
			);
		}

		if (this.state.scriptoria.size) {
			scriptoria = (
				<Select
					onChange={this.handleScriptoriumChange.bind(this)}
					options={this.state.scriptoria}
					placeholder="Scriptorium"
					value={this.props.values.scriptorium} />
			);
		}

		return (
			<div className="hire-locality">
				<Select
					onChange={this.handleRegionChange.bind(this)}
					options={this.props.options.regions}
					placeholder="Region"
					value={this.props.values.region} />
				{places}
				{scriptoria}
			</div>
		);
	}
}

Locality.defaultProps = {
	options: {},
	values: {}
};

Locality.propTypes = {
	onChange: React.PropTypes.func.isRequired,
	options: React.PropTypes.object,
	values: React.PropTypes.object
};

module.exports = Locality;