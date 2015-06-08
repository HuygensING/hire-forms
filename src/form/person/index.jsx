import React from "react";
import Immutable from "immutable";

import Input from "../../components/input";
import Textarea from "../../components/textarea";
import Checkbox from "../../components/checkbox";
import Select from "../../components/select";

import persons from "../../stores/persons";
import personsActions from "../../actions/persons";

import HireForm from "../base";
import watchStores from "../watch-stores";

import {FORM} from "../../constants";

let PersonForm = React.createClass({
	mixins: [HireForm, watchStores(persons)],

	componentDidMount() {
		personsActions.getAllPersons();
	},

	render() {
		let model = this.props.value;

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

PersonForm.defaultFormProps = {
	certain: false,
	pages: "",
	person: new Immutable.List(),
	remarks: ""
};

export default PersonForm;