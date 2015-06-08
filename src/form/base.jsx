import React from "react";
import Immutable from "immutable";

import {stringOrArray} from "../utils/prop-types";
import alwaysArray from "../utils/always-array";

export default {
	propTypes: {
		// The array can consist of strings and numbers.
		attr: stringOrArray,
		onChange: React.PropTypes.func.isRequired,
		onDelete: React.PropTypes.func,
		onInvalid: React.PropTypes.func,
		value: React.PropTypes.instanceOf(Immutable.Map)
	},

	getDefaultProps() {
		return {
			attr: []
		};
	},

	handleChange(key, value) {
		let attr = alwaysArray(this.props.attr);

		this.props.onChange(attr.concat(key), value);
	},

	handleDelete(key) {
		let attr = alwaysArray(this.props.attr);

		this.props.onDelete(attr.concat(key));
	},

	handleInvalid(key) {
		let attr = alwaysArray(this.props.attr);

		this.props.onInvalid(attr.concat(key));
	}
};