import React, { Component, PropTypes } from 'react';
import debounce from 'lodash.debounce';
import BusyIcon from './busy-icon';
import { keyValueMap } from 'hire-forms-prop-types';
import PersonForm from './person';
import TextForm from './text';
import { fetch, save } from './actions';
import { personModel, textModel } from './models';
import { fullPersonUrl, textUrl } from 'src/config';

class Form extends Component {
	constructor(props) {
		super(props);

		let model = {};
		if (props.value.key === '') {
			model = props.type === 'person' ? personModel : textModel;
		}

		this.state = {
			busy: false,
			model,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value != null && nextProps.value.key !== '') {
			fetch(nextProps.value.key, this.props.persons, (model) =>
				this.setState({ model })
			);
		} else {
			this.setState({
				model: nextProps.type === 'person' ? personModel : textModel,
			});
		}
	}


	handleChange(attr, value) {
		const nextModel = { ...this.state.model, ...{
			[attr]: value,
		} };

		this.setState({ model: nextModel });
	}

	parseOutgoing() {
		return (this.props.type === 'text') ?
			// Authors are altered before sending to server
			{ ...this.state.model, ...{
				authors: this.state.model.authors.map((author) => ({
					'^person': author.key.split('/').slice(-2).join('/'),
				})),
			} } :
			this.state.model;
	}

	handleUpdate() {
		if (this.state.busy) return;
		this.setState({ busy: true });

		const done = () => {
			const type = this.props.type.charAt(0).toUpperCase() + this.props.type.substr(1);
			this.props[`update${type}`](this.state.model);

			this.setState({ busy: false });
		};

		save(this.props.value.key, this.parseOutgoing(), debounce(done, 600));
	}

	handleSave() {
		if (this.state.busy) return;
		this.setState({ busy: true });
		const done = (model) => {
			const type = this.props.type.charAt(0).toUpperCase() + this.props.type.substr(1);
			this.props[`update${type}`](model);

			this.setState({ busy: false });
		};
		const url = this.props.type === 'person' ? fullPersonUrl : textUrl;
		save(url, this.parseOutgoing(), debounce(done, 600));
	}

	render() {
		let busyIcon = this.state.busy ?
			<BusyIcon /> :
			null;

		const button = this.state.model.hasOwnProperty('pid') ?
			<button onClick={this.handleUpdate.bind(this)}>
				Update {busyIcon}
			</button> :
			<button onClick={this.handleSave.bind(this)}>
				Save {busyIcon}
			</button>;

		let form = this.props.type === 'person' ?
			<PersonForm
				model={this.state.model}
				onChange={this.handleChange.bind(this)}
			/> :
			<TextForm
				{...this.props}
				model={this.state.model}
				onChange={this.handleChange.bind(this)}
			/>;

		return (
			<div className="persons-form">
				{form}
				{button}
			</div>
		);
	}
}

Form.propTypes = {
	persons: PropTypes.array,
	type: PropTypes.string,
	updatePerson: PropTypes.func,
	updateText: PropTypes.func,
	value: keyValueMap,
};

export default Form;
