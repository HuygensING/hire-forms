import React from "react";
import {Navigation, State} from "react-router";

// FLUX
import codex from "../stores/codex";
import persons from "../stores/persons";
import texts from "../stores/texts";
import formActions from "../actions/form";
import personsActions from "../actions/persons";
import textsActions from "../actions/texts";

import Codex from "./codex";
import MultiForm from "./multi";
import TextUnit from "./text-unit";
import MarginUnit from "./margin-unit";

import ListEditor from "../custom-components/list-editor";

import {Tabs, Tab} from "../components/tabs";

let MarginalScholarshipForm = React.createClass({
	mixins: [Navigation, State],

	getInitialState() {
		return {
			codex: codex.getState(),
			persons: persons.getState(),
			texts: texts.getState()
		};
	},

	componentDidMount() {
		personsActions.getAllPersons();
		textsActions.getAllTexts();

		codex.listen(this.handleStoreChange);
		persons.listen(this.handleStoreChange);
		texts.listen(this.handleStoreChange);
	},

	componentWillUnmount() {
		codex.stopListening(this.handleStoreChange);
		persons.stopListening(this.handleStoreChange);
		texts.stopListening(this.handleStoreChange);
	},

	handleChange(key, value) {
		formActions.set(key, value);
	},

	handleDelete(key) {
		formActions.delete(key);
	},

	handleStoreChange() {
		this.setState({
			codex: codex.getState(),
			persons: persons.getState(),
			texts: texts.getState()
		});
	},

	handlePersonsEditorSelect(item) {
		personsActions.getPerson(item.key);
	},

	handlePersonsEditorSave() {
		console.log(arguments);
	},

	handlePersonsEditorDelete() {
		console.log(arguments);
	},

	handleTextsEditorSelect(item) {
		textsActions.getText(item.key);
	},

	handleTextsEditorSave() {
		console.log(arguments);
	},

	handleTextsEditorDelete() {
		console.log(arguments);
	},

	/**
	 * @params {string} label - The label on the clicked tab.
	 * @params {number} index - The index of the clicked tab. Zero-based.
	 */
	handleTabChange(label) {
		this.transitionTo(label.toLowerCase());
	},

	render() {
		let model = this.state.codex;

		let activeTab = this.getPathname().substr(6);

		return (
			<Tabs onChange={this.handleTabChange}>
				<Tab
					active={activeTab === "codex"}
					label="Codex">
					<Codex
						model={this.state.codex}
						onChange={this.handleChange}
						onDelete={this.handleDelete} />
				</Tab>
				<Tab
					active={activeTab === "text"}
					label="Text">
					<div className="text-unit-form">
						<MultiForm
							attr={"textUnits"}
							onChange={this.handleChange}
							onDelete={this.handleDelete}
							value={model.get("textUnits")}
							view = {TextUnit} />
					</div>
				</Tab>
				<Tab
					active={activeTab === "margin"}
					label="Margin">
					<div className="margin-unit-form">
						<MultiForm
							attr={"marginUnits"}
							onChange={this.handleChange}
							onDelete={this.handleDelete}
							value={model.get("marginUnits")}
							view = {MarginUnit} />
					</div>
				</Tab>
				<Tab
					active={activeTab === "persons"}
					label="Persons">
					<ListEditor
						onDelete={this.handlePersonsEditorDelete}
						onSave={this.handlePersonsEditorSave}
						onSelect={this.handlePersonsEditorSelect}
						value={this.state.persons.get("current")}
						values={this.state.persons.get("all").toJS()} />
				</Tab>
				<Tab
					active={activeTab === "texts"}
					label="Texts">
					<ListEditor
						onDelete={this.handleTextsEditorDelete}
						onSave={this.handleTextsEditorSave}
						onSelect={this.handleTextsEditorSelect}
						value={this.state.texts.get("current")}
						values={this.state.texts.get("all").toJS()} />
				</Tab>
			</Tabs>
		);
	}
});

export default MarginalScholarshipForm;