import React from "react";

import {stringOrArray} from "hire-forms-prop-types";
import castArray from "hire-forms-utils";

export default {
	propTypes: {
		// The array can consist of strings and numbers.
		attr: stringOrArray,
		onChange: React.PropTypes.func.isRequired,
		onDelete: React.PropTypes.func,
		onInvalid: React.PropTypes.func,
		value: React.PropTypes.object
	},

	getDefaultProps() {
		return {
			attr: []
		};
	},

	handleChange(key, value) {
		let attr = castArray(this.props.attr);

		this.props.onChange(attr.concat(key), value);
	},

	handleDelete(key) {
		let attr = castArray(this.props.attr);

		this.props.onDelete(attr.concat(key));
	},

	handleInvalid(key) {
		let attr = castArray(this.props.attr);

		this.props.onInvalid(attr.concat(key));
	}
};