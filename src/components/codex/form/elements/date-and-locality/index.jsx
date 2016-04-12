import React from "react";

import form from "hire-forms-form";
import Checkbox from "hire-forms-checkbox";
import Input from "hire-forms-input";

import Textarea from "hire-forms-textarea";
import Locality from "./locality";

let validateDate = function(value) {
	let re = /^\-?\d{1,4}((\/?)\-?\d{1,4})?(~|\?)?$/;
	let valid = re.test(value);

	if (valid) {
		let matches = re.exec(value);

		if (matches && matches[1]) {
			let startYear = matches[0].substr(0, matches[0].indexOf("/"));
			let endYear = matches[1].substr(1);

			valid = parseInt(startYear) < parseInt(endYear);
		}
	}

	return {
		isValid: valid,
		message: "A single year (dddd) or a range of the format `dddd - dddd`."
	}
};

let validateNumbersOnly = function(value) {
	let re = /^\d+$/;
	return {
		isValid: re.test(value),
		message: "Should contain only numbers."
	}
};

class DateAndLocalityForm extends React.Component {
	shouldComponentUpdate(nextProps) {
		return (this.props.formData !== nextProps.formData)
	}

	render() {
		let model = this.props.formData;

		let date = this.props.showDate ?
				<li>
					<label>Date</label>
					<Input
						onChange={this.props.handleChange.bind(this, "date")}
						onInvalid={this.props.handleInvalid.bind(this, "date")}
						validate={validateDate}
						value={model.date} />
				</li> :
			null;

		let dateSource = this.props.showDate ?
			<li>
				<label>Date source</label>
				<Input
					onChange={this.props.handleChange.bind(this, "dateSource")}
					onInvalid={this.props.handleInvalid.bind(this, "dateSource")}
					value={model.dateSource} />
			</li> :
			null;

		return (
			<ul>
				{date}
				{dateSource}
				<li>
					<label>Region - Place - Scriptorium</label>
					<Locality
						onChange={this.props.handleChange.bind(this, "locality")}
						values={model.locality} />
				</li>
				<li>
					<label>Remarks</label>
					<Textarea
						onChange={this.props.handleChange.bind(this, "remarks")}
						value={model.remarks} />
				</li>
				<li>
					<label>Certain</label>
					<Checkbox
						onChange={this.props.handleChange.bind(this, "certain")}
						value={model.certain} />
				</li>
			</ul>
		);
	}
}

DateAndLocalityForm.defaultProps = {
	showDate: true
};

DateAndLocalityForm.propTypes = {
	showDate: React.PropTypes.bool
}

export default form(DateAndLocalityForm);
