// TODO use visible state instead of options list

import React from "react";

import Input from "../input";
import Options from "../options";

let divStyle = {
	position: "relative"
};

import {LISTFILTER} from "../../constants";

class ListFilter extends React.Component {
	componentWillReceiveProps(nextProps) {
		this.setState({options: nextProps.options});
	}

	constructor(props) {
		super(props);

		this.state = {
			options: this.props.options,
			query: ""
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

		this.filter(inputValue);
	}

	filter(inputValue) {
		let options = this.props.options.filter((value) =>
			value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
		);

		this.setState({
			query: inputValue,
			options: options
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
		this.props.onChange(value);
	}

	render() {
		return (
			<div
				className={LISTFILTER}
				style={divStyle}>
				<Input
					onChange={this.handleInputChange.bind(this)}
					onKeyDown={this.handleInputKeyDown.bind(this)}
					placeholder={this.props.placeholder}
					ref="input"
					value={this.state.query} />
				{this.props.children}
				<Options
					onChange={this.handleOptionsChange.bind(this)}
					query={this.state.query}
					ref="options"
					value={this.props.value}
					values={this.state.options} />
			</div>
		);
	}
}

ListFilter.propTypes = {
	children: React.PropTypes.element,
	minLength: React.PropTypes.number,
	onChange: React.PropTypes.func,
	options: React.PropTypes.arrayOf(React.PropTypes.string),
	placeholder: React.PropTypes.string,
	value: React.PropTypes.string
};

export default ListFilter;