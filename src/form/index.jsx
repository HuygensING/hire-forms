import React from "react";
import cx from "classnames";

// FLUX
import codex from "../stores/codex";
import persons from "../stores/persons";
import actions from "../actions/form";
import personsActions from "../actions/persons";

import Codex from "./codex";
import MultiForm from "./multi";
import TextUnit from "./text-unit";
import MarginUnit from "./margin-unit";

import ListEditor from "../custom-components/list-editor";
import countries from "./countries.json";
countries = (country for own code, country of countries)

import {Tabs, Tab} from "../components/tabs";

class MarginalScholarshipForm extends React.Component
	constructor(props) {
		super(props);

		this.state =
			codex: codex.getState()
			persons: persons.getState()

	componentDidMount() {
		personsActions.getAllPersons()

		codex.listen this.handleStoreChange
		persons.listen this.handleStoreChange

	componentWillUnmount() {
		codex.stopListening this.handleStoreChange
		persons.stopListening this.handleStoreChange

	shouldComponentUpdate: (nextProps, nextState) ->
		codexChange = this.state.codex isnt nextState.codex
		personsChange = this.state.persons isnt nextState.persons

		codexChange or personsChange

	render() {
		model = this.state.codex

		<Tabs>
			<Tab label="Codex">
				<Codex
					model={this.state.codex}
					onChange={this.handleChange}
					onDelete={this.handleDelete} />
			</Tab>
			<Tab label="Text">
				<div className="text-unit-form">
					<MultiForm
						attr={"textUnits"}
						value={model.get("textUnits")}
						view = {TextUnit}
						onChange={this.handleChange}
						onDelete={this.handleDelete} />
				</div>
			</Tab>
			<Tab label="Margin">
				<div className="margin-unit-form">
					<MultiForm
						attr={"marginUnits"}
						value={model.get("marginUnits")}
						view = {MarginUnit}
						onChange={this.handleChange}
						onDelete={this.handleDelete} />
				</div>
			</Tab>
			<Tab label="Persons">
				<ListEditor
					value={this.state.persons.get("current")}
					values={this.state.persons.get("all").toJS()}
					onSelect={this._handleListEditorSelect}
					onSave={this._handleListEditorSave}
					onDelete={this._handleListEditorDelete} />
			</Tab>
			<Tab label="Texts">
				<h2>Tab3</h2>
			</Tab>
		</Tabs>

	handleChange: (key, value) =>
		actions.set key, value

	handleDelete: (key) =>
		actions.delete key

	handleStoreChange() {
		this.setState
			codex: codex.getState()
			persons: persons.getState()

	_handleListEditorSelect: (item) =>
		personsActions.getPerson item.key

	_handleListEditorSave() {
		console.log arguments

	_handleListEditorDelete() {
		console.log arguments

}

export default MarginalScholarshipForm;