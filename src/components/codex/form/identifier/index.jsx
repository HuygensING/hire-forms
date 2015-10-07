import React from "react";
import Immutable from "immutable";

import form from "hire-forms-form";

import Input from "hire-forms-input";
import Select from "hire-forms-select";

let identifier = new Immutable.Map({
	identifier: "",
	type: ""
});

class IdentifierForm extends React.Component {
	shouldComponentUpdate(nextProps) {
		return (this.props.formData !== nextProps.formData)
	}

	render() {
		let model = this.props.formData;

		let addButton = (this.props.addButton != null) ?
			<li>{this.props.addButton}</li> :
			null;

		return (
			<ul>
				<li>
					<label>Type</label>
					<Select
						onChange={this.props.onChange.bind(this, "type")}
						options={["(empty)", "Bergmann", "Bischoff", "CLA", "KIH"]}
						value={model.type} />
				</li>
				<li>
					<label>Identifier</label>
					<Input
						onChange={this.props.onChange.bind(this, "identifier")}
						value={model.identifier} />
				</li>
				{addButton}
			</ul>
		);
	}
}

export default form(IdentifierForm);