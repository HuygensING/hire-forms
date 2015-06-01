// TODO use visible state instead of options list

import React from "react";

import Input from "../input";
import Options from "../options";

let divStyle = {
	position: "relative"
};

import {AUTOCOMPLETE} from "../../constants";

class Autocomplete extends React.Component {
	constructor(props) {
		super(props);

		this.cache = {};
		this.state = {
			inputValue: props.value,
			options: []
		};
	}

	handleInputChange(inputValue) {
		// Return empty options if inputValue length is beneath a treshold.
		if (inputValue.length < this.props.minLength) {
			return this.setState({
				inputValue: inputValue,
				options: []
			});
		}

		// Return options from cache.
		if (this.cache.hasOwnProperty(inputValue)) {
			return this.setState({
				inputValue: inputValue,
				options: this.cache[inputValue]
			});
		}

		if (this.props.async) {
			this.fetch(inputValue);
		} else {
			this.filter(inputValue);
		}
	}

	fetch() {
		let timer = null;

		return function(inputValue) {
			this.setState({inputValue: inputValue});

			if (timer) {
				clearTimeout(timer);
			}

			let timeoutFn = function() {
				timer = null;

				this.props.async(inputValue, function(options) {
					// Add the options to the cache.
					this.cache[inputValue] = options;

					// Get the cache from the current (!!!) inputValue. The results trail behind
					// the user typing, so we have to pass the options of the current inputValue,
					// not the options of the inputValue of the fetch.
					let state = (this.cache.hasOwnProperty(this.state.inputValue)) ?
						{options: this.cache[this.state.inputValue]} :
						{options: []};

					this.setState(state);
				});
			};

			timer = setTimeout(timeoutFn, 400);
		};
	}

	filter(inputValue) {
		this.cache[inputValue] = this.props.options.filter((value) =>
			value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
		);

		this.setState({
			inputValue: inputValue,
			options: this.cache[inputValue]
		});
	}

	handleInputKeyDown(ev) {
		// Up
		if (ev.keyCode === 38) {
			this.refs.options.highlightPrev();
		}

		// Down
		if (ev.keyCode === 40) {
			this.refs.options.highlightNext();
		}

		// Enter
		if (ev.keyCode === 13) {
			this.refs.options.select();
		}

		// Escape
		if (ev.keyCode === 27) {
			this.clear();
		}
	}

	handleOptionsChange(value) {
		this.setState({
			options: [],
			inputValue: value
		});

		this.props.onChange(value);
	}

	/**
	 * Clear the autocomplete, which means: clear the input and
	 * empty the options.
	 */
	clear() {
			this.setState({
				options: [],
				inputValue: ""
			});
	}

	/**
	 * Toggle all options (props.options).
	 *
	 * This method is used by the combo(-list) component. Doesn't work in combination
	 * with props.async!
	 */
	toggleOptions() {
		React.findDOMNode(this.refs.input).focus();

		let options = this.state.options.length ?
			[] :
			this.props.options;

		this.setState({options: options});
	}

	render() {
		return (
			<div
				className={AUTOCOMPLETE}
				style={divStyle}>
				<Input
					onChange={this.handleInputChange}
					onKeyDown={this.handleInputKeyDown}
					placeholder={this.props.placeholder}
					ref="input"
					value={this.state.inputValue} />
				{this.props.children}
				<Options
					onChange={this.handleOptionsChange}
					query={this.state.inputValue}
					ref="options"
					value={this.props.value}
					values={this.state.options} />
			</div>
		);
	}
}

Autocomplete.defaultProps = {
	options: [],
	value: "",
	minLength: 1
};

Autocomplete.propTypes = {
	async: React.PropTypes.func,
	children: React.PropTypes.element,
	minLength: React.PropTypes.number,
	onChange: React.PropTypes.func.isRequired,
	options: React.PropTypes.array,
	placeholder: React.PropTypes.string,
	value: React.PropTypes.string
};

export default Autocomplete;