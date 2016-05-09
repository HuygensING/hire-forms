import React from 'react';
import Select from 'hire-forms-select';

const pluck = (prop) => (obj) => obj[prop];
const unique = (value, index, array) => array.indexOf(value) === index;

class Locality extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			places: this.getPlaces(this.props.values.region),
			scriptoria: this.getScriptoria(this.props.values.place),
		};
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

	handleChange(prop, value) {
		const values = {};

		if (prop === 'region') {
			values.place = '';
			values.scriptorium = '';
			this.setState({ places: this.getPlaces(value) });
		}

		if (prop === 'place') {
			values.scriptorium = '';
			this.setState({ scriptoria: this.getScriptoria(value) });
		}

		this.props.onChange({
			...this.props.values,
			...{ [prop]: value },
			...values,
		});
	}

	render() {
		return (
			<div className="hire-locality">
				<Select
					onChange={this.handleChange.bind(this, 'region')}
					options={this.props.localities.map(pluck('region')).filter(unique)}
					placeholder="Region"
					value={this.props.values.region}
				/>
				<Select
					onChange={this.handleChange.bind(this, 'place')}
					options={this.state.places}
					placeholder="Place"
					value={this.props.values.place}
				/>
				<Select
					onChange={this.handleChange.bind(this, 'scriptorium')}
					options={this.state.scriptoria}
					placeholder="Scriptorium"
					value={this.props.values.scriptorium}
				/>
			</div>
		);
	}
}

Locality.propTypes = {
	localities: React.PropTypes.array,
	onChange: React.PropTypes.func.isRequired,
	options: React.PropTypes.object,
	values: React.PropTypes.object,
};

module.exports = Locality;
