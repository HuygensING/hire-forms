import React from 'react';
import SelectCombo from 'hire-forms-select-combo';

const pluck = (prop) => (obj) => obj[prop];
const unique = (value, index, array) => array.indexOf(value) === index;

class Locality extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			places: this.getPlaces(this.props.values.region),
			scriptoria: this.getScriptoria(this.props.values.place),
			unknownLocality: false,
		};
	}


	componentWillReceiveProps(nextProps) {
		const nextState = {};

		if (this.props.localities !== nextProps.localities) {
			if (nextProps.values.id === '') {
				const locality = this.findLocality(nextProps.values, nextProps.localities);
				this.props.onChange(locality);
				nextState.unknownLocality = false;
			}
		}

		if (this.props.values.id !== nextProps.values.id) {
			nextState.places = this.getPlaces(nextProps.values.region);
			nextState.scriptoria = this.getScriptoria(nextProps.values.place);
		}

		this.setState(nextState);
	}

	getPlaces(region) {
		return this.props.localities
			.filter((locality) => locality.region === region)
			.map(pluck('place'))
			.filter(unique)
			.sort();
	}

	getScriptoria(place) {
		return this.props.localities
			.filter((locality) => locality.place === place)
			.map(pluck('scriptorium'))
			.filter(unique)
			.sort();
	}

	findLocality(values, localities = this.props.localities) {
		return localities.find((loc) =>
			loc.region === values.region &&
			loc.place === values.place &&
			loc.scriptorium === values.scriptorium
		);
	}

	handleChange(prop, value) {
		const values = {};
		const nextState = {};

		if (prop === 'region') {
			values.place = '(empty)';
			values.scriptorium = '(empty)';
			nextState.places = this.getPlaces(value);
		}

		if (prop === 'place') {
			values.scriptorium = '(empty)';
			nextState.scriptoria = this.getScriptoria(value);
		}


		const nextValues = {
			...this.props.values,
			...{ [prop]: value },
			...values,
		};

		const locality = this.findLocality(nextValues);
		nextState.unknownLocality = (locality == null);
		nextValues.id = (locality == null) ? '' : locality.id;

		this.setState(nextState);
		this.props.onChange(nextValues);
	}

	saveLocality = () => this.props.saveLocality({ ...this.props.values })

	render() {
		const addButton = this.state.unknownLocality ?
			<button onClick={this.saveLocality}>
				Add new locality
			</button> :
			null;

		return (
			<div className="hire-locality">
				<SelectCombo
					inputPlaceholder="Add new region"
					onChange={this.handleChange.bind(this, 'region')}
					options={this.props.localities.map(pluck('region')).filter(unique)}
					placeholder="Region"
					value={this.props.values.region}
				/>
				<SelectCombo
					inputPlaceholder="Add new place"
					onChange={this.handleChange.bind(this, 'place')}
					options={this.state.places}
					placeholder="Place"
					value={this.props.values.place}
				/>
				<SelectCombo
					inputPlaceholder="Add new scriptorium"
					onChange={this.handleChange.bind(this, 'scriptorium')}
					options={this.state.scriptoria}
					placeholder="Scriptorium"
					value={this.props.values.scriptorium}
				/>
				{addButton}
			</div>
		);
	}
}

Locality.propTypes = {
	localities: React.PropTypes.array,
	onChange: React.PropTypes.func.isRequired,
	options: React.PropTypes.object,
	saveLocality: React.PropTypes.func,
	values: React.PropTypes.object,
};

module.exports = Locality;
