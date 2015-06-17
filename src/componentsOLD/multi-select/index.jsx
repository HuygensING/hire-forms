import React from "react";

import Checkbox from "../checkbox";

import {MULTISELECT} from "../../constants";

class MultiSelect extends React.Component {
	handleChange(index, checked) {
		let option = this.props.options[index];

		if (checked) {
			this.props.values.push(option);
			this.props.onChange(this.props.values);
		} else {
			let valueIndex = this.props.values.indexOf(option);
			this.props.values.splice(valueIndex, 1);
			this.props.onChange(this.props.values);
		}
	}

	render() {
		let options = this.props.options.map((option, index) => {
			return (
				<Checkbox
					key={index}
					label={option}
					onChange={this.handleChange.bind(this, index)}
					value={this.props.values.indexOf(option) > -1} />
			);
		});

		return (
			<div className={MULTISELECT}>
				{options}
			</div>
		);
	}
}

MultiSelect.defaultProps = {
	options: [],
	values: []
};

MultiSelect.propTypes = {
	onChange: React.PropTypes.func.isRequired,
	options: React.PropTypes.array,
	placeholder: React.PropTypes.string,
	values: React.PropTypes.array
};

export default MultiSelect;