import React from "react";

class Well extends React.Component {
	render() {
		return (
			<div className="well">
				<header>{this.props.title}</header>
				{this.props.children}
			</div>
		);
	}
}

Well.propTypes = {
	title: React.PropTypes.string,
	children: React.PropTypes.any
}

export default Well;