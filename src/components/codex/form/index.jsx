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
		let personsChanged = this.props.persons !== nextProps.persons;
		let textsChanged = this.props.texts !== nextProps.texts;

		return (codexChanged || paramsChanged || personsChanged || textsChanged);
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

		let footer = <Footer {...this.props}/>

		return (
			<div className="codex-form">
				<Tabs onChange={this.handleTabChange.bind(this)}>
					<Tab
						active={tab === "codex"}
						label="Codex">
						<CodexForm
							{...this.props}
							onChange={this.props.onFormChangeKey}
							value={codex} />
						{footer}
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
						{footer}
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
						{footer}
					</Tab>
					<Tab
						active={tab === "meta"}
						label="Meta">
						<Metadata
							onChange={this.props.onFormChangeKey}
							onDelete={this.props.onFormDeleteKey}
							onInvalid={this.props.onFormInvalid}
							formData={codex} />
						{footer}
					</Tab>
					<Tab
						active={tab === "persons"}
						label="Persons">
						<ListEditor
							{...this.props}
							type="person"
							values={this.props.persons} />
					</Tab>
					<Tab
						active={tab === "texts"}
						label="Texts">
						<ListEditor
							{...this.props}
							type="text"
							values={this.props.texts} />
					</Tab>
				</Tabs>
			</div>
		);
	}
}

CodexFormController.defaultProps = {

}

export default CodexFormController;