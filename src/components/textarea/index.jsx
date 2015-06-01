// TODO add autoresize

import React from "react";
import cx from "classnames";

import {TEXTAREA} from "../../constants";

class Textarea extends React.Component {
	constructor(props) {
		super(props);

		this.state = {focus: false};
	}

	toggleFocus() {
		this.setState({focus: !this.state.focus});
	}

	handleKeyDown(ev) {
		this.props.onKeyDown(ev);
	}

	handleKeyUp(ev) {
		this.props.onKeyUp(ev);
	}

	handleChange(ev) {
		this.props.onChange(ev.currentTarget.value, ev);
	}

	render() {
		return (
			<textarea
				className={cx(
					TEXTAREA,
					{focus: this.state.focus}
				)}
				onBlur = {this.toggleFocus}
				onChange={this.handleChange}
				onFocus={this.toggleFocus}
				onKeyDown={this.handleKeyDown}
				onKeyUp={this.handleKeyUp}
				placeholder={this.props.placeholder}
				style={this.props.style}
				value={this.props.value} />
		);
	}
}

Textarea.defaultProps = {
	value: ""
};

Textarea.propTypes = {
	onChange: React.PropTypes.func,
	onKeyDown: React.PropTypes.func,
	onKeyUp: React.PropTypes.func,
	placeholder: React.PropTypes.string,
	style: React.PropTypes.object,
	value: React.PropTypes.string
};

export default Textarea;