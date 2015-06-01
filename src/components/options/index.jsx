import React from "react";
import cx from "classnames";

import {OPTIONS} from "../../constants";

import {arrayOfKeyValue, stringOrArrayOfString} from "../../utils/prop-types";

const HIGHTLIGHT_CLASS = "highlight";

/**
 * Options are rendered beneath the autocomplete and select components.
 *
 * @class
 * @extends React.Component
 */
class Options extends React.Component {
	/**
	 * Sort props.values on relevance. A result is more relevant
	 * when the search query is more at the beginning of the string.
	 * String.indexOf(props.query): lower is better.
	 *
	 * @returns {Array<String>} Sorted values on relevance
	 */
	sortRelevance(values) {
		return values.sort((a, b) => {
			a = a.value.toLowerCase();
			b = b.value.toLowerCase();

			let indexA = a.indexOf(this.props.query);
			let indexB = b.indexOf(this.props.query);

			if (indexA > indexB) {
				return 1;
			}

			if (indexA < indexB) {
				return -1;
			}

			if (indexA === indexB) {
				if (a > b) {
					return 1;
				}

				if (a < b) {
					return -1;
				}
			}

			return 0;
		});
	}

	highlight(target) {
		// Check if target is an event object.
		if (target.hasOwnProperty("currentTarget")) {
			target = target.currentTarget;
		}

		target.classList.add(HIGHTLIGHT_CLASS);
	}

	/**
	 * Unhighlight the currently highlighted option.
	 *
	 *
	 */
	unhighlight() {
		let el;
		let node = React.findDOMNode(this);

		if (node) {
			el = node.querySelector("li.highlight");

			if (el) {
				el.classList.remove(HIGHTLIGHT_CLASS);
			}
		}

		return el;
	}

	handleClick(ev) {
		this.props.onChange(this.getOptionData(ev.currentTarget));
	}

	highlightPrev() {
		let prev;
		let current = this.unhighlight();

		if (current) {
			prev = current.previousElementSibling;
		}

		// If current and prev aren't found, start at the top.
		// Current is not found if there is no list item highlighted.
		// Prev is not found if the first list item is highlighted.
		if (!prev) {
			prev = React.findDOMNode(this).lastChild;
		}

		this.highlight(prev);
	}


	highlightNext() {
		let next;
		let current = this.unhighlight();

		if (current) {
			next = current.nextElementSibling;
		}

		// If current and next aren't found, start at the top.
		// Current is not found if there is no list item highlighted.
		// Next is not found if the last list item is highlighted.
		if (!next) {
			next = React.findDOMNode(this).firstChild;
		}

		this.highlight(next);
	}

	select() {
		let current = this.unhighlight();

		if (current) {
			this.props.onChange(this.getOptionData(current));
		}
	}

	/**
	 * Get the key (id) and value (display name) of an option DOM element.
	 *
	 * @param {Object} el - Option DOM element
	 * @returns {Object}
	 */
	getOptionData(el) {
		return {
			key: el.getAttribute("data-key"),
			value: el.getAttribute("data-value")
		};
	}

	render() {
		if (this.props.values.length === 0) {
			return null;
		}

		let values = (this.props.sortRelevance) ?
			this.sortRelevance(this.props.values) :
			this.props.values;

		let listitems = values.map((data, index) => {
			let displayValue = data.value;

			if (this.props.query.length) {
				let re = new RegExp(this.props.query, "ig");
				displayValue = data.value.replace(re, "<span class=\"highlight\">$&</span>");
			}

			let selectedValue = (Array.isArray(this.props.value)) ?
				this.props.value :
				[this.props.value];

			return (
				<li
					className={cx({selected: selectedValue.indexOf(data.value) > -1})}
					dangerouslySetInnerHTML={{__html: displayValue}}
					data-key={data.key}
					data-value={data.value}
					key={index}
					onClick={this.handleClick.bind(this)}
					onMouseEnter={this.highlight.bind(this)}
					onMouseLeave={this.unhighlight.bind(this)}>
				</li>
			);
		});

		return (
			<ul
				className={OPTIONS}>
				{listitems}
			</ul>
		);
	}
}

Options.defaultProps = {
	query: "",
	sortRelevance: true,
	value: "",
	values: []
};


Options.propTypes = {
	onChange: React.PropTypes.func.isRequired,
	query: React.PropTypes.string,
	sortRelevance: React.PropTypes.bool,
	value: stringOrArrayOfString,
	values: arrayOfKeyValue
};

export default Options;
