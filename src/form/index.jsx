import React from "react";
import {Navigation, State} from "react-router";

// FLUX
import codex from "../stores/codex";
import persons from "../stores/persons";
import texts from "../stores/texts";
import codexActions from "../actions/form";
import personsActions from "../actions/persons";
import textsActions from "../actions/texts";

import Codex from "./codex";
import MultiForm from "./multi";
import TextUnit from "./text-unit";
import MarginUnit from "./margin-unit";
import Footer from "./footer";

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
		codexActions.getCodex(this.getParams().id);
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
		codexActions.setKey(key, value);
	},

	handleDelete(key) {
		codexActions.deleteKey(key);
	},

	handleInvalid(key) {
		console.log(key);
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
		label = label.toLowerCase();
		let id = this.getParams().id;
		let path = `/codex/${id}/edit/${label}`;

		this.transitionTo(path);
	},

	render() {
		let model = this.state.codex;

		let tabName = (this.getParams().hasOwnProperty("tab")) ?
			this.getParams().tab :
			"codex";

		return (
			<Tabs onChange={this.handleTabChange}>
				<Tab
					active={tabName === "codex"}
					label="Codex">
					<Codex
						onChange={this.handleChange}
						onDelete={this.handleDelete}
						onInvalid={this.handleInvalid}
						value={this.state.codex} />
					<Footer />
				</Tab>
				<Tab
					active={tabName === "text"}
					label="Text">
					<div className="text-unit-form">
						<MultiForm
							attr={"textUnits"}
							onChange={this.handleChange}
							onDelete={this.handleDelete}
							onInvalid={this.handleInvalid}
							value={model.get("textUnits")}
							view = {TextUnit} />
					</div>
					<Footer />
				</Tab>
				<Tab
					active={tabName === "margin"}
					label="Margin">
					<div className="margin-unit-form">
						<MultiForm
							attr={"marginUnits"}
							onChange={this.handleChange}
							onDelete={this.handleDelete}
							onInvalid={this.handleInvalid}
							value={model.get("marginUnits")}
							view = {MarginUnit} />
					</div>
					<Footer />
				</Tab>
				<Tab
					active={tabName === "persons"}
					label="Persons">
					<ListEditor
						onDelete={this.handlePersonsEditorDelete}
						onSave={this.handlePersonsEditorSave}
						onSelect={this.handlePersonsEditorSelect}
						type="person"
						value={this.state.persons.get("current")}
						values={this.state.persons.get("all").toJS()} />
				</Tab>
				<Tab
					active={tabName === "texts"}
					label="Texts">
					<ListEditor
						onDelete={this.handleTextsEditorDelete}
						onSave={this.handleTextsEditorSave}
						onSelect={this.handleTextsEditorSelect}
						type="text"
						value={this.state.texts.get("current")}
						values={this.state.texts.get("all").toJS()} />
				</Tab>
			</Tabs>
		);
	}
});

export default MarginalScholarshipForm;