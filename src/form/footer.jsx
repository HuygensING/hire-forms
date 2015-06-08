import React from "react";

import codexAction from "../actions/form";

class Footer extends React.Component {
	handleSave() {
		codexAction.updateCodex();
	}

	render() {
		return (
			<div className="footer">
				<button className="cancel">Cancel</button>
				<button className="delete">Delete</button>
				<button className="save" onClick={this.handleSave.bind(this)}>Save</button>
			</div>
		);
	}
}

export default Footer;