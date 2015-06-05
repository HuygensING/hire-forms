import React from "react";
import cx from "classnames";

import {INPUT} from "../../constants";

class Input extends React.Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.value === "") {
			if (!this.state.valid) {
				this.setState({valid: true});
			}

			return;
		}

		let re = /^\-?\d{1,4}((\/?)\-?\d{1,4})?(~?|\??)$/;
		let valid = re.test(nextProps.value);
		this.setState({valid: valid});

		if (!valid && this.props.onInvalid) {
			this.props.onInvalid(nextProps.value);
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		let propsValueChange = this.props.value !== nextProps.value;
		let stateFocusChange = this.state.focus !== nextState.focus;

		return propsValueChange || stateFocusChange;
	}

	constructor(props) {
		super(props);

		this.state = {
			focus: false,
			valid: true
		};
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
			<input
				className={cx(
					INPUT,
					{focus: this.state.focus},
					{invalid: !this.state.valid}
				)}
				onBlur={this.toggleFocus.bind(this)}
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

Input.defaultProps = {
	value: ""
};

Input.propTypes = {
	onChange: React.PropTypes.func,
	onInvalid: React.PropTypes.func,
	onKeyDown: React.PropTypes.func,
	onKeyUp: React.PropTypes.func,
	placeholder: React.PropTypes.string,
	style: React.PropTypes.object,
	value: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number
	])
};

export default Input;