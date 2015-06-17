import React from "react";

import {elementOrArrayOfElement} from "../../utils/prop-types";

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
	children: elementOrArrayOfElement
};

export default Tab;