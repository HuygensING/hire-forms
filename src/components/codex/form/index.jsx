import React from "react";
import cx from "classnames";
// import {Navigation, State} from "react-router";

// import watchStores from "./watch-stores";

// FLUX
// import codex from "../stores/codex";
// import persons from "../stores/persons";
// import texts from "../stores/texts";
// import codexActions from "../actions/form";
// import personsActions from "../actions/persons";
// import textsActions from "../actions/texts";

import MultiForm from "hire-forms-multi-form";

import CodexForm from "./codex";
import Metadata from "./metadata";
import TextUnit from "./text-unit";
import MarginUnit from "./margin-unit";
import Footer from "./footer";

import ListEditor from "./list-editor";

import {Tabs, Tab} from "hire-tabs";

class CodexFormController extends React.Component {
// let CodexFormController = React.createClass({
// 	mixins: [Navigation, State, watchStores(codex, persons, texts)],

	// componentDidMount() {
	// 	codexActions.getCodex(this.getParams().id);
	// 	personsActions.getAllPersons();
	// 	textsActions.getAllTexts();
	// }

	// handleChange(key, value) {
	// 	codexActions.setKey(key, value);
	// }

	// handleDelete(key) {
	// 	codexActions.deleteKey(key);
	// }

	// handleInvalid(key) {
	// 	console.log(key);
	// }

	// handlePersonsEditorSelect(item) {
	// 	personsActions.getPerson(item.key);
	// }

	// handlePersonsEditorSave() {
	// 	console.log(arguments);
	// }

	// handlePersonsEditorDelete() {
	// 	console.log(arguments);
	// }

	// handleTextsEditorSelect(item) {
	// 	textsActions.getText(item.key);
	// }

	// handleTextsEditorSave() {
	// 	console.log(arguments);
	// }

	// handleTextsEditorDelete() {
	// 	console.log(arguments);
	// }

	/**
	 * @params {string} label - The label on the clicked tab.
	 * @params {number} index - The index of the clicked tab. Zero-based.
	 */
	// handleTabChange(label) {
	// 	label = label.toLowerCase();
	// 	let id = this.getParams().id;
	// 	let path = `/codex/${id}/edit/${label}`;

	// 	this.transitionTo(path);
	// }

	render() {
		let codex = this.props.codices.current;

		return (
			<div className={cx(
					"codex-form",
					{visible: this.props.visible}
				)}>
				<Tabs onChange={this.props.onTabChange}>
					<Tab
						active={this.props.tab === "codex"}
						label="Codex">
						<CodexForm
							{...this.props}
							{/* tab: some-nested-tab-solution-here-please */}
							value={codex} />
						<Footer />
					</Tab>
					{/*<Tab
						active={this.props.router.editCodex.tab === "text"}
						label="Text">
						<div className="text-unit-form">
							<MultiForm
								{...this.props}
								attr={"textUnits"}
								value={codex.textUnits}
								view = {TextUnit} />
						</div>
						<Footer />
					</Tab>
					<Tab
						active={this.props.router.editCodex.tab === "margin"}
						label="Margin">
						<div className="margin-unit-form">
							<MultiForm
								{...this.props}
								attr={"marginUnits"}
								value={codex.marginUnits}
								view = {MarginUnit} />
						</div>
						<Footer />
					</Tab>
					<Tab
						active={this.props.router.editCodex.tab === "meta"}
						label="Meta">
						<Metadata
							onChange={this.props.onFormChangeKey}
							onDelete={this.props.onFormDeleteKey}
							onInvalid={this.handleInvalid}
							value={codex} />
						<Footer />
					</Tab>*/}
					{/*<Tab
						active={this.props.router.editCodex.tab === "persons"}
						label="Persons">
						<ListEditor
							onDelete={this.handlePersonsEditorDelete}
							onSave={this.handlePersonsEditorSave}
							onSelect={this.handlePersonsEditorSelect}
							type="person"
							value={this.state.person}
							values={this.state.allPersons.toJS()} />
					</Tab>
					<Tab
						active={this.props.router.editCodex.tab === "texts"}
						label="Texts">
						<ListEditor
							onDelete={this.handleTextsEditorDelete}
							onSave={this.handleTextsEditorSave}
							onSelect={this.handleTextsEditorSelect}
							type="text"
							value={this.state.text}
							values={this.state.allTexts.toJS()} />
					</Tab>*/}
				</Tabs>
			</div>
		);
	}
}

CodexFormController.defaultProps = {
	tab: "codex"
}

export default CodexFormController;