import React from "react";

import Input from "hire-forms-input";
import Textarea from "hire-forms-textarea";
import Checkbox from "hire-forms-checkbox";
import Select from "hire-forms-select";

import persons from "../../stores/persons";
import personsActions from "../../actions/persons";

import person from "../../stores/models/person";

import HireForm from "hire-forms-form";
import watchStores from "../watch-stores";

import {FORM} from "../../constants";

let PersonForm = React.createClass({
	mixins: [HireForm, watchStores(persons)],

	componentDidMount() {
		personsActions.getAllPersons();
	},

	render() {
		let model = person.merge(this.props.value);

		return (
			<ul className={FORM}>
				<li>
					<label>Person</label>
					<Select
						onChange={this.handleChange.bind(this, "person")}
						options={this.state.allPersons.toJS()}
						value={model.get("person").toJS()} />
				</li>
				<li>
					<label>Certain</label>
					<Checkbox
						onChange={this.handleChange.bind(this, "certain")}
						value={model.get("certain")} />
				</li>
				<li>
					<label>Folia range</label>
					<Input
						onChange={this.handleChange.bind(this, "pages")}
						value={model.get("pages")} />
				</li>
				<li>
					<label>Remarks</label>
					<Textarea
						onChange={this.handleChange.bind(this, "remarks")}
						value={model.get("remarks")} />
				</li>
			</ul>
		);
	}
});

export default PersonForm;