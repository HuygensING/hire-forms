import React from "react";

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

import {Tabs, Tab} from "../components/tabs";

class MarginalScholarshipForm extends React.Component {
	componentDidMount() {
		personsActions.getAllPersons();

		codex.listen(this.handleStoreChange);
		persons.listen(this.handleStoreChange);
	}

	componentWillUnmount() {
		codex.stopListening(this.handleStoreChange);
		persons.stopListening(this.handleStoreChange);
	}

	constructor(props) {
		super(props);

		this.state = {
			codex: codex.getState(),
			persons: persons.getState()
		};
	}

	handleChange(key, value) {
		actions.set(key, value);
	}

	handleDelete(key) {
		actions.delete(key);
	}

	handleStoreChange() {
		this.setState({
			codex: codex.getState(),
			persons: persons.getState()
		});
	}

	handleListEditorSelect(item) {
		personsActions.getPerson(item.key);
	}

	handleListEditorSave() {
		console.log(arguments);
	}

	handleListEditorDelete() {
		console.log(arguments);
	}

	render() {
		let model = this.state.codex;

		return (
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
							onChange={this.handleChange}
							onDelete={this.handleDelete}
							value={model.get("textUnits")}
							view = {TextUnit} />
					</div>
				</Tab>
				<Tab label="Margin">
					<div className="margin-unit-form">
						<MultiForm
							attr={"marginUnits"}
							onChange={this.handleChange}
							onDelete={this.handleDelete}
							value={model.get("marginUnits")}
							view = {MarginUnit} />
					</div>
				</Tab>
				<Tab label="Persons">
					<ListEditor
						onDelete={this.handleListEditorDelete}
						onSave={this.handleListEditorSave}
						onSelect={this.handleListEditorSelect}
						value={this.state.persons.get("current")}
						values={this.state.persons.get("all").toJS()} />
				</Tab>
				<Tab label="Texts">
					<h2>Tab3</h2>
				</Tab>
			</Tabs>
		);
	}
}

export default MarginalScholarshipForm;