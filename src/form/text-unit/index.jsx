import React from "react";
import Immutable from "immutable";

import Form from "../base";

import Input from "../../components/input";
import SelectList from "../../components/select-list";

import texts from "../../stores/texts";
import textsActions from "../../actions/texts";

import {FORM} from "../../constants";

class TextUnit extends Form {
	this.defaultFormProps =
		text: new Immutable.List()
		titleInCodex: ""
		incipit: ""
		excipit: ""
		pages: ""
		stateOfPreservation: ""
		remarks: ""

	constructor(props) {
		super(props);

		this.state =
			texts: texts.getState()

	componentDidMount() {
		textsActions.getAllTexts()

		texts.listen this.handleStoreChange

	componentWillUnmount() {
		texts.stopListening this.handleStoreChange

	render() {
		model = this.props.value

		<ul className={FORM}>
			<li>
				<label>text</label>
				<SelectList
					values={model.get("text").toArray()}
					options={this.state.texts.get("all").toArray()}
					onChange={this.handleChange.bind(this, "text")} />
			</li>
			<li>
				<label>Title in codex</label>
				<Input
					value={model.get("titleInCodex")}
					onChange={this.handleChange.bind(this, "titleInCodex")} />
			</li>
			<li>
				<label>Incipit</label>
				<Input
					value={model.get("incipit")}
					onChange={this.handleChange.bind(this, "incipit")} />
			</li>
			<li>
				<label>Excipit</label>
				<Input
					value={model.get("excipit")}
					onChange={this.handleChange.bind(this, "excipit")} />
			</li>
			<li>
				<label>Pages</label>
				<Input
					value={model.get("pages")}
					onChange={this.handleChange.bind(this, "pages")} />
			</li>
			<li>
				<label>State of preservation</label>
				<Input
					value={model.get("stateOfPreservation")}
					onChange={this.handleChange.bind(this, "stateOfPreservation")} />
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
			texts: texts.getState()

}

export default TextUnit;;