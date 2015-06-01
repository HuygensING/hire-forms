import React from "react";
import cx from "classnames";

import {CHECKBOX} from "../../constants";

class Checkbox extends React.Component {
	handleClick() {
		this.props.onChange(!this.props.value);
	}

	render() {
		let label;

		if (this.props.label) {
			label = (<label>{this.props.label}</label>);
		}

		return (
			<div
				className={cx(
					CHECKBOX,
					{checked: this.props.value}
				)}
				onClick={this.handleClick}>
				<svg viewBox="0 0 220 220">
					<rect
						fillOpacity="0"
						height="190"
						rx="20"
						ry="20"
						stroke="black"
						strokeWidth="20"
						width="190"
						x="15"
						y="15" />
					<rect
						height="200"
						width="20"
						x="180"
						y="0" />
					<rect
						height="20"
						width="200"
						x="0"
						y="180" />
				</svg>
				{label}
			</div>
		);
	}
}

Checkbox.defaultProps = {
	value: false
};

Checkbox.propTypes = {
	label: React.PropTypes.string,
	onChange: React.PropTypes.func.isRequired,
	value: React.PropTypes.bool
};

export default Checkbox;