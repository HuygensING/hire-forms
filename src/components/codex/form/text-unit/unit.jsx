import React from "react";
import form from "hire-forms-form";
import Input from "hire-forms-input";
import Textarea from "hire-forms-textarea";
import Select from "hire-forms-select";

class TextUnit extends React.Component {
	shouldComponentUpdate(nextProps) {
		return (this.props.formData !== nextProps.formData)
	}

	render() {
		let model =this.props.formData;

		return (
			<ul>
				<li>
					<label>Text</label>
					<Select
						onChange={this.props.handleChange.bind(this, "text")}
						options={this.props.texts}
						value={model.text} />
				</li>
				<li>
					<label>Title in codex</label>
					<Input
						onChange={this.props.handleChange.bind(this, "titleInCodex")}
						value={model.titleInCodex} />
				</li>
				<li>
					<label>Incipit</label>
					<Input
						onChange={this.props.handleChange.bind(this, "incipit")}
						value={model.incipit} />
				</li>
				<li>
					<label>Explicit</label>
					<Input
						onChange={this.props.handleChange.bind(this, "explicit")}
						value={model.explicit} />
				</li>
				<li>
					<label>Pages</label>
					<Input
						onChange={this.props.handleChange.bind(this, "pages")}
						value={model.pages} />
				</li>
				<li>
					<label>State of preservation</label>
					<Input
						onChange={this.props.handleChange.bind(this, "stateOfPreservation")}
						value={model.stateOfPreservation} />
				</li>
				<li>
					<label>Remarks</label>
					<Textarea
						onChange={this.props.handleChange.bind(this, "remarks")}
						value={model.remarks} />
				</li>
			</ul>
		);
	}
}

export default form(TextUnit);