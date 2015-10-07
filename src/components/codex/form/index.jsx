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

import {textUnitModel, marginUnitModel} from "../../../models";

class CodexFormController extends React.Component {
	componentDidMount() {
		this.props.onSetCodex(this.props.params.id);
	}

	shouldComponentUpdate(nextProps, nextState) {
		let codexChanged = this.props.codices.current !== nextProps.codices.current;
		let paramsChanged = this.props.params !== nextProps.params;

		return (codexChanged || paramsChanged);
	}

	handleTabChange(label) {
		let codex = this.props.codices.current;

		this.props.history.pushState(null, `/codex/${codex.pid}/edit/${label.toLowerCase()}`);
	}

	render() {
		let codex = this.props.codices.current;

		let tab = (this.props.params.tab != null) ?
			this.props.params.tab :
			"codex";

		return (
			<div className="codex-form">
				<Tabs onChange={this.handleTabChange.bind(this)}>
					<Tab
						active={tab === "codex"}
						label="Codex">
						<CodexForm
							{...this.props}
							value={codex} />
						<Footer />
					</Tab>
					<Tab
						active={tab === "text"}
						label="Text">
						<div className="text-unit-form">
							<MultiForm
								{...this.props}
								attr={"textUnits"}
								model={textUnitModel}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								values={codex.textUnits}
								component={TextUnit} />
						</div>
						<Footer />
					</Tab>
					<Tab
						active={tab === "margin"}
						label="Margin">
						<div className="margin-unit-form">
							<MultiForm
								{...this.props}
								attr={"marginUnits"}
								model={marginUnitModel}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								onInvalid={this.props.onFormInvalid}
								values={codex.marginUnits}
								component={MarginUnit} />
						</div>
						<Footer />
					</Tab>
					{/*<Tab
						active={tab === "meta"}
						label="Meta">
						<Metadata
							onChange={this.props.onFormChangeKey}
							onDelete={this.props.onFormDeleteKey}
							onInvalid={this.handleInvalid}
							value={codex} />
						<Footer />
					</Tab>*/}
					{/*<Tab
						active={tab === "persons"}
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
						active={tab === "texts"}
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

}

export default CodexFormController;