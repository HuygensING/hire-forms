import React from 'react';

const Text = ({ children, label, remarks }) => {
	let text = (children === null || children === '') ?
		'-' :
		children;

	return (
		<div className="text">
			<label>{label}</label>
			<span>{text}</span>
			{
				(remarks != null || remarks === '') ?
					<span className="remarks">{remarks}</span> :
					null
			}
		</div>
	);
};

Text.propTypes = {
	children: React.PropTypes.any,
	label: React.PropTypes.string,
	remarks: React.PropTypes.string,
};

export default Text;
