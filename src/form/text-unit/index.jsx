import React from "react";
import Immutable from "immutable";

import Form from "../base";

import Input from "../../components/input";
import SelectList from "../../components/select-list";

import texts from "../../stores/texts";
import textsActions from "../../actions/texts";

import {FORM} from "../../constants";

class TextUnit extends Form {
	componentDidMount() {
		textsActions.getAllTexts();

		texts.listen(this.handleStoreChange.bind(this));
	}

	componentWillUnmount() {
		texts.stopListening(this.handleStoreChange.bind(this));
	}

	constructor(props) {
		super(props);

		this.state = {texts: texts.getState()};
	}

	handleStoreChange() {
		this.setState({texts: texts.getState()});
	}

	render() {
		let model = this.props.value;

		return (
			<ul className={FORM}>
				<li>
					<label>text</label>
					<SelectList
						onChange={this.handleChange.bind(this, "text")}
						options={this.state.texts.get("all").toArray()}
						values={model.get("text").toArray()} />
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
					<Input
						onChange={this.handleChange.bind(this, "remarks")}
						value={model.get("remarks")} />
				</li>
			</ul>
		);
	}
}

TextUnit.defaultFormProps = {
	excipit: "",
	incipit: "",
	pages: "",
	remarks: "",
	stateOfPreservation: "",
	text: new Immutable.List(),
	titleInCodex: ""
};

TextUnit.propTypes = {
	value: React.PropTypes.instanceOf()
};

export default TextUnit;