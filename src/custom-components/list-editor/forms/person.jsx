import React from "react";
import Immutable from "immutable";

import Form from "../../../form/base";
import Input from "../../../components/input";

import personsActions from "../../../actions/persons";

import {FORM} from "../../../constants";

let PersonForm = React.createClass({
	componentWillReceiveProps(nextProps) {
		this.setState({model: nextProps.value});
	}

	constructor(props) {
		super(props);

		this.state = {model: this.props.value};
	}

	handleChange(attr, value) {
		this.setState({model: this.state.model.set(attr, value)});
	}

	handleUpdate() {
		personsActions.updatePerson(this.state.model);
	}

	render() {
		if (!this.state.model.has("pid")) {
			return null;
		}

		return (
			<ul className={FORM + " persons-form"}>
				<li>
					<label>Name</label>
					<Input
						onChange={this.handleChange.bind(this, "name")}
						value={this.state.model.get("name")} />
				</li>
				<li>
					<label>Actvity date</label>
					<Input
						onChange={this.handleChange.bind(this, "activityDate")}
						value={this.state.model.get("activityDate")} />
				</li>
				<li>
					<label>Birthdate</label>
					<Input
						onChange={this.handleChange.bind(this, "birthDate")}
						value={this.state.model.get("birthDate")} />
				</li>
				<li>
					<label>Deathdate</label>
					<Input
						onChange={this.handleChange.bind(this, "deathDate")}
						value={this.state.model.get("deathDate")} />
				</li>
				<li>
					<button onClick={this.handleUpdate.bind(this)}>Update</button>
				</li>
			</ul>
		);
	}
}

PersonForm.propTypes = {
	value: React.PropTypes.instanceOf(Immutable.Map)
};

export default PersonForm;