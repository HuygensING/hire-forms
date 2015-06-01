import React from "react";

import {LABEL} from "../../constants";

class Label extends React.Component {
	constructor(props) {
		super(props);

		this.state = {show: false};
	}

	handleClick() {
		this.setState({show: !this.state.show});
	}

	render() {
		let children;

		if (this.state.show) {
			children = this.props.children;
		}

		return (
			<div className={LABEL}>
				<label
					onClick={this.handleClick.bind(this)}>
					{this.props.value}
				</label>
				{children}
			</div>
		);
	}
}

Label.defaultProps = {
	value: ""
};

Label.propTypes = {
	children: React.PropTypes.element,
	value: React.PropTypes.string
};

export default Label;