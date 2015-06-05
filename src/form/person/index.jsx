import React from "react";
import Immutable from "immutable";

import Input from "../../components/input";
import Textarea from "../../components/textarea";
import Checkbox from "../../components/checkbox";
import Select from "../../components/select";

import persons from "../../stores/persons";
import personsActions from "../../actions/persons";

import HireForm from "../base";

import {FORM} from "../../constants";

let PersonForm = React.createClass({
	mixins: [HireForm],

	getInitialState() {
		return {
			persons: persons.getState()
		};
	},

	componentDidMount() {
		personsActions.getAllPersons();

		persons.listen(this.handleStoreChange.bind(this));
	},

	componentWillUnmount() {
		persons.stopListening(this.handleStoreChange.bind(this));
	},

	handleStoreChange() {
		this.setState({persons: persons.getState()});
	},

	render() {
		let model = this.props.value;

		return (
			<ul className={FORM}>
				<li>
					<label>Person</label>
					<Select
						onChange={this.handleChange.bind(this, "person")}
						options={this.state.persons.get("all").toJS()}
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