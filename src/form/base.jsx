import React from "react";
import Immutable from "immutable";

import {stringOrArrayOfString} from "../utils/prop-types";

class Form extends React.Component {
	handleChange(key, value) {
		let attr = (Array.isArray(this.props.attr)) ?
			this.props.attr :
			[this.props.attr];

		this.props.onChange(attr.concat(key), value);
	}

	handleDelete(key) {
		let attr = (Array.isArray(this.props.attr)) ?
			this.props.attr :
			[this.props.attr];

		this.props.onDelete(attr.concat(key));
	}
}

Form.propTypes = {
	attr: stringOrArrayOfString.isRequired,
	onChange: React.PropTypes.func.isRequired,
	value: React.PropTypes.instanceOf(Immutable.Map)
};

export default Form;