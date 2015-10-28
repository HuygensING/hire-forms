import React from "react";
import {Link} from "react-router";

class Notfound extends React.Component {
	render() {
		return (
			<div className="not-found">
				The page you are requesting cannot be found.<br/>
				Take me back to <Link to="/">safety</Link>
			</div>
		)
	}
}

export default Notfound;