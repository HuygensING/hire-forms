import React from "react";

import Options from "../options";

import {SELECT} from "../../constants";

import cx from "classnames";

import {stringOrKeyValue, arrayOfStringOrArrayOfKeyValue} from "../../utils/prop-types";

class Select extends React.Component {
	constructor(props) {
		super(props);

		this.state = {visible: false};
	}

	isListOfStrings(list) {
		return list.length && (typeof list[0] === "string");
	}

	isKeyValueMap(map) {
		return map.hasOwnProperty("key") && map.hasOwnProperty("value");
	}

	stringArray2KeyValueArray(list) {
		list.map((item) => ({
			key: item,
			value: item
		}));
	}

	handleInputClick() {
		this.setState({visible: !this.state.visible});
	}

	/**
	 * @method
	 * @param {object} value Map of key and value: {key: "somekey", value: "somevalue"}
	 */
	handleOptionsChange(value) {
		this.setState({visible: false});

		// If the options prop is an array of strings,
		// return a string.
		if (this.isListOfStrings(this.props.options)) {
			value = value.value;
		}

		this.props.onChange(value);
	}

	render() {
		let optionValues, options;

		if (this.state.visible) {
			optionValues = this.isListOfStrings(this.props.options) ?
				this.stringArray2KeyValueArray(this.props.options) :
				this.props.options;

			options = (
				<Options
					onChange={this.handleOptionsChange}
					values={optionValues} />
			);
		}

		let value = (this.props.value === "") ?
			this.props.placeholder :
			this.props.value;

		if (this.isKeyValueMap(this.props.value)) {
			value = this.props.value.value;
		}

		return (
			<div className={SELECT}>
				<div className="input-container" onClick={this.handleInputClick}>
					<div className={cx({
						"input": true,
						"placeholder": this.props.value === ""})}>
						{value}
					</div>
					<button>▾</button>
				</div>
				{options}
			</div>
		);
	}
}

Select.defaultProps = {
	value: "",
	options: []
};

Select.propTypes = {
	onChange: React.PropTypes.func.isRequired,
	options: arrayOfStringOrArrayOfKeyValue,
	placeholder: React.PropTypes.string,
	value: stringOrKeyValue
};

export default Select;