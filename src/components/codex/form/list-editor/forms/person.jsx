import React from "react";
import Immutable from "immutable";

import Input from "hire-forms-input";

// import personsActions from "../../../actions/persons";

// import {FORM} from "../../../constants";

// PersonForm does not use the HireFormsForm mixin. It probably should.
// The handleUpdate should be a prop.
let PersonForm = React.createClass({
	propTypes: {
		value: React.PropTypes.object
	},

	getInitialState() {
		return {
			model: this.props.value || {}
		};
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.value == null) {
			return;
		}

		this.setState({model: nextProps.value});
	},


	handleChange(attr, value) {
		this.setState({model: this.state.model.set(attr, value)});
	},

	// handleUpdate() {
	// 	personsActions.updatePerson(this.state.model);
	// },

	render() {
		if (!this.state.model.hasOwnProperty("pid")) {
			return null;
		}

		return (
			<ul className="persons-form">
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
});

export default PersonForm;