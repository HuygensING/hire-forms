//TODO rename this.props.view to this.props.component
//TODO fix propType for this.props.view
//TODO rename this.props.value to this.props.values

import React from "react";
import Immutable from "immutable";
import cx from "classnames";

import alwaysArray from "../utils/always-array";

import {MULTIFORM} from "../constants";

import {stringOrArrayOfString} from "../utils/prop-types";

class MultiForm extends React.Component {
	/**
	 * Add a form.
	 *
	 * The key is the Immutable.List size (equal to highest index + 1).
	 * The value is an Immutable.Map. The form will extend/merge the map
	 * with default values.
	 *
	 * @method
	 */
	handleAddForm() {
		let attr = alwaysArray(this.props.attr);
		let index = this.props.value.size;
		let key = attr.concat(index);

		this.props.onChange(key, new Immutable.Map());
	}

	handleRemoveForm(index) {
		let attr = alwaysArray(this.props.attr);
		let key = attr.concat(index);

		this.props.onDelete(key);
	}

	handleChange(key, value) {
		this.props.onChange(key, value);
	}

	handleDelete(key) {
		this.props.onDelete(key);
	}

	handleInvalid(key) {
		this.props.onInvalid(key);
	}

	render() {
		let attr = alwaysArray(this.props.attr);

		let views = this.props.value.map((listItem, index) => {
			return (
				<li key={index}>
					<this.props.view
						attr={attr.concat(index)}
						onChange={this.handleChange.bind(this)}
						onDelete={this.handleDelete.bind(this)}
						onInvalid={this.handleInvalid.bind(this)}
						value={listItem} />
					<button
						className="hire-remove-form"
						onClick={this.handleRemoveForm.bind(this, index)}
						title="Remove">
						-
					</button>
				</li>
				);
		});

		return (
			<div className={MULTIFORM}>
				<ul>{views}</ul>
				<button
					className={cx(
						"hire-add-form",
						{first: this.props.value.size === 0}
					)}
					onClick={this.handleAddForm.bind(this)}
					title="Add">
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
	onInvalid: React.PropTypes.func,
	value: React.PropTypes.instanceOf(Immutable.List),
	view: React.PropTypes.func
};


export default MultiForm;