import React from "react";

class Tab extends React.Component {
	render() {
		if (this.props.active) {
			return (
				<div className="hire-tab">
					{this.props.children}
				</div>
			);
		}

		return null;
	}
}

Tab.defaultProps = {
	active: false
};

Tab.propTypes = {
	active: React.PropTypes.bool,
	children: React.PropTypes.object
};

export default Tab;