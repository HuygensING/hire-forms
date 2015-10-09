import React from "react";

import Input from "hire-forms-input";
import Textarea from "hire-forms-textarea";
import Checkbox from "hire-forms-checkbox";
import Select from "hire-forms-select";

import form from "hire-forms-form";

class PersonForm extends React.Component {
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
					<label>Person</label>
					<Select
						onChange={this.props.handleChange.bind(this, "person")}
						options={this.props.persons}
						value={model.person} />
				</li>
				<li>
					<label>Certain</label>
					<Checkbox
						onChange={this.props.handleChange.bind(this, "certain")}
						value={model.certain} />
				</li>
				<li>
					<label>Folia range</label>
					<Input
						onChange={this.props.handleChange.bind(this, "pages")}
						value={model.pages} />
				</li>
				<li>
					<label>Remarks</label>
					<Textarea
						onChange={this.props.handleChange.bind(this, "remarks")}
						value={model.remarks} />
				</li>
				{addButton}
			</ul>
		);
	}
}

export default form(PersonForm);