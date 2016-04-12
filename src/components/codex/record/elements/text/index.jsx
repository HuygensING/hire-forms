import React from 'react';

function Text() {
	let text = (this.props.children === null || this.props.children === '') ?
		'-' :
		this.props.children;

	let remarks = this.props.remarks !== null ?
		<span className="remarks">{this.props.remarks}</span> :
		null;

	return (
		<div className="text">
			<label>{this.props.label}</label>
			<span>{text}</span>
			{remarks}
		</div>
	);
}

Text.propTypes = {
	children: React.PropTypes.any,
	label: React.PropTypes.string,
	remarks: React.PropTypes.string,
};

export default Text;
