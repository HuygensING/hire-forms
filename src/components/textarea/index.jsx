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
		if (this.props.onKeyDown) {
			this.props.onKeyDown(ev);
		}
	}

	handleKeyUp(ev) {
		if (this.props.onKeyUp) {
			this.props.onKeyUp(ev);
		}
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
				onBlur = {this.toggleFocus.bind(this)}
				onChange={this.handleChange.bind(this)}
				onFocus={this.toggleFocus.bind(this)}
				onKeyDown={this.handleKeyDown.bind(this)}
				onKeyUp={this.handleKeyUp.bind(this)}
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