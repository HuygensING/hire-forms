//TODO rename this.props.view to this.props.component
//TODO fix propType for this.props.view

import React from "react";
import Immutable from "immutable";

import {MULTIFORM} from "../constants";

class MultiForm extends React.Component
	this.defaultProps =
		value: new Immutable.List()

	this.propTypes =
		attr: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.array
		]).isRequired
		// view: React.PropTypes.element.isRequired
		value: React.PropTypes.instanceOf(Immutable.List)
		onChange: React.PropTypes.func
		onDelete: React.PropTypes.func

	render() {
		attr = if Array.isArray(this.props.attr) then this.props.attr else [this.props.attr]

		views = this.props.value.map (listItem, index) =>
			<li key={index}>
				<this.props.view
					attr={attr.concat(index)}
					value={listItem}
					onChange={this.handleChange}
					onDelete={this.handleDelete} />
				<button
					className="hire-remove-form"
					onClick={this._handleRemoveForm.bind(this, index)}>
					-
				</button>
			</li>

		<div className={MULTIFORM}>
			<ul>{views}</ul>
			<button
				className="hire-add-form"
				onClick={this._handleAddForm}>
				+
			</button>
		</div>

	_handleAddForm() {
		attr = if Array.isArray(this.props.attr) then this.props.attr else [this.props.attr]
		index = this.props.value.size
		key = attr.concat(index)

		value = new Immutable.Map this.props.view.defaultFormProps

		this.props.onChange key, value

	_handleRemoveForm: (index) =>
		attr = if Array.isArray(this.props.attr) then this.props.attr else [this.props.attr]
		key = attr.concat(index)

		this.props.onDelete key

	handleChange: (key, value) =>
		this.props.onChange key, value

	handleDelete: (key) =>
		this.props.onDelete key

}

export default MultiForm;

