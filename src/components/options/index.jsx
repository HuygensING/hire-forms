import React from 'react'
import cx from "classnames"

import {OPTIONS} from "../../constants"

import {arrayOfKeyValue, stringOrArrayOfString} from "../../utils/prop-types";

const HIGHTLIGHT_CLASS = "highlight";

/**
 * Options are rendered beneath the autocomplete and select components.
 *
 * @class
 * @extends React.Component
 */
class options extends React.Component {
	render() {
		if (this.props.values.length === 0) {
			return null;
		}

		values = if this.props.sortRelevance then this._sortRelevance(this.props.values) else this.props.values

		listitems = values.map (data, index) {
			displayValue = data.value

			if this.props.query.length
				re = new RegExp this.props.query, 'ig'
				displayValue = data.value.replace re, "<span class=\"highlight\">$&</span>"

			selectedValue = if Array.isArray(this.props.value) then this.props.value else [this.props.value]

			<li
				className={cx(selected: selectedValue.indexOf(data.value) > -1)}
				key={index}
				onClick={this._handleClick}
				onMouseEnter={this._highlight}
				onMouseLeave={this._unhighlight}
				data-key={data.key}
				data-value={data.value}
				dangerouslySetInnerHTML={__html: displayValue}>
			</li>

		<ul
			className={OPTIONS}>
			{listitems}
		</ul>

	###
	// Sort props.values on relevance. A result is more relevant
	// when the search query is more at the beginning of the string.
	// String.indexOf(props.query): lower is better.
	#
	// this.returns {Array<String>} Sorted values on relevance
	###
	_sortRelevance)values) {
		values.sort (a, b) {
			a = a.value.toLowerCase()
			b = b.value.toLowerCase()

			indexA = a.indexOf(this.props.query)
			indexB = b.indexOf(this.props.query)

			if indexA > indexB
				return 1

			if indexA < indexB
				return -1

			if indexA is indexB
				if a > b
					return 1

				if a < b
					return -1

			0


	_highlight)target) {
		// Check if target is an event object.
		if target.hasOwnProperty("currentTarget")
			target = target.currentTarget

		target.classList.add HIGHTLIGHT_CLASS

	_unhighlight: =>
		el = React.findDOMNode(this.)?.querySelector("li.highlight")
		el?.classList.remove HIGHTLIGHT_CLASS

		el

	_handleClick)ev) {
		this.props.onChange
			key: ev.currentTarget.getAttribute("data-key")
			value: ev.currentTarget.getAttribute("data-value")

	highlightPrev: =>
		current = this._unhighlight()

		if current?
			current.classList.remove HIGHTLIGHT_CLASS
			prev = current.previousElementSibling

		// If current and prev aren't found, start at the top.
		// Current is not found if there is no list item highlighted.
		// Prev is not found if the first list item is highlighted.
		unless prev?
			prev = React.findDOMNode(this.).lastChild

		this._highlight prev


	highlightNext: =>
		current = this._unhighlight()

		if current?
			current.classList.remove HIGHTLIGHT_CLASS
			next = current.nextElementSibling

		// If current and next aren't found, start at the top.
		// Current is not found if there is no list item highlighted.
		// Next is not found if the last list item is highlighted.
		unless next?
			next = React.findDOMNode(this.).firstChild

		this._highlight next

	select: =>
		current = this._unhighlight()

		if current?
			this.props.onChange
				key: current.getAttribute("data-key")
				value: current.getAttribute("data-value")

Options.defaultProps = {
	query: "",
	sortRelevance: true,
	value: "",
	values: []
}


Options.propTypes = {
	onChange: React.PropTypes.func.isRequired,
	query: React.PropTypes.string,
	sortRelevance: React.PropTypes.bool,
	value: stringOrArrayOfString,
	values: arrayOfKeyValue
}
export default options
