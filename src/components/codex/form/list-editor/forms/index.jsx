import React from "react";
import R from "ramda";
import Immutable from "immutable";
import debounce from "lodash.debounce";
import xhr from "xhr";

import BusyIcon from "./busy-icon";

import {keyValueMap} from "hire-forms-prop-types";


import PersonForm from "./person";
import TextForm from "./text";


let fetch = (url, done) => {
	let options = {
		headers: {
			"Accept": "application/json"
		},
		url: url
	}

	xhr(options, done);
}

let save = (url, data, done) => {
	let data2;

	if (data.hasOwnProperty("authors")) {
		let authors = R.map((author) => {
			author = R.dissoc("key", author);
			author = R.dissoc("value", author);

			return author;
		}, data.authors);

		data = R.set(R.lensProp("authors"), authors, data);
	}

	let options = {
		body: JSON.stringify(data),
		headers: {
			Accept: "application/json",
			Authorization: localStorage.getItem("hi-marschol2-auth-token"),
			"Content-type": "application/json"
		},
		method: "PUT",
		url: url
	}

	xhr(options, done);
}


// import personsActions from "../../../actions/persons";

// import {FORM} from "../../../constants";

// PersonForm does not use the HireFormsForm mixin. It probably should.
// The handleUpdate should be a prop.
class Form extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			busy: false,
			model: {}
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value == null || nextProps.value.key === "") {
			return;
		}

		fetch(nextProps.value.key, (err, response, body) => {
			body = JSON.parse(body);

			if (body.hasOwnProperty("authors")) {
				body.authors = body.authors.map((author) => {
					let eqFunc = (person) => {
						// Last part of the url, representing the path
						// ie: `/persons/PER001`
						let path = person.key.substr(-1 * author["^person"].length);

						return path === author["^person"];
					}

					let nextAuthor = R.find(eqFunc, this.props.persons);
					nextAuthor["^person"] = author["^person"];

					return nextAuthor;
				});
			}

			this.setState({model: body});
		});
	}


	handleChange(attr, value) {
		let nextModel = {...this.state.model, ...{
			[attr]: value
		}};

		this.setState({model: nextModel});
	}

	handleUpdate() {
		if (this.state.busy) {
			return;
		}

		this.setState({busy: true});

		let done = (err, response, body) => {
			this.props.onUpdatePerson(this.state.model);

			this.setState({busy: false});
		};

		save(this.props.value.key, this.state.model, debounce(done, 600));
	}

	render() {
		if (!this.state.model.hasOwnProperty("pid")) {
			return null;
		}

		let busyIcon = this.state.busy ?
			<BusyIcon /> :
			null;

		let form = this.props.type === "person" ?
			 <PersonForm
			 	model={this.state.model}
			 	onChange={this.handleChange.bind(this)} /> :
			 <TextForm
			 	{...this.props}
			 	model={this.state.model}
			 	onChange={this.handleChange.bind(this)} />;

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
	value: keyValueMap
}

export default Form;