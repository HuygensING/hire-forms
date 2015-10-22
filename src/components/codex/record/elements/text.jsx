import React from "react";

class Text extends React.Component {
	render() {
		let text = (this.props.children == null || this.props.children === "") ?
			"-" :
			this.props.children;

		return (
			<div className="text">
				<label>{this.props.label}</label>
				<span>{text}</span>
			</div>
		);
	}
}

Text.propTypes = {
	label: React.PropTypes.string,
	children: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number
	])
}

export default Text;