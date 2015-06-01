import React from "react";
import cx from "classnames";

import {INPUT} from "../../constants";

class Input extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		let stateChange = this.state !== nextState;
		let propsChange = this.props.value !== nextProps.value;

		return stateChange || propsChange;
	}

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
			<input
				className={cx(
					INPUT,
					{focus: this.state.focus}
				)}
				onBlur={this.toggleFocus}
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

Input.defaultProps = {
	value: ""
};

Input.propTypes = {
	onChange: React.PropTypes.func,
	onKeyDown: React.PropTypes.func,
	onKeyUp: React.PropTypes.func,
	placeholder: React.PropTypes.string,
	style: React.PropTypes.object,
	value: React.PropTypes.string
};

export default Input;