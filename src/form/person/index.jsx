import React from "react";
import Immutable from "immutable";

import Form from "../base";

import Input from "../../components/input";
import Select from "../../components/select";
import Checkbox from "../../components/checkbox";
import SelectList from "../../components/select-list";

import persons from "../../stores/persons";
import personsActions from "../../actions/persons";

import {FORM} from "../../constants";

class PersonForm extends Form {
	this.defaultFormProps =
		person: new Immutable.List()
		certain: false
		pages: ""
		remarks: ""

	constructor(props) {
		super(props);

		this.state =
			persons: persons.getState()

	componentDidMount() {
		personsActions.getAllPersons()

		persons.listen this.handleStoreChange

	componentWillUnmount() {
		persons.stopListening this.handleStoreChange

	render() {
		model = this.props.value

		<ul className={FORM}>
			<li>
				<label>Person</label>
				<SelectList
					values={model.get("person").toArray()}
					options={this.state.persons.get("all").toArray()}
					onChange={this.handleChange.bind(this, "person")} />
			</li>
			<li>
				<label>Certain</label>
				<Checkbox
					value={model.get("certain")}
					onChange={this.handleChange.bind(this, "certain")} />
			</li>
			<li>
				<label>Folia range</label>
				<Input
					value={model.get("pages")}
					onChange={this.handleChange.bind(this, "pages")} />
			</li>
			<li>
				<label>Remarks</label>
				<Input
					value={model.get("remarks")}
					onChange={this.handleChange.bind(this, "remarks")} />
			</li>
		</ul>

	handleStoreChange() {
		this.setState
			persons: persons.getState()

}

export default PersonForm;