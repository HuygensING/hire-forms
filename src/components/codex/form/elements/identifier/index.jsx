import React, {PropTypes} from "react";
import form from "hire-forms-form";
import Input from "hire-forms-input";
import Select from "hire-forms-select";

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
					<label>Book</label>
					<Select
						onChange={this.props.handleChange.bind(this, "type")}
						options={["(empty)", "Bergmann", "Bischoff", "CLA", "KIH"]}
						value={model.type} />
				</li>
				<li>
					<label>Nr/p</label>
					<Input
						onChange={this.props.handleChange.bind(this, "identifier")}
						value={model.identifier} />
				</li>
				{addButton}
			</ul>
		);
	}
}

IdentifierForm.propTypes = {
	addButton: PropTypes.bool,
	formData: PropTypes.object,
	handleChange: PropTypes.func
}

export default form(IdentifierForm);
