//TODO rename this.props.view to this.props.component
//TODO fix propType for this.props.view

import React from "react";
import Immutable from "immutable";

import {MULTIFORM} from "../constants";

import {stringOrArrayOfString} from "../utils/prop-types";

class MultiForm extends React.Component {
	handleAddForm() {
		let attr = (Array.isArray(this.props.attr)) ?
			this.props.attr :
			[this.props.attr];

		let index = this.props.value.size;
		let key = attr.concat(index);

		let value = new Immutable.Map(this.props.view.defaultFormProps);

		this.props.onChange(key, value);
	}

	handleRemoveForm(index) {
		let attr = (Array.isArray(this.props.attr)) ?
			this.props.attr :
			[this.props.attr];

		let key = attr.concat(index);

		this.props.onDelete(key);
	}

	handleChange(key, value) {
		this.props.onChange(key, value);
	}

	handleDelete(key) {
		this.props.onDelete(key);
	}

	render() {
		let attr = (Array.isArray(this.props.attr)) ?
			this.props.attr :
			[this.props.attr];

		let views = this.props.value.map((listItem, index) =>
			<li key={index}>
				<this.props.view
					attr={attr.concat(index)}
					onChange={this.handleChange}
					onDelete={this.handleDelete}
					value={listItem} />
				<button
					className="hire-remove-form"
					onClick={this.handleRemoveForm.bind(this, index)}>
					-
				</button>
			</li>
		);

		return (
			<div className={MULTIFORM}>
				<ul>{views}</ul>
				<button
					className="hire-add-form"
					onClick={this.handleAddForm}>
					+
				</button>
			</div>
		);
	}
}

MultiForm.defaultProps = {
	value: new Immutable.List()
};

// view: React.PropTypes.element.isRequired
MultiForm.propTypes = {
	attr: stringOrArrayOfString,
	onChange: React.PropTypes.func,
	onDelete: React.PropTypes.func,
	value: React.PropTypes.instanceOf(Immutable.List),
	view: React.PropTypes.element
};


export default MultiForm;

