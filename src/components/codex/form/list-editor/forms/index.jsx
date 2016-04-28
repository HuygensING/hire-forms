import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import debounce from 'lodash.debounce';
import xhr from 'xhr';

import BusyIcon from './busy-icon';

import { keyValueMap } from 'hire-forms-prop-types';


import PersonForm from './person';
import TextForm from './text';


const fetch = (url, done) => {
	const options = {
		headers: {
			Accept: 'application/json',
		},
		url,
	};

	xhr(options, done);
};

const save = (url, data, done) => {
	if (data.hasOwnProperty('authors')) {
		const authors = R.map((author) => {
			author = R.dissoc('key', author);
			author = R.dissoc('value', author);

			return author;
		}, data.authors);

		data = R.set(R.lensProp('authors'), authors, data);
	}

	const options = {
		body: JSON.stringify(data),
		headers: {
			Accept: 'application/json',
			Authorization: localStorage.getItem('hi-marschol2-auth-token'),
			'Content-type': 'application/json',
		},
		method: 'PUT',
		url,
	};

	xhr(options, done);
};


// import personsActions from '../../../actions/persons';

// import {FORM} from '../../../constants';

// PersonForm does not use the HireFormsForm mixin. It probably should.
// The handleUpdate should be a prop.
class Form extends Component {
	constructor(props) {
		super(props);

		this.state = {
			busy: false,
			model: {},
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value == null || nextProps.value.key === '') {
			return;
		}

		fetch(nextProps.value.key, (err, response, body) => {
			const model = JSON.parse(body);

			if (model.hasOwnProperty('authors')) {
				model.authors = model.authors.map((author) => {
					const eqFunc = (person) => {
						// Last part of the url, representing the path
						// ie: `/persons/PER001`
						const path = person.key.substr(-1 * author['^person'].length);

						return path === author['^person'];
					};

					const nextAuthor = R.find(eqFunc, this.props.persons);
					nextAuthor['^person'] = author['^person'];

					return nextAuthor;
				});
			}

			this.setState({ model });
		});
	}


	handleChange(attr, value) {
		const nextModel = { ...this.state.model, ...{
			[attr]: value,
		} };

		this.setState({ model: nextModel });
	}

	handleUpdate() {
		if (this.state.busy) {
			return;
		}

		this.setState({ busy: true });

		const done = () => {
			const type = this.props.type.charAt(0).toUpperCase() + this.props.type.substr(1);
			this.props[`update${type}`](this.state.model);

			this.setState({ busy: false });
		};

		save(this.props.value.key, this.state.model, debounce(done, 600));
	}

	render() {
		if (!this.state.model.hasOwnProperty('pid')) {
			return null;
		}

		let busyIcon = this.state.busy ?
			<BusyIcon /> :
			null;

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
				<button onClick={this.handleUpdate.bind(this)}>
					Update {busyIcon}
				</button>
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
