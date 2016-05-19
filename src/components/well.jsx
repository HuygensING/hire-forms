import React from 'react';

const Well = (props) =>
	<div className="well">
		<header>{props.title}</header>
		{props.children}
	</div>;

Well.propTypes = {
	title: React.PropTypes.string,
	children: React.PropTypes.any,
};

export default Well;
