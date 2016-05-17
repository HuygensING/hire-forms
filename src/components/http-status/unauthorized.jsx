import React from 'react';
import { Link } from 'react-router';

function Unauthorized() {
	return (
		<div className="http-status">
			You are unauthorized to view the requested page.
			<br />
			Please login.
			<br /><br />
			Take me back to <Link to="/">safety</Link>.
		</div>
	);
}

export default Unauthorized;
