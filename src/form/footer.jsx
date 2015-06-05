import React from "react";

class Footer extends React.Component {
	render() {
		return (
			<div className="footer">
				<button className="cancel">Cancel</button>
				<button className="delete">Delete</button>
				<button className="save">Save</button>
			</div>
		);
	}
}

export default Footer;