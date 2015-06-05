import React from "react";
import Immutable from "immutable";

import Form from "../base";

import Input from "../../components/input";
import Textarea from "../../components/textarea";
import Select from "../../components/select";

import texts from "../../stores/texts";
import textsActions from "../../actions/texts";

import {FORM} from "../../constants";

let TextUnit = React.createClass({
	getInitialState() {
		return {
			texts: texts.getState()
		};
	},

	componentDidMount() {
		textsActions.getAllTexts();

		texts.listen(this.handleStoreChange.bind(this));
	},

	componentWillUnmount() {
		texts.stopListening(this.handleStoreChange.bind(this));
	},

	handleStoreChange() {
		this.setState({texts: texts.getState()});
	},

	render() {
		let model = this.props.value;

		return (
			<ul className={FORM}>
				<li>
					<label>text</label>
					<Select
						onChange={this.handleChange.bind(this, "text")}
						options={this.state.texts.get("all").toJS()}
						value={model.get("text").toJS()} />
				</li>
				<li>
					<label>Title in codex</label>
					<Input
						onChange={this.handleChange.bind(this, "titleInCodex")}
						value={model.get("titleInCodex")} />
				</li>
				<li>
					<label>Incipit</label>
					<Input
						onChange={this.handleChange.bind(this, "incipit")}
						value={model.get("incipit")} />
				</li>
				<li>
					<label>Excipit</label>
					<Input
						onChange={this.handleChange.bind(this, "excipit")}
						value={model.get("excipit")} />
				</li>
				<li>
					<label>Pages</label>
					<Input
						onChange={this.handleChange.bind(this, "pages")}
						value={model.get("pages")} />
				</li>
				<li>
					<label>State of preservation</label>
					<Input
						onChange={this.handleChange.bind(this, "stateOfPreservation")}
						value={model.get("stateOfPreservation")} />
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

TextUnit.defaultFormProps = {
	excipit: "",
	incipit: "",
	pages: "",
	remarks: "",
	stateOfPreservation: "",
	text: new Immutable.List(),
	titleInCodex: ""
};

export default TextUnit;