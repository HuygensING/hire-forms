import React from "react";

import form from "hire-forms-form";
// import watchStores from "../watch-stores";

import Input from "hire-forms-input";
import Textarea from "hire-forms-textarea";
import Select from "hire-forms-select";

// import texts from "../../stores/texts";
// import textsActions from "../../actions/texts";

// import textUnit from "../../stores/models/text-unit";

class TextUnit extends React.Component {
	// mixins: [watchStores(texts)]

	// componentDidMount() {
	// 	textsActions.getAllTexts();
	// }

	render() {
		let model =this.props.value;

		return (
			<ul>
				<li>
					<label>text</label>
					<Select
						onChange={this.props.onChange.bind(this, "text")}
						options={this.props.texts}
						value={model.text} />
				</li>
				<li>
					<label>Title in codex</label>
					<Input
						onChange={this.props.onChange.bind(this, "titleInCodex")}
						value={model.titleInCodex} />
				</li>
				<li>
					<label>Incipit</label>
					<Input
						onChange={this.props.onChange.bind(this, "incipit")}
						value={model.incipit} />
				</li>
				<li>
					<label>Excipit</label>
					<Input
						onChange={this.props.onChange.bind(this, "excipit")}
						value={model.excipit} />
				</li>
				<li>
					<label>Pages</label>
					<Input
						onChange={this.props.onChange.bind(this, "pages")}
						value={model.pages} />
				</li>
				<li>
					<label>State of preservation</label>
					<Input
						onChange={this.props.onChange.bind(this, "stateOfPreservation")}
						value={model.stateOfPreservation} />
				</li>
				<li>
					<label>Remarks</label>
					<Textarea
						onChange={this.props.onChange.bind(this, "remarks")}
						value={model.remarks} />
				</li>
			</ul>
		);
	}
}

export default form(TextUnit);