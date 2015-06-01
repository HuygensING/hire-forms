import React from "react";

import {LISTITEM} from "../../../constants";

import {stringOrKeyValue} from "../../utils/prop-types";

let ext = function(...styles) {
	return Object.assign({}, ...styles);
};

let liStyle = {
	cursor: "pointer"
};

let buttonStyle = {
	width: "10%"
};

let spanStyle = {
	width: "90%"
};

let inlineBlockStyle = {
	display: "inline-block",
	boxSizing: "border-box",
	verticalAlign: "top"
};

class ListItem extends React.Component {
	isKeyValueMap(map) {
		return map.hasOwnProperty("key") && map.hasOwnProperty("value");
	}

	render() {
		let remove;

		if (this.props.active) {
			LISTITEM += " active";
		}

		if (this.props.active) {
			remove = (
				<button
					className="remove"
					onClick={this.props.onRemove}
					style={ext(
						inlineBlockStyle,
						buttonStyle
					)}>
					x
				</button>
			);
		}

		let value = (this.isKeyValueMap(this.props.data)) ?
			this.props.data.value :
			this.props.data;

		let span = (
			<span
				className="value"
				onClick={this.props.onClick}
				style={ext(
					inlineBlockStyle,
					spanStyle
				)}>
				{value}
			</span>
		);

		return (
			<li
				className={LISTITEM}
				style={liStyle}>
				{span}
				{remove}
			</li>
		);
	}
}

ListItem.defaultProps = {
	active: false
};

ListItem.propTypes = {
	active: React.PropTypes.bool,
	data: stringOrKeyValue.isRequired,
	onCancel: React.PropTypes.func,
	onChange: React.PropTypes.func,
	onClick: React.PropTypes.func,
	onRemove: React.PropTypes.func
};

export default ListItem;