import React from "react";

import StaticList from "../static-list";
import Select from "../select";

import {SELECTLIST} from "../../constants";

import {arrayOfStringOrArrayOfKeyValue} from "../../utils/prop-types";

class SelectList extends React.Component {
	handleListChange(values) {
		this.props.onChange(values);
	}

	handleSelectChange(value) {
		this.props.values.push(value);
		this.props.onChange(this.props.values);
	}

	render() {
		return (
			<div className={SELECTLIST}>
				<StaticList
					onChange={this.handleListChange.bind(this)}
					values={this.props.values} />
				<Select
					onChange={this.handleSelectChange.bind(this)}
					options={this.props.options}
					placeholder={this.props.placeholder} />
			</div>
		);
	}
}

SelectList.defaultProps = {
	values: [],
	options: [],
	ordered: false
};

SelectList.propTypes = {
	async: React.PropTypes.func,
	onChange: React.PropTypes.func.isRequired,
	options: arrayOfStringOrArrayOfKeyValue,
	ordered: React.PropTypes.bool,
	placeholder: React.PropTypes.string,
	values: arrayOfStringOrArrayOfKeyValue
};

export default SelectList;