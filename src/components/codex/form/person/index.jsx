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

		return (
			<ul>
				<li>
					<label>Person</label>
					<Select
						onChange={this.props.onChange.bind(this, "person")}
						options={this.props.persons}
						value={model.person} />
				</li>
				<li>
					<label>Certain</label>
					<Checkbox
						onChange={this.props.onChange.bind(this, "certain")}
						value={model.certain} />
				</li>
				<li>
					<label>Folia range</label>
					<Input
						onChange={this.props.onChange.bind(this, "pages")}
						value={model.pages} />
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

export default form(PersonForm);